import styled, { createGlobalStyle } from 'styled-components';
import { dbService } from '../Firebase';
import NearbyCafe from '../components/NearbyCafe/NearbyCafe';
import { connect } from 'react-redux';
import { actionCreators } from '../reducer/store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ContentHeader from '../components/ContentHeader/index';
// import ContentDetail from '../components/ContentDetail/index';
import ContentComment from '../components/ContentComment/index';
import { img } from './main.jpeg';
import { cafeComment } from '../cafeInfos';
import { useEffect } from 'react';

const ContentStyle = styled.div`
  position: relative;
  top: 120px;
  margin-bottom: 300px;
`;

const ContentWrapper = styled.div``;

const Inner = styled.div`
  box-sizing: border-box;
`;

const MiddleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 0 auto;
  @media (max-width: 1400px) {
    flex-direction: column-reverse;
  }
`;

const Content = (state) => {
  let allCardList = [];
  let cafeCommentArr = [];
  let currentCafeData;
  let cafeId = Number(window.location.pathname.split('/')[2]);

  useEffect(() => {
    addCurrentCafe(cafeId);
  }, [cafeId]);

  const addCurrentCafe = async (cafeId) => {
    try {
      const cafeData = await dbService.collection('CafeInformation').get();
      cafeData.forEach((doc) => {
        allCardList.push(doc.data());
      });
      await state.handleCardList(allCardList);
      currentCafeData = allCardList.filter((card) => card.id === cafeId)[0];
      currentCafeData.cafeid = cafeId;
      await state.handleCurrentCafe(currentCafeData);
    } catch (error) {
      console.log('error' + error);
    }
    try {
      const commentData = await dbService.collection('CafeComment').get();
      commentData.forEach((doc) => {
        if (cafeId === doc.data().cafeId) {
          cafeCommentArr.push(doc.data());
        }
      });
      await state.handleCafeComment(cafeCommentArr);
    } catch (error) {
      console.log('error' + error);
    }
  };

  return (
    <ContentStyle>
      {/* <GlobalStyle /> */}
      <ContentWrapper>
        <Inner>
          <ContentHeader></ContentHeader>
        </Inner>
      </ContentWrapper>
      <MiddleWrapper>
        <ContentComment></ContentComment>
        <NearbyCafe></NearbyCafe>
      </MiddleWrapper>
    </ContentStyle>
  );
};
function mapStateToProps(state, ownProps) {
  return { ...state };
}
function mapDispatchToProps(dispatch) {
  return {
    handleCurrentCafe: (currentCafe) =>
      dispatch(actionCreators.currentCafeClick(currentCafe)),
    handleCafeComment: (comment) =>
      dispatch(actionCreators.currentCafeComment(comment)),
    handleCardList: (card) => dispatch(actionCreators.addCardList(card)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
