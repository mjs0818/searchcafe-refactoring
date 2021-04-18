import styled from 'styled-components';

const CardSkeletonContainer = styled.div`
  width: 345px;
  height: 440px;
  display: block; // inline-block => block으로 바꿨더니 해결
  break-inside: avoid-column;
  box-shadow: 1px 3px 3px rgba(34, 25, 25, 0.4);
  margin: 13px 20px 10px 10px;
  padding: 8px;
  padding-bottom: 10px;
  font-size: 1rem;

  background-color: #ffffff;
`;

const SkeletonImg = styled.div`
  background-color: #efefef;
  width: 345px;
  height: 250px;
  margin: auto;
`;
const SkeletonTitle = styled.div`
  background-color: #efefef;
  width: 150px;
  height: 30px;
  margin: 25px 0 0 10px;
`;
const SkeletonContent = styled.div`
  background-color: #efefef;
  width: 250px;
  height: 12px;
  margin: 10px 0 0 10px;
`;
const SkeletonContentTwo = styled(SkeletonContent)`
  width: 200px;
`;

const SkeletonContentThree = styled(SkeletonContent)`
  width: 230px;
`;

const CardSkeleton = (props) => {
  return (
    <CardSkeletonContainer size={props.size}>
      <SkeletonImg></SkeletonImg>
      <SkeletonTitle></SkeletonTitle>
      <SkeletonContent></SkeletonContent>
      <SkeletonContentTwo></SkeletonContentTwo>
      <SkeletonContentThree></SkeletonContentThree>
    </CardSkeletonContainer>
  );
};

export default CardSkeleton;
