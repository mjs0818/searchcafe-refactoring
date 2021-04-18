import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import logo from '../../pages/logo.png';
const FooterStyle = styled.div`
  width: 100%;
  height: 330px;
  background-color: inherit;
  max-width: 2000px;
  margin: auto;
  margin-bottom: 30px;
`;

const LineTop = styled.div`
  border-top: 1px solid #afafaf;
  width: 80%;
  margin: 50px auto auto auto;
`;
const FooterContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 2fr 1fr 3.5fr 1fr 2fr;
  width: 80%;
  justify-content: center;
  align-items: center;
  height: 250px;
  color: #5a403a;
  @media (max-width: 1440px) {
    grid-template-columns: none;
    justify-content: initial;
    grid-template-areas:
      'left left line center center center'
      'right right right right right right';
  }
  @media (max-width: 850px) {
    grid-template-columns: none;
    grid-template-areas:
      'center center'
      'line2 line2'
      'right right';
    height: auto;
  }
`;
const CafeLogoContainer = styled.div`
  display: inline-block;
  margin: auto;

  @media (max-width: 1440px) {
    grid-area: left;
  }
  @media (max-width: 850px) {
    grid-area: left;
    display: none;
  }
`;

const LogoImg = styled.img`
  width: 200px;

  margin: auto;
`;

const CenterStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 1440px) {
    grid-area: center;
  }
  @media (max-width: 850px) {
    grid-area: center;
    grid-template-columns: 2fr 1fr 2fr;
    margin-top: 40px;
  }
`;
const MemberContainer = styled.div`
  margin: auto;
  text-align: center;
  font-size: 1.4rem;
`;
const Members = styled.ul`
  margin: auto;
  list-style: none;
  padding: 0px;
  font-size: 0.95rem;
  line-height: 40px;
  letter-spacing: 10px;
`;
const AboutContainer = styled.div`
  @media (max-width: 1440px) {
    grid-area: right;
    margin: auto;
  }
  @media (max-width: 850px) {
    margin-bottom: 60px;
  }
`;
const VerticalLine = styled.div`
  border-left: 1px solid #afafaf;
  height: 100px;
  margin: auto;
  @media (max-width: 1440px) {
    grid-area: line;
  }
  @media (max-width: 850px) {
    width: 30%;
    border-bottom: 1px solid #afafaf;
    border-left: none;
    margin: auto;
    position: relative;
    bottom: 50%;
    display: none;
  }
`;
const VerticalLine2 = styled(VerticalLine)`
  @media (max-width: 1440px) {
    display: none;
  }
  @media (max-width: 850px) {
    display: inline-block;
    border-bottom: 1px solid #afafaf;
    grid-area: line2;
  }
`;

const CenterLine = styled.div`
  display: none;
  @media (max-width: 850px) {
    display: inline-block;
    height: 20%;
    border-right: 1px solid #5f5f5f;
    margin: auto;
  }
`;

const CopyRight = styled.div`
  text-align: center;
  font-size: 0.65rem;
`;
const Footer = (props) => {
  return (
    <FooterStyle>
      <LineTop />
      <FooterContainer>
        <CafeLogoContainer>
          <LogoImg src={logo}></LogoImg>
        </CafeLogoContainer>
        <VerticalLine />
        <CenterStyle>
          <MemberContainer>
            Contribution<br></br>&<br></br>
            Contact
          </MemberContainer>
          <CenterLine></CenterLine>
          <Members>
            <li>
              김면수
              <a href="#">
                <FontAwesomeIcon
                  className="icon"
                  color="black"
                  icon={faGithub}
                  size="lg"
                />
              </a>
            </li>
            <li>
              설명재
              <a href="#">
                <FontAwesomeIcon
                  className="icon"
                  color="black"
                  icon={faGithub}
                  size="lg"
                />
              </a>
            </li>
            <li>
              이광섭
              <a href="#">
                <FontAwesomeIcon
                  className="icon"
                  color="black"
                  icon={faGithub}
                  size="lg"
                />
              </a>
            </li>
            <li>
              임경섭
              <a href="#">
                <FontAwesomeIcon
                  className="icon"
                  color="black"
                  icon={faGithub}
                  size="lg"
                />
              </a>
            </li>
          </Members>
        </CenterStyle>
        <VerticalLine2 />
        <AboutContainer>
          <span style={{ fontSize: '1.4rem', marginRight: '30px' }}>
            About Project
          </span>
          <span style={{ marginRight: '30px', color: '#555555' }}>|</span>
          <a href="#" style={{ textDecoration: 'none', color: '#5a403a' }}>
            Link
          </a>
        </AboutContainer>
      </FooterContainer>
      <hr align="center" style={{ width: '80%', color: '#555555' }}></hr>
      <CopyRight>
        CopyRight&copy; projectname {new Date().getFullYear()} | All right
        reserved
      </CopyRight>
    </FooterStyle>
  );
};

export default Footer;
