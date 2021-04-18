import React, { useState } from 'react';
import { authService, dbService, storageService } from '../../Firebase';
import { actionCreators } from '../../reducer/store';
import { connect } from 'react-redux';
import removeImg from '../Signin/remove.png';
import './SignUp.css';
import styled from 'styled-components';

const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SignUp = ({ handleClose, handleOpen, show, userHandler }) => {
  const showHideClassName = show
    ? 'modal-signup display-block'
    : 'modal-signup display-none';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentUserData;
    try {
      await authService.createUserWithEmailAndPassword(email, password);
      await authService.onAuthStateChanged(async (user) => {
        if (user) {
          const image = await storageService
            .ref()
            .child('images/defaultImage.svg')
            .getDownloadURL();
          await user.updateProfile({
            displayName: user.email,
            photoURL: image,
          });
          await dbService.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            providerId: user.providerId,
          });
          await dbService
            .collection('users')
            .get()
            .then((userdatas) => {
              userdatas.forEach((doc) => {
                if (doc.data().uid === user.uid) {
                  currentUserData = doc.data();
                  userHandler(currentUserData);
                }
              });
            });
        }
      });
      setEmail('');
      setPassword('');
      setError('');
      handleClose();
    } catch (error) {
      let code = error.code;
      if (code === 'auth/email-already-in-use') {
        setError('이미 가입된 이메일입니다.');
      } else if (code === 'auth/invalid-email') {
        setError('잘못된 이메일 형식입니다.');
      } else if (code === 'auth/weak-password') {
        setError('패스워드는 6자리이상 입력해주세요.');
      }
    }
  };

  const onClick = () => {
    handleClose();
    handleOpen();
    setEmail('');
    setPassword('');
    setError('');
  };
  return (
    <>
      <div className={showHideClassName}>
        <section className="modal-signup-main">
          <img
            src={removeImg}
            className="close-btn"
            onClick={handleClose}
            alt="close"
          ></img>
          <h1 className="header-signup">회원가입</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              className="input-signup"
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="email"
              value={email}
              required
            />
            <input
              className="input-signup"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="password"
              value={password}
              required
            />
            <button type="submit" className="signup-btn">
              이메일 회원가입
            </button>
          </form>
          <div className="errorMsg">{error}</div>
          <span className="link-signin" onClick={onClick}>
            이미 아이디가 있으신가요?
          </span>
        </section>
        <Cover onClick={handleClose}></Cover>
      </div>
    </>
  );
};

function mapStateToProps(state, ownProps) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    userHandler: (user) => dispatch(actionCreators.currentUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
