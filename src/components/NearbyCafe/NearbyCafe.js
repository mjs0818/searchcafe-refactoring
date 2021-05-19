import React, { useEffect, useState } from 'react';
import { dbService } from '../../Firebase';
import Map from '../../Map';
import { Link } from 'react-router-dom';
import './NearbyCafe.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';

const CafeImage = styled.img`
  width: 100px;
  height: 100px;
`;

const NearbyCafeStyle = styled.div`
  margin: 0;
  box-sizing: border-box;
  width: 400px;
  height: auto;
  margin: 3rem 0 0 5px;
  background-color: #fafafa;
  @media (max-width: 1400px) {
    margin: 3rem auto auto auto;
    width: 93.5%;
    display: flex;
    justify-content: center;
    align-content: center;
  }
  @media (max-width: 1120px) {
    flex-direction: column;
  }
`;

const CafeList = styled.li`
  padding: 15px 0 15px 0;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  transition: 0.3s;
`;

const Cover = styled.div`
  position: absolute;
  width: 380px;
  height: 130px;
`;
const LinkContent = styled.a`
  color: black;
  text-decoration: none;
  &:before {
    color: #24292e;
    cursor: default !important;
  }
  :hover ${CafeList} {
    background-color: #e9e9e9;
    transition: 0.3s;
  }
`;

const NearbyCafe = (state) => {
  console.log(state.currentCafe);
  const [nearbyCafe, setNearbyCafe] = useState([]);
  const [currentCafe, setCurrentCafe] = useState(null);
  const [loading, setLoading] = useState(false);
  const getNearbyCafe = async (current) => {
    await dbService
      .collection('CafeInformation')
      .where('region_1depth', '==', current.region_1depth)
      .where('region_2depth', '==', current.region_2depth)
      .where('cafeName', '!=', current.cafeName)
      .limit(4)
      .onSnapshot((snapshot) => {
        let cafes = snapshot.docs.map((doc) => doc.data());
        setNearbyCafe(cafes);
      });
  };
  useEffect(() => {
    setCurrentCafe(state.currentCafe);
    console.log('setCurrentCafe', state.currentCafe);
    setLoading(true);
  }, []);
  useEffect(() => {
    if (state.currentCafe) {
      getNearbyCafe(state.currentCafe);
    }
  }, [state.currentCafe]);
  return (
    <NearbyCafeStyle>
      <div className="map-container">
        {loading && <Map cafeInfo={state.currentCafe} />}
      </div>
      <ul className="cafe-list">
        <h3 className="cafe-list-title">주변 카페 추천</h3>
        {nearbyCafe.map((cafe, index) => (
          <div className="cafe-link" key={index}>
            <LinkContent key={index} href={`/content/${cafe.id}`}>
              <Cover id={cafe.id}></Cover>
              <CafeList className="cafe">
                <CafeImage src={cafe.cafeImg} />
                <div className="cafe-info">
                  <div className="cafe-name">{cafe.cafeName}</div>
                  <div className="cafe-address">주소 : {cafe.cafeAddress}</div>
                </div>
              </CafeList>
            </LinkContent>
          </div>
        ))}
      </ul>
    </NearbyCafeStyle>
  );
  return <></>;
};

function mapStateToProps(state, ownProps) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    cafe: (currentCafe) =>
      dispatch(actionCreators.currentCafeClick(currentCafe)),
    currentCafeComment: (comment) =>
      dispatch(actionCreators.currentCafeComment(comment)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NearbyCafe);
