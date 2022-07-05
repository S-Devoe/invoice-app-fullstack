import styled from "styled-components";
interface ButtonProps {
  children?: string;
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
      {children}
      {icon}
    </ButtonContainer>
  );
};
export default Button;

const ButtonContainer = styled.button`
font-family: 'Spartan', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.5rem 2rem;
  border: none;
  outline: none;
  transition: background .3s linear;
  cursor: pointer;
`;
