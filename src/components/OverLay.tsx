import { motion } from "framer-motion";
import styled from "styled-components";

const OverLay = ({ children, onClick }: any) => {
  return (
    <OverLayContainer
      as={motion.section}
      initial={{ background: "rgba(0,0,0,0)" }}
      animate={{ background: "rgba(0,0,0,.6)" }}
      exit={{ background: "rgba(0,0,0,0)" }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
    >
      <CenterContent>{children}</CenterContent>
    </OverLayContainer>
  );
};
export default OverLay;

const OverLayContainer = styled.section`
  width: 100%;
  height: 100%;
  top:0;
  /* left: 0; */
  /* right: 0; */
  /* margin-left: auto; */
  /* margin-right: auto; */
  position: absolute;
`;

const CenterContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
