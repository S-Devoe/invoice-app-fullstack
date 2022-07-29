import styled from "styled-components";

const NoInvoice = () => {
  return (
    <Container>
      <Image src="/images/illustration-empty.svg" alt="" />
      <Heading>There is nothing here.</Heading>
      <Paragraph>
        New user? Create an invoice by clicking the{" "}
        <span>
          New <span className="show"> Invoice </span>
        </span>
        button and get started.
      </Paragraph>

      <Paragraph2>
        If you recently changed your password, kindly logout and login again.
      </Paragraph2>
    </Container>
  );
};
export default NoInvoice;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 5rem;

  color: ${(props) => props.theme.color.text.bodyA};
`;

const Image = styled.img`
  margin-bottom: 2.5rem;
`;
const Paragraph = styled.p`
  max-width: 12.5rem;
  line-height: 1rem;
  span {
    font-weight: bold;
    color: ${(props) => props.theme.color.text.heading};

    .show {
      display: none;
      @media screen and (min-width: 768px) {
        display: inline;
      }
    }
  }
`;

const Paragraph2 = styled(Paragraph)`
  margin-top: 4rem;
  font-size: 0.65rem;
  color: ${(props) => props.theme.color.text.bodyB};
`;
const Heading = styled.h2`
  margin-bottom: 1.5rem;
`;
