import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

const Avatar = () => {
  return (
    <AvatarContainer>
      <Icon>
        <FaUserCircle />
      </Icon>
    </AvatarContainer>
  );
};
export default Avatar;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 2rem;

  @media screen and (min-width: 1000px) {
    margin: 1.2rem auto;
  }
`;

const Icon = styled.div`
  font-size: 2rem;
  color: #888eb0;

  &:hover::after,
  :focus::after {
    content: "Logout";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 1rem;
  }
`;
