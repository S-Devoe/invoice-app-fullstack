import { useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import InvoiceForm from "../components/InvoiceForm";
import useMyContext from "../hooks/useContext";
import { Invoice as InvoicesExtended, Invoice } from "../Types/invoice";

interface Props {
  invoices: Invoice[];
  invoiceFormData: InvoicesExtended | null
}

const Invoices: React.FC<Props> = ({ invoices, invoiceFormData }) => {
  const { showForm, setShowForm } = useMyContext();
  return (
    <InvoicesPage>
      {showForm && (
        <InvoiceForm
          invoices={invoices}
          invoiceFormData={invoiceFormData}
          // newInvoice={(data: Invoice) => newInvoice(data)}
          // editInvoice={(data: Invoice) => editInvoice(data)}
        />
      )}
      <Container>
        <Header>
          <h1>
            Invoices <span>There are 7 total invoices</span>
          </h1>

          <DropDownContainer>
            <Dropdown />
          </DropDownContainer>
          <ButtonContainer>
            <Button
              className="new-invoice"
              onClick={() => setShowForm((prev: any) => !prev)}
              icon={<img src="/images/icon-plus.svg" alt="add invoice" />}
              children={
                <p>
                  New <span>Invoice</span>
                </p>
              }
            />
          </ButtonContainer>
        </Header>
        {!invoices ? (
          <div>You have no invoice</div>
        ) : (
          <InvoiceList>{/* add search bar here  */}</InvoiceList>
        )}
      </Container>
    </InvoicesPage>
  );
};
export default Invoices;

const InvoiceList = styled.div``;

const InvoicesPage = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-size: 1.2rem;
    color: ${(props) => props.theme.color.text.heading};

    span {
      display: block;
      margin-top: 0.45rem;
      font-size: 0.67rem;
      font-weight: 500;
    }
  }

  @media screen and (min-width: 768px) {
    h1 {
      font-size: 2.2rem;

      span {
        font-size: 0.75rem;
      }
    }
  }
`;

const ButtonContainer = styled.div`
  .new-invoice {
    display: flex;
    align-items: center;
    color: #fafafa;
    background: #7c5dfa;
    gap: 0.5rem;
    border-radius: 10rem;
    padding: 0.65rem 1rem;
    box-shadow: ${(props) => props.theme.color.btn.shadow.boxShadow};

    > span {
      display: inline-flex;
      padding: 0.625rem;
      background: white;
      border-radius: 50%;
      background: #fafafa;

      img {
        width: 0.625rem;
        height: 0.625rem;
      }
    }

    p {
      font-size: 0.75rem;
      span {
        display: none;
        @media screen and (min-width: 768px) {
          display: inline-block;
        }
      }
    }
  }
`;

const DropDownContainer = styled.div`
  margin-left: auto;
  margin-right: 1rem;
`;
