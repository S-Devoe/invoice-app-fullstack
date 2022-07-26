import styled from "styled-components";

const NoInvoice = () => {
  return (
    <Container>
      <Image src="/images/illustration-empty.svg" alt="" />
      <Heading>There is nothing here.</Heading>
      <Paragraph>
        Create an invoice by clicking the{" "}
        <span>
          New <span className="show"> Invoice </span>
        </span>
        button and get started.
      </Paragraph>
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
`;

const Image = styled.img`
  margin-bottom: 2.5rem;
`;
const Paragraph = styled.p`
  max-width: 12.5rem;
  line-height: 1rem;
  span {
    font-weight: bold;

    .show {
      display: none;
      @media screen and (min-width: 768px) {
        display: inline;
      }
    }
  }
`;
const Heading = styled.h2`
  margin-bottom: 1.5rem;
`;
