import React, { useState } from 'react';
import { actionCreators } from '../reducer/store';
import { connect } from 'react-redux';
import './Mypage.css';
import Profile from '../components/Profile/Profile';
import MyCafe from '../components/MyCafe/MyCafe';
import { authService } from '../Firebase';

function Mypage({ state, userHandler }) {
  const [activeTab, setActiveTab] = useState(0);
  const userInfo = authService.currentUser;
  const handleTabClick = (id) => {
    setActiveTab(id);
  };
  const content = {
    0: <MyCafe>My Cafe</MyCafe>,
    1: <Profile userHandler={userHandler} userInfo={userInfo}></Profile>,
  };
  const tabName = ['My Cafe', '정보 수정'];
  return (
    <>
      <div className="tabs-wrapper">
        <div className="tabs">
          {tabName.map((tab, i) => {
            return (
              <div
                key={i}
                className={
                  activeTab === i ? 'tabs-contents-active' : 'tabs-contents'
                }
                onClick={() => handleTabClick(i)}
              >
                {tab}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content-profile">{content[activeTab]}</div>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    userHandler: (user) => dispatch(actionCreators.currentUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mypage);
