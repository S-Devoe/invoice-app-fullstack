import { motion } from "framer-motion";
import styled from "styled-components";

const AuthenticationContainer = ({ children }: any) => {
  return (
    <Container
      as={motion.section}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </Container>
  );
};
export default AuthenticationContainer;

const Container = styled.section`
  width: 100%;
`;
