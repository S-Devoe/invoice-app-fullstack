import { AnyARecord } from "dns";
import styled from "styled-components";
interface ButtonProps {
  children?: any;
  className?: string;
  type?: "submit" | "button" | undefined;
  icon?: any;
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type,
  icon,
}) => {
  return (
    <ButtonContainer className={className} type={type} onClick={onClick}>
      <span>{icon}</span>
      {children}
    </ButtonContainer>
  );
};
export default Button;

const ButtonContainer = styled.button`
  font-family: "Spartan", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.5rem 2rem;
  border: none;
  outline: none;
  transition: background 0.3s linear;
  cursor: pointer;
`;
