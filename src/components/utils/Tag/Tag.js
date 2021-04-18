import ImgLocation from './asset/location.png';
import Parking from './asset/parking.png';
import coffee from './asset/coffee.png';
import coffeebean from './asset/coffeebean.png';
import cozy from './asset/cozy.png';
import delivery from './asset/delivery.png';
import dessert from './asset/dessert.png';
import ediya from './asset/ediya.png';
import groupseat from './asset/groupseat.png';
import paul from './asset/paul.png';
import hollys from './asset/hollys.png';
import pet from './asset/pet.png';
import sea from './asset/sea.png';
import stab from './asset/stab.png';
import takeout from './asset/takeout.png';
import tasking from './asset/tasking.png';
import tomtom from './asset/tomtom.png';
import twosome from './asset/twosome.png';
import conversation from './asset/conversation.png';
import allTime from './asset/24.png';
import disabled from './asset/disabled.png';
import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../../reducer/store';

// props
// tagName: 태그 이름이 들어갑니다. 들어갈 수 있는 목록은 figma 메인 페이지 태그 그대로 입니다.
// isClicked: 값으로 true를 주면 태그 색이 변합니다.
// isSmall: 값으로 true를 주면 태그가 작아집니다.
// isButton: 값으로 true를 주면, hover 상태일 때 색이 바뀝니다.
// color: 색을 지정하면 바뀝니다.

const tagName = {
  가까운: ImgLocation,
  '주차 가능': Parking,
  단체석: groupseat,
  '배달 가능': delivery,
  '애완 동물 동반': pet,
  '테이크 아웃 전문': takeout,
  '커피가 맛있는': coffee,
  '디저트가 맛있는': dessert,
  편안한: cozy,
  '작업하기 좋은': tasking,
  '대화하기 좋은': conversation,
  스타벅스: stab,
  투썸플레이스: twosome,
  이디야: ediya,
  할리스: hollys,
  탐앤탐스: tomtom,
  커피빈: coffeebean,
  폴바셋: paul,
  '24시간': allTime,
  '장애 시설': disabled,
};

const TagStyle = styled.button`
  background: ${(props) =>
    props.isClicked ? '#5A403A' : props.color || '#EFEFEF'};
  color: ${(props) => (props.isClicked ? 'white' : 'black')};
  width: ${(props) => 3.8 + 0.7 * props.tagName.length + 'rem'};
  height: 2rem;
  margin: 0.2rem;
  border-radius: 30px;
  border: initial;
  box-shadow: 1px 1px 1px 0.1px #666666;
  transition: 0.3s;
  :focus {
    outline: 0;
  }
  :hover {
    background-color: ${(props) =>
      props.isClicked
        ? '#5A403A'
        : props.isButton
        ? '#8A706A'
        : props.color || '#EFEFEF'};
    color: ${(props) =>
      props.isButton || props.isClicked ? 'white' : 'black'};
    transition: 0.2s;
  }
`;
const SmallTagStyle = styled(TagStyle)`
  width: ${(props) => 3.3 + 0.5 * props.tagName.length + 'rem'};
  height: 1.5rem;
`;

const TagImg = styled.img`
  width: 18px;
  height: 18px;
  position: relative;
  right: 10px;
  top: 2.5px;
`;
const SmallTagImg = styled.img`
  width: 12px;
  height: 12px;
  right: 2px;
  top: 2.2px;
  padding-right: 0px;
  margin-right: 0px;
  position: relative;
`;

const TagName = styled.span`
  position: relative;
  font-size: 0.8rem;
  bottom: 5%;
  left: 5%;
`;
const SmallTagName = styled(TagName)`
  font-size: 0.7rem;
  position: relative;
  top: 1%;
`;
const MoreSmallTagName = styled(TagName)``;

const Tag = (props) => {
  const [isClick, setClick] = useState(false);
  const tagValue = useRef(null);
  const handleTags = props.handleTags ? props.handleTags : () => {};
  useEffect(() => {
    if (props.modifyTag) {
      props.modifyTag.forEach((x) => {
        if (x === props.tagName) {
          setClick((pres) => !pres);
        }
      });
    }
  }, []);
  if (props.isSmall) {
    return (
      <SmallTagStyle
        onClick={() => setClick(!isClick)}
        isClicked={props.isButton ? isClick : undefined}
        tagName={props.tagName || ''}
        isButton={props.isButton}
        color={props.color}
      >
        <SmallTagImg
          src={tagName[props.tagName] || ''}
          tagName={props.tagName}
        ></SmallTagImg>
        <SmallTagName>{props.tagName}</SmallTagName>
      </SmallTagStyle>
    );
  }
  return (
    <TagStyle
      onClick={() => {
        setClick(!isClick);
        handleTags(tagValue.current.textContent);
      }}
      isClicked={props.isButton ? isClick : undefined}
      tagName={props.tagName || ''}
      isButton={props.isButton}
      color={props.color}
    >
      <TagImg
        src={tagName[props.tagName] || ''}
        tagName={props.tagName}
      ></TagImg>
      <TagName ref={tagValue}>{props.tagName}</TagName>
    </TagStyle>
  );
};

function mapStateToProps(state, ownProps) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    togleTagName: (tagName, isTrue) =>
      dispatch(actionCreators.togleTagName(tagName, isTrue)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Tag);
