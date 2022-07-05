import styled from "styled-components";

const Logo = () => {
  return (
    <LogoContainer>
      <Image src="./images/logo.svg" alt="logo" />
    </LogoContainer>
  );
};
export default Logo;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  border-radius: 0 1rem 1rem 0;
  background: #7c5dfa;

  &::after {
    content: "";
    background: #9277ff;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 50%;
    width: 100%;
    border-radius: 1rem 0;
  }

  @media screen and (min-width: 1000px) {
    width: 6.4375rem;
    height: 6.4375rem;
  }
`;

const Image = styled.img`
  position: relative;
  z-index: 3;
  width: 31px;
  height: 29px;

  @media screen and (min-width: 768px) {
    width: 40px;
    height: 37px;
  }
`;
