import {
  storageService,
  authService,
  dbService,
  firebaseInstance,
} from '../../Firebase';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Profile.css';
import styled from 'styled-components';
import loading from './loading.svg';

const Divide = styled.div`
  border-right: 1px solid #959292;
  height: 50%;
  margin: auto;
`;

const Profile = ({
  state,
  userHandler,
  userProfileHandler,
  userDisplayNameHandler,
}) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(state.user ? state.user : '');
  const [attachment, setAttachment] = useState(
    state.user ? state.user.photoURL : ''
  );
  const [photoFile, setPhotoFile] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [prePassword, setPrePassword] = useState('');
  const [newDisplayName, setNewDisplayName] = useState(
    state.user ? state.user.displayName : ''
  );
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!state.user) {
      history.push('/');
    }
  }, [state.user]);

  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === 'username') {
      setNewDisplayName(value);
    } else if (name === 'password') {
      setNewPassword(value);
    } else if (name === 're-password') {
      setRePassword(value);
    } else if (name === 'pre-password') {
      setPrePassword(value);
    }
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    setPhotoFile(theFile);
    reader.readAsDataURL(theFile);
  };

  const handleChange = async (event) => {
    const {
      target: { name },
    } = event;
    if (name === 'change-avatar') {
      setAttachment(loading);
      async function upLoadTaskPromise(image) {
        const upLoadTask = storageService
          .ref(`commentImage/${image.name}`)
          .put(image);
        return new Promise((res, rej) => {
          upLoadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
              console.error(error);
              rej();
            },
            async () => {
              let url = await storageService
                .ref('commentImage')
                .child(image.name)
                .getDownloadURL();
              res(url);
            }
          );
        });
      }
      let theFile = photoFile;
      let url = await upLoadTaskPromise(theFile);
      setAttachment(url);
      userProfileHandler(url);
    } else if (name === 'change-username') {
      dbService.collection('users').doc(state.user.uid).update({
        displayName: newDisplayName,
      });

      userDisplayNameHandler(newDisplayName);
    }
  };
  const handlePasswordChange = async (event) => {
    if (state.user.providerId === 'firebase') {
      if ((rePassword === newPassword) & (rePassword.length >= 8)) {
        const credential = await firebaseInstance.auth.EmailAuthProvider.credential(
          state.user.email,
          prePassword
        );
        authService.currentUser
          .reauthenticateWithCredential(credential)
          .then((res) => {
            authService.currentUser
              .updatePassword(newPassword)
              .then(() => {
                setErrorMessage('비밀번호 변경 성공');
              })
              .catch((error) => {
                console.error(error);
              })
              .finally(() => {
                setPrePassword('');
                setNewPassword('');
                setRePassword('');
              });
          })
          .catch((err) => {
            if (err.code === 'auth/wrong-password') {
              setErrorMessage('현재 비밀번호가 틀렸습니다');
            }
          });
      } else if (rePassword !== newPassword) {
        setErrorMessage('두 비밀번호가 일치하지 않습니다');
      } else if ((rePassword === newPassword) & (rePassword.length < 8)) {
        setErrorMessage('비밀번호는 8자리 이상이어야 합니다');
      }
    } else {
      setErrorMessage('소셜 계정 변경 불가');
    }
  };
  return (
    <div className="myprofile">
      <div></div>
      {userInfo && (
        <>
          <div className="avatar-upload">
            <h3>프로필 사진 변경</h3>
            <div className="avatar">
              <img
                className="image"
                src={attachment ? attachment : userInfo.photoURL}
                alt="profile"
              />
            </div>
            <label htmlFor="input-file" className="upload-btn">
              이미지 선택
            </label>
            <button
              className="change-btn"
              name="change-avatar"
              onClick={handleChange}
            >
              변경
            </button>
            <input
              type="file"
              id="input-file"
              onChange={(event) => onFileChange(event)}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          <Divide></Divide>
          <div className="user-info">
            <div></div>
            <div className="divide-container">
              <h3>유저 정보</h3>
              <div className="user-inf">
                <div className="user-em-id">이메일: {userInfo.email}</div>
                <div className="user-em-id">
                  <span>닉네임:</span>
                  <input
                    type="text"
                    name="username"
                    className="username"
                    onChange={onChange}
                    value={newDisplayName}
                  />
                </div>
              </div>
              <div>
                <button
                  className="change-btn"
                  onClick={handleChange}
                  name="change-username"
                >
                  변경
                </button>
              </div>
            </div>

            {userInfo.providerId === 'firebase' ? (
              <div className="divide-container">
                <h3>비밀번호 변경</h3>
                <div>
                  <input
                    className="pwchange"
                    type="password"
                    name="pre-password"
                    placeholder="현재 비밀번호"
                    onChange={onChange}
                  ></input>
                </div>
                <div>
                  <input
                    className="pwchange"
                    onChange={onChange}
                    type="password"
                    name="password"
                    placeholder="새 비밀번호"
                    value={newPassword}
                  ></input>
                </div>
                <div>
                  <input
                    className="pwchange"
                    onChange={onChange}
                    type="password"
                    name="re-password"
                    placeholder="새 비밀번호 확인"
                  ></input>
                </div>
                <div>{errorMessage}</div>
                <div>
                  <button
                    className="change-btn"
                    name="change-pw"
                    onClick={handlePasswordChange}
                  >
                    {userInfo.providerId !== 'firebase'
                      ? '소셜 계정 불가'
                      : '변경'}
                  </button>
                  {/* {this.state.error ? <div className="alert-box">{this.state.error}</div> : ''} */}
                </div>
              </div>
            ) : (
              ''
            )}
            <div></div>
          </div>
        </>
      )}
      <div></div>
    </div>
  );
};
function mapStateToProps(state, ownProps) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    userHandler: (user) => dispatch(actionCreators.currentUser(user)),
    userProfileHandler: (profile) =>
      dispatch(actionCreators.changeUserProfile(profile)),
    userDisplayNameHandler: (display) => {
      dispatch(actionCreators.changeUserDisplayName(display));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
