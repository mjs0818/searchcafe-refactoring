import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { authService, dbService, firebaseInstance } from '../../Firebase';
import '../../styles/oauth.css';

const Auth = ({ handleClose, userHandler }) => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    } else if (name === 'facebook') {
      provider = new firebaseInstance.auth.FacebookAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    const user = data.user;
    userHandler({ ...user.providerData[0], uid: user.uid });
    const checkDB = await dbService.collection('users').doc(user.uid).get();
    if (!checkDB.exists) {
      await dbService
        .collection('users')
        .doc(user.uid)
        .set({ ...user.providerData[0], uid: user.uid });
    }
    handleClose();
  };
  return (
    <div className="account-login">
      <button className="button--google" onClick={onSocialClick} name="google">
        <span className="social-logo" onClick={onSocialClick} name="google">
          <img
            alt=""
            src="https://img.icons8.com/fluent/35/000000/google-logo.png"
          />
        </span>
        <span className="social-text" onClick={onSocialClick}>
          구글로 로그인하기
        </span>
      </button>
      <button className="button--github" onClick={onSocialClick} name="github">
        <span className="social-logo" onClick={onSocialClick}>
          <img
            alt=""
            src="https://img.icons8.com/fluent/35/000000/github.png"
          />
        </span>
        <span className="social-text" onClick={onSocialClick}>
          깃허브로 로그인하기
        </span>
      </button>
      <button
        className="button--facebook"
        onClick={onSocialClick}
        name="facebook"
      >
        <span className="social-logo" onClick={onSocialClick}>
          <img
            alt=""
            src="https://img.icons8.com/fluent/35/000000/facebook-new.png"
          />
        </span>
        <span className="social-text" onClick={onSocialClick}>
          페이스북으로 로그인하기
        </span>
      </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
