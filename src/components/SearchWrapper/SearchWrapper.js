import Tag from '../utils/Tag/index';
import SearchBar from '../utils/SearchBar/index';
import tagnames from '../utils/Tag/tagnames';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import Fade from 'react-reveal/Fade';

const WrapperTitle = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: bold;
`;
const SearchWrapperStyle = styled.div`
  text-align: center;
  margin-bottom: 70px;
`;
const TagWrapperStyle = styled.div``;
const TagWrapperStyleDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const SearchBarWrapperStyle = styled.div``;

const SearchWrapper = (props) => {
  const [selectedTags, setTags] = useState([]);
  const [searchKeyword, setKeyword] = useState('');

  const handleTags = (tag) => {
    if (selectedTags.indexOf(tag) === -1) {
      let newTags = selectedTags;
      newTags.push(tag);
      setTags(newTags);
      props.tagNameArray(selectedTags);
    } else {
      let newTags = selectedTags;
      newTags.splice(selectedTags.indexOf(tag), 1);
      setTags(newTags);
      props.tagNameArray(selectedTags);
    }
  };
  useEffect(() => {
    props.searchKeyword(searchKeyword);
  }, [searchKeyword]);
  return (
    <Fade duration={2000}>
      <SearchWrapperStyle>
        <WrapperTitle>어떤 카페를 찾으시나요?</WrapperTitle>
        <TagWrapperStyle>
          <TagWrapperStyleDiv>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames.가까운}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames.단체석}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames['애완 동물 동반']}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames['배달 가능']}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames['주차 가능']}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames['테이크 아웃 전문']}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames['장애 시설']}
            ></Tag>
          </TagWrapperStyleDiv>
          <TagWrapperStyleDiv>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames['커피가 맛있는']}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames['작업하기 좋은']}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames.편안한}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames['대화하기 좋은']}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames['디저트가 맛있는']}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames['24시간']}
            ></Tag>
          </TagWrapperStyleDiv>
          <TagWrapperStyleDiv>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames.스타벅스}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames.이디야}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames.커피빈}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames.탐앤탐스}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames.투썸플레이스}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames.폴바셋}
            ></Tag>
            <Tag
              isButton={true}
              handleTags={handleTags}
              color="#ffffff"
              tagName={tagnames.할리스}
            ></Tag>
          </TagWrapperStyleDiv>
        </TagWrapperStyle>
        <WrapperTitle>찾는 카페가 있으신가요?</WrapperTitle>
        <SearchBarWrapperStyle>
          <SearchBar setKeyword={setKeyword}></SearchBar>
        </SearchBarWrapperStyle>
      </SearchWrapperStyle>
    </Fade>
  );
};

function mapStateToProps(state, ownProps) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    tagNameArray: (tagName) => {
      dispatch(actionCreators.tagNameArray(tagName));
    },
    searchKeyword: (keyword) => {
      dispatch(actionCreators.searchKeyword(keyword));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchWrapper);
