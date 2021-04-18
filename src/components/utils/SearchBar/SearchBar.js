import styled from 'styled-components';
import SearchImg from './Search.png';
import { useState } from 'react';

const SearchBarStyle = styled.div`
  outline: initial;
  background: white;
  color: white;
  width: 27rem;
  height: 3rem;
  border-radius: 30px;
  border: initial;
  box-shadow: 1px 1px 1px 0.1px #666666;
  transition: 0.3s;
  position: relative;
  right: 0.5%;
  display: inline-block;

  :hover {
  }
`;
export const SearchBarImg = styled.img`
  width: 25px;
  height: 25px;
  position: relative;
  right: 3%;
  top: 15%;
`;

const SearchBarInput = styled.input`
  width: 14rem;
  position: relative;
  left: 5%;
  height: 30px;
  font-size: 1rem;
  border: none;
  font-size: 0.95rem;
  ::placeholder {
    font-size: 0.75rem;
  }
  :focus {
    outline: none;
  }
`;

export const SearchBarButton = styled.button`
  background: #5a403a;
  position: relative;
  font-size: 0.95rem;
  left: 14%;
  color: white;
  width: 6rem;
  height: 3rem;
  border-radius: 30px;

  border: initial;
  box-shadow: 1px 1px 1px 0.1px #666666;
  :focus {
    outline: 0;
  }
`;

const SearchBar = (props) => {
  const [input, setInput] = useState('');
  const enterPress = (e) => {
    if (e.key === 'Enter') {
      props.setKeyword(input);
    }
  };

  return (
    <SearchBarStyle>
      <SearchBarImg src={SearchImg}></SearchBarImg>
      <SearchBarInput
        placeholder="찾고 계신 카페에 대한 정보를 입력해주세요"
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => enterPress(e)}
      ></SearchBarInput>
      <SearchBarButton
        onKeyDown={() => props.setKeyword(input)}
        onClick={() => props.setKeyword(input)}
      >
        검색
      </SearchBarButton>
    </SearchBarStyle>
  );
};

export default SearchBar;
