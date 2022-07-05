import { motion } from "framer-motion";
import styled from "styled-components";
import Button from "./Button";

interface Props {
  cancelText?: string;
  confirmText?: string;
  title: string | JSX.Element;
  text: string | JSX.Element;
  cancel: () => void;
  confirm: (param?: any) => any;
}

const ConfirmModal: React.FC<Props> = ({
  title,
  text,
  cancelText,
  confirmText,
  cancel,
  confirm,
}) => {
  return (
    <ModalSection
      as={motion.div}
      initial={{ scale: 0.6 }}
      animate={{ scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <ModalContent>
        <h2>{title}</h2>
        <p>{text}</p>
        <AlignButtons>
          <Button
            className="cancel-btn"
            children={cancelText}
            onClick={cancel}
          />
          <Button
            className="confirm-btn"
            children={confirmText}
            onClick={confirm}
          />
        </AlignButtons>
      </ModalContent>
    </ModalSection>
  );
};
export default ConfirmModal;

const ModalSection = styled.div`
  background: ${(props) => props.theme.color.body.bg};
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  padding: 2rem 2.5rem;
  border-radius: 0.5rem;
`;
const ModalContent = styled.div`
  min-width: 15.625rem;
  max-width: 48rem;
  width: 100%;

 

  @media screen and (min-width: 1000px) {
    min-width: 350px;
    max-width: 48rem;
  }

  h2 {
    color: ${(props) => props.theme.color.text.heading};
    font-size: 1.3rem;
  }
  p {
    margin-top: 0.55rem;
    color: ${(props) => props.theme.color.text.bodyB};
    font-size: 0.85rem;
    font-size: 300;
    margin-bottom: 2rem;
  }
`;

const AlignButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
 

  .cancel-btn {
    background: ${(props) => props.theme.color.modalBtn.cancel};
    color: ${(props) => props.theme.color.text.bodyA};
    font-size: 1rem;
    border-radius: 10rem;
  }
  .confirm-btn {
    background: rgb(236, 87, 87);
    color: #ffffff;
    font-size: 1rem;
    border-radius: 10rem;
  }
`;
