import Card from '../utils/Card/Card';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const CardWrapperStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 380px);
  justify-content: center;

  width: auto;
  max-width: 1200px;
  margin: 30px auto 60px auto;
  background-color: inherit;
`;
const CardColumn = styled.div``;

const Recommendation = ({ recommendation, isMain }) => {
  const [resized, setResize] = useState(
    window.innerWidth >= 1150 ? false : true
  );
  const refCardWrapper = useRef(null);

  const resizeSetting = () => {
    if (refCardWrapper.current) {
      if (refCardWrapper.current.offsetWidth < 1150) {
        setResize(true);
      } else {
        setResize(false);
      }
    }
  };
  useEffect(() => {
    window.addEventListener('resize', resizeSetting);
    return () => window.removeEventListener('resize', resizeSetting);
  }, []);

  return (
    <CardWrapperStyle ref={refCardWrapper}>
      {!resized ? (
        <>
          <CardColumn>
            {recommendation
              .slice(parseInt((recommendation.length * 2) / 3))
              .map((card, index) => (
                <Card
                  {...card}
                  isMain={isMain}
                  key={index}
                  cafeid={card.id}
                  cafeImage={card.cafeImg ? card.cafeImg : ''}
                ></Card>
              ))}
          </CardColumn>

          <CardColumn>
            {recommendation
              .slice(
                parseInt(recommendation.length / 3),
                parseInt((recommendation.length * 2) / 3)
              )
              .map((card, index) => {
                return (
                  <Card
                    {...card}
                    isMain={isMain}
                    key={index}
                    cafeid={card.id}
                    cafeImage={card.cafeImg ? card.cafeImg : ''}
                  ></Card>
                );
              })}
          </CardColumn>
          <CardColumn>
            {recommendation
              .slice(0, parseInt(recommendation.length / 3))
              .map((card, index) => {
                return (
                  <Card
                    {...card}
                    isMain={isMain}
                    key={index}
                    cafeid={card.id}
                    cafeImage={card.cafeImg ? card.cafeImg : ''}
                  ></Card>
                );
              })}
          </CardColumn>
        </>
      ) : (
        <>
          {' '}
          <CardColumn>
            {recommendation
              .slice(parseInt(recommendation.length / 2))
              .map((card, index) => {
                return (
                  <Card
                    {...card}
                    isMain={isMain}
                    key={index}
                    cafeid={card.id}
                    cafeImage={card.cafeImg ? card.cafeImg : ''}
                  ></Card>
                );
              })}
          </CardColumn>
          <CardColumn>
            {recommendation
              .slice(0, parseInt(recommendation.length / 2))
              .map((card, index) => (
                <Card
                  {...card}
                  isMain={isMain}
                  key={index}
                  cafeid={card.id}
                  cafeImage={card.cafeImg ? card.cafeImg : ''}
                ></Card>
              ))}
          </CardColumn>
        </>
      )}
    </CardWrapperStyle>
  );
};

export default Recommendation;
