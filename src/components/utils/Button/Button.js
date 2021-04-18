import styled from 'styled-components';

const ButtonStyle = styled.div`
  position: relative;
  left: ${(props) => (props.left ? props.left : '0')};
  border-radius: 30px;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '25px')};

  border: none;
  background-color: ${(props) => (props.color ? props.color : '#8a706a')};
  outline: none;
  width: ${(props) =>
    props.name ? 80 + props.name.length * 5 + 'px' : '80px'};
  height: ${(props) => (props.height ? props.heigth : '40px')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '12px')};
  color: ${(props) => (props.fontColor ? props.fontColor : '#ffffff')};
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : 'row'};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
  border: ${(props) => (props.noBorder ? '' : '0.5px solid #7f7f7f')};
  :hover {
    transition: 0.2s;
    background-color: ${(props) =>
      props.hoverColor ? props.hoverColor : '#5a403a'};
    color: ${(props) =>
      props.hoverFontColor ? props.hoverFontColor : '#ffffff'};
    font-size: ${(props) => (props.hoverFontSize ? '1.1rem' : '')};
  }
`;
const ButtonIcon = styled.img`
  width: ${(props) => (props.imgSize ? props.imgSize : '20px')};
  position: relative;
  right: ${(props) => (props.iconRight ? props.iconRight : '6px')};
  top: ${(props) => (props.iconTop ? props.iconTop : '1px')};
`;

// props로 받는 값
// hoverColor
// color
// name
// icon
// fontColor

const Button = (props) => {
  if (props.icon) {
    return (
      <ButtonStyle {...props}>
        <ButtonIcon
          src={props.icon}
          iconRight={props.iconRight}
          iconTop={props.iconTop}
          imgSize={props.imgSize}
        ></ButtonIcon>
        {props.name}
      </ButtonStyle>
    );
  }
  return <ButtonStyle {...props}>{props.name}</ButtonStyle>;
};

export default Button;
