import React, { useState } from 'react';
import { dbService, authService } from '../../Firebase';
import Auth from './auth';
import { actionCreators } from '../../reducer/store';
import { connect } from 'react-redux';
import removeImg from './remove.png';
import './SignIn.css';
import styled from 'styled-components';

const Cover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SignIn = ({ handleClose, handleOpen, show, state, userHandler }) => {
  const showHideClassName = show
    ? 'modal-signin display-block'
    : 'modal-signin display-none';
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
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          let currentUserData;
          dbService
            .collection('users')
            .get()
            .then((userData) => {
              userData.forEach((doc) => {
                if (doc.data().email === email) {
                  currentUserData = doc.data();

                  userHandler(currentUserData);
                }
              });
              setEmail('');
              setError('');
              setPassword('');
            })
            .then((res) => {
              handleClose();
            });
        });
    } catch (error) {
      let code = error.code;

      if (code === 'auth/user-not-found') {
        setError('존재하지 않는 이메일입니다.');
      } else if (code === 'auth/invalid-email') {
        setError('잘못된 이메일 형식입니다.');
      } else if (code === 'auth/wrong-password') {
        setError('패스워드가 틀렸습니다.');
      }
    }
  };
  const onClick = () => {
    setEmail('');
    setError('');
    setPassword('');
    handleClose();
    handleOpen();
  };
  return (
    <div className={showHideClassName}>
      <section className="modal-signin-main">
        <img
          src={removeImg}
          className="close-btn"
          onClick={handleClose}
          alt="close"
        />
        <h1 className="header-signin">로그인</h1>
        <div className="email-login container">
          <form className="login-form" onSubmit={onSubmit}>
            <input
              type="text"
              className="input-login"
              name="email"
              onChange={handleChange}
              placeholder="email"
              value={email}
              required
            />
            <input
              type="password"
              className="input-login"
              name="password"
              onChange={handleChange}
              placeholder="password"
              value={password}
              required
            />
            <div className="wrap-checkbox">
              <input type="checkbox" id="chk" />
              <label htmlFor="chk">이메일 기억하기</label>
            </div>
            <button className="signin-btn" type="submit">
              이메일 로그인
            </button>
          </form>
          <div className="errorMsg">{error}</div>
        </div>

        <Auth handleClose={handleClose} />

        <span className="link-signup" onClick={onClick}>
          이메일로 회원가입
        </span>
      </section>
      <Cover onClick={handleClose}></Cover>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
