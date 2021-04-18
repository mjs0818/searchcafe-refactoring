import { createStore } from 'redux';

const TAGARRAY = 'TAGARRAY';
const CARDARRAY = 'CARDARRAY';
const KEYWORD = 'KEYWORD';
const CURRENTCAFE = 'CURRENTCAFE';
const CURRENTCAFECOMMENT = 'CURRENTCAFECOMMENT';
const CURRENTUSER = 'CURRENTUSER';
const CHANGEUSERPROFILE = 'CHANGEUSERPROFILE';
const CHANGEDISPLAYNAME = 'CHANGEDISPLAYNAME';
const CHANGEUSERCOMMENT = 'CHANGEUSERCOMMENT';
const CHANGEUSERHEART = 'CHANGEUSERCHEART';

const tagNameArray = (tagName) => {
  return {
    type: TAGARRAY,
    tagName,
  };
};
const addCardList = (card) => {
  return {
    type: CARDARRAY,
    card,
  };
};
const searchKeyword = (keyword) => {
  return {
    type: KEYWORD,
    keyword,
  };
};
const currentCafeClick = (currentCafe) => {
  return {
    type: CURRENTCAFE,
    currentCafe,
  };
};
const currentCafeComment = (comment) => {
  return {
    type: CURRENTCAFECOMMENT,
    comment,
  };
};
const currentUser = (user) => {
  return {
    type: CURRENTUSER,
    user,
  };
};
const changeUserProfile = (profile) => {
  return {
    type: CHANGEUSERPROFILE,
    profile,
  };
};
const changeUserDisplayName = (display) => {
  return {
    type: CHANGEDISPLAYNAME,
    display,
  };
};
const changeUserComment = (comment) => {
  return {
    type: CHANGEUSERCOMMENT,
    comment,
  };
};
const changeUserHeart = (heart) => {
  return {
    type: CHANGEUSERHEART,
    heart,
  };
};
const reducer = (state = [], action) => {
  switch (action.type) {
    case TAGARRAY:
      let tagArr = action.tagName;
      return Object.assign({}, state, {
        ...state,
        tagArr,
      });
    case CARDARRAY:
      let cardArr = action.card.slice();
      return {
        ...state,
        cardArr,
      };
    case KEYWORD:
      let keyword = action.keyword;
      for (let i in state) {
        if (i === 'keyword') {
          state[i] = keyword;
        }
      }
      return Object.assign({}, state, {
        ...state,
        keyword,
      });
    case CURRENTCAFECOMMENT:
      let comment = action.comment;
      for (let i in state) {
        if (i === 'comment') {
          state[i] = comment;
        }
      }
      return Object.assign({}, state, {
        ...state,
        comment,
      });
    case CURRENTCAFE:
      let currentCafe = action.currentCafe;
      for (let i in state) {
        if (i === 'currentCafe') {
          state[i] = currentCafe;
        }
      }
      return (Object.assign({}, state, {
        ...state,
        currentCafe,
      })
      )
    case CURRENTUSER:
      let user = action.user;
      for (let i in state) {
        if (i === 'user') {
          state[i] = user;
        }
      }
      return Object.assign({}, state, {
        ...state,
        user,
      });
    case CHANGEUSERPROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          photoURL: action.profile,
        },
      };
    case CHANGEUSERCOMMENT:
      if (!state.user.comment) {
        state.user.comment = [];
      }
      return {
        ...state,
        user: {
          ...state.user,
          comment: action.comment,
        },
      };
    case CHANGEDISPLAYNAME:
      return {
        ...state,
        user: {
          ...state.user,
          displayName: action.display,
        },
      };
    case CHANGEUSERHEART:
      if (!state.user.heart) {
        state.user.heart = [];
      }

      return {
        ...state,
        user: {
          ...state.user,
          heart: action.heart,
        },
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  tagNameArray,
  addCardList,
  searchKeyword,
  currentCafeClick,
  currentCafeComment,
  currentUser,
  changeUserProfile,
  changeUserDisplayName,
  changeUserComment,
  changeUserHeart,
};

export default store;
