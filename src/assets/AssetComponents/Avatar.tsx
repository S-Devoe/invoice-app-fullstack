import { signOut } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import ConfirmModal from "../../components/ConfirmModal";
import { auth } from "../../firebase/config";
import useMyContext from "../../hooks/useContext";

const Avatar = () => {
  

  return (
    <AvatarContainer>
      <Icon src="./images/image-avatar.jpg" alt="avatar" />
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

const Icon = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
`;


