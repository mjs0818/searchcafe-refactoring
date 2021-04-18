import styled from 'styled-components';

const Detail2 = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;

  margin: auto;

  position: relative;
  background: white;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin-top: 5rem;
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;

  .Line2 {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: black;
    font-size: 35px;
    margin: 8px 0px;
    &:before,
    &:after {
      content: '';
      flex-grow: 1;
      background: black;
      height: 2px;
      font-size: 0px;
      line-height: 0px;
      margin: 0px 16px;
    }
  }
`;

const DetailBox = styled.div`
  display: flex;
  width: 20rem;
`;
const Ul = styled.ul`
  list-style:none;
  width:200px;
  margin : 12px 0 10px;
  padding-inline-start:0px;

 li{
  list-style:none;
  width:200px;
  margin : 12px 0 10px;;
  padding-left:0;
}
  p{
    display:table;
    width:100%;
    }
`;

const DetailBoxWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Strong = styled.strong`
  padding-left: 1rem;
  height: 1px;
  :after {
    content: '';
    display: block;
    width: 20rem;
    height: 2px;
    position: absolute;
    left: rem;
    background: gray;
    margin-top: 10px;
  }
`;
const Meun = styled.span`
  display: table-cell;
  width: ${(props) => props.width || 'auto'};
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.025em;
  vertical-align: middle;
  text-align: left;
  line-height: 30px;
  text-align: ${(props) => props.text_align || 'left'};
`;

const ContentDetail = (props) => {
  return (
    <Detail2>
      <div className="Line2">MEUN</div>
      <DetailBoxWrapper>
        <DetailBox>
          <Strong>Coffee</Strong>
          <Ul>
            <li>
              <p>
                <Meun>에스프레소</Meun>
                <Meun text_align={'center'} width={'100px'}>
                  핫
                </Meun>
                <Meun text_align={'right'} width={'15px'}>
                  5.0
                </Meun>
              </p>
            </li>
            <li>
              <p>
                <Meun>아메리카노</Meun>
                <Meun text_align={'center'} width={'100px'}>
                  핫 / 아이스
                </Meun>
                <Meun text_align={'right'} width={'15px'}>
                  5.0
                </Meun>
              </p>
            </li>
            <li>
              <p>
                <Meun>카푸치노</Meun>
                <Meun text_align={'center'} width={'100px'}>
                  핫 / 아이스
                </Meun>
                <Meun text_align={'right'} width={'15px'}>
                  6.0
                </Meun>
              </p>
            </li>
            <li>
              <p>
                <Meun>카페라떼</Meun>
                <Meun text_align={'center'} width={'100px'}>
                  핫 / 아이스
                </Meun>
                <Meun text_align={'right'} width={'15px'}>
                  6.0
                </Meun>
              </p>
            </li>
            <li>
              <p>
                <Meun>바닐라라뗴</Meun>
                <Meun text_align={'center'} width={'100px'}>
                  {' '}
                  핫 / 아이스
                </Meun>
                <Meun text_align={'right'} width={'15px'}>
                  7.0
                </Meun>
              </p>
            </li>
            <li>
              <p>
                <Meun>넛라떼</Meun>
                <Meun text_align={'center'} width={'100px'}>
                  핫 / 아이스
                </Meun>
                <Meun text_align={'right'} width={'15px'}>
                  7.0
                </Meun>
              </p>
            </li>
          </Ul>
        </DetailBox>
        <DetailBox>
          <Strong>Dessert</Strong>
          <Ul>
            <li>
              <p>
                <Meun>치즈케이크</Meun>
                <Meun text_align={'center'} width={'100px'}></Meun>
                <Meun text_align={'right'} width={'15px'}>
                  7.0
                </Meun>
              </p>
            </li>
          </Ul>
        </DetailBox>
      </DetailBoxWrapper>
    </Detail2>
  );
};

export default ContentDetail;
