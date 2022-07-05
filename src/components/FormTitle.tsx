import styled from "styled-components";

interface FTProps {
  title: string;
}

const FormTitle: React.FC<FTProps> = ({ title }) => {
  return (
    <Title>
      <h2>{title}</h2>
    </Title>
  );
};
export default FormTitle;


const Title = styled.div`
margin-bottom: 2rem;
color: ${props => props.theme.color.text.heading};
text-align: center;
`