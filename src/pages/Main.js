import SearchWrapper from '../components/SearchWrapper/index';
import CardWrapper from '../components/CardWrapper/index';
import SearchImg from '../components/utils/SearchBar/Search.png';
import Fade from 'react-reveal/Fade';

import mainImg from './main.jpeg';
import Tag from '../components/utils/Tag/index';
import styled, { keyframes } from 'styled-components';
import coffeeImg from './coffee.svg';
import { actionCreators } from '../reducer/store';
import { connect } from 'react-redux';

const MainImgCover = styled.div`
  width: 100%;
  height: 700px;
  background-color: #160a0a9f;

  position: absolute;
  display: grid;
  grid-template-columns: ;
  grid-template-rows: 5fr 2fr 1fr 1fr 1fr 5fr;
`;

const MainTitle = styled.div`
  color: white;
  margin: auto;
  font-size: 2rem;
`;

const MainTags = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MainDiv = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divide = styled.span`
  width: 22%;
  max-width: 700px;
  display: inline-block;
  border-top: 1px solid white;
`;

const OrSpan = styled.span`
  color: white;
  font-size: 1.3rem;
  display: inline-block;
  margin: 0 25px 0 25px;
`;

const MainSearchBar = styled.div`
  width: 310px;
  height: 33px;
  background-color: white;
  border-radius: 50px;
  margin: auto;
  display: grid;
  grid-template-columns: 20% 57% 24%;
`;
const SearchbarImage = styled.img`
  width: 25px;
  margin: auto;
`;
const SearchBarButton = styled.span`
  width: 80px;
  height: 33px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  background: #6a504a;
  font-size: 0.8rem;
  box-shadow: 1px 1px 1px 0.1px #333333;
`;

const MainImg = styled.img`
  background-position: center;
  background-size: 100% auto;
  object-fit: cover;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 700px;
`;

const MainStyle = styled.main`
  min-height: 1000px;
`;

const Main = (props) => {
  const mainTags = [
    '가까운',
    '커피가 맛있는',
    '작업하기 좋은',
    '편안한',
    '대화하기 좋은',
    '디저트가 맛있는',
  ];
  return (
    <MainStyle>
      <Fade duration={2000}>
        <MainImgCover>
          <div></div>
          <MainTitle>Search Cafe With</MainTitle>
          <MainTags>
            {mainTags.map((tag) => (
              <Tag isSmall={true} tagName={tag} key={tag}></Tag>
            ))}
          </MainTags>
          <MainDiv>
            <Divide />
            <OrSpan>OR</OrSpan>
            <Divide />
          </MainDiv>
          <MainSearchBar>
            <SearchbarImage src={SearchImg} />
            <span></span>
            <SearchBarButton>찾기</SearchBarButton>
          </MainSearchBar>
          <div></div>
        </MainImgCover>
      </Fade>
      <MainImg src={mainImg} />
      <SearchWrapper></SearchWrapper>
      <CardWrapper></CardWrapper>
    </MainStyle>
  );
};

function mapStateToProps(state, ownProps) {
  return { tagArray: state };
}

function mapDispatchToProps(dispatch) {
  return {
    cardList: (card) => dispatch(actionCreators.addCardList(card)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
