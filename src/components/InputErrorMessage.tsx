import styled from "styled-components";
interface IEMProps {
  children: any;
  className?: string;
}

const InputErrorMessage: React.FC<IEMProps> = ({ children, className }) => {
  return <Message className={className}>{children}</Message>;
};
export default InputErrorMessage;

const Message = styled.p`
  color: #ec5757;
  font-weight: 500;
  font-size: 0.75rem;
  margin-bottom: 1rem;


  .success{
    color: #20bd20;
  }
`;


