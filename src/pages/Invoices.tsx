
import {  motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import InvoiceListCard from "../components/InvoiceListCard";
import LoadingSpinner from "../components/LoadingSpinner";
import NoInvoice from "../components/NoInvoice";
import Searchbar from "../components/Searchbar";
import useMyContext from "../hooks/useContext";
import {
  Invoice as InvoicesExtended,
  Invoice,
  CheckedStatus,
} from "../Types/invoice";

interface Props {
  invoices: Invoice[];
  
}

const Invoices: React.FC<Props> = ({
  invoices,
  
  
}) => {
  const animation = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const {  setShowForm } = useMyContext();
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [startAnimation, setStartAnimation] = useState(true);
  const [searchedValue, setSearchedValue] = useState("");
  const [filteredInvoiceStatus, setFilteredInvoiceStatus] = useState<
    Invoice[] | null
  >(null);

  // Reset the history state so the correct animation can trigger on every refresh
  useEffect(() => {
    window.history.replaceState({}, "");
    setFilteredInvoices(invoices);

    setTimeout(() => setStartAnimation(false), 1500);
  }, [invoices]);

  const filteredByStatus = (checkboxesStatus: CheckedStatus[]) => {
    const isFilterApplied = checkboxesStatus.some(
      (checkbox) => checkbox.checked
    );

    if (isFilterApplied) {
      const newArray: any = invoices.filter((invoice) =>
        checkboxesStatus.find(
          (chkboxStatus) =>
            chkboxStatus.checked && invoice.status === chkboxStatus.name
        )
      );
      setFilteredInvoiceStatus(newArray);
      return setFilteredInvoices(newArray);
    }
    setFilteredInvoiceStatus(invoices);
    return setFilteredInvoices(invoices);
  };

  useEffect(() => {
    const inv = filteredInvoiceStatus?.length
      ? filteredInvoiceStatus
      : invoices;

    const newInvoices = inv.filter((invoice: InvoicesExtended) =>
      invoice.clientName
        .toLowerCase()
        .includes(searchedValue.toLowerCase().trim())
    );

    searchedValue === ""
      ? setFilteredInvoices(
          filteredInvoiceStatus?.length ? filteredInvoiceStatus : invoices
        )
      : setFilteredInvoices(newInvoices);
  }, [invoices, filteredInvoiceStatus, searchedValue]);

  return (
    <InvoicesPage>
      <Container>
        <Header>
          <h1>
            Invoices
            <span>
              {invoices.length >= 1 &&
                `There ${invoices.length <= 1 ? "is" : "are"} ${
                  invoices.length
                } invoice(s) in total`}
            </span>
          </h1>

          <DropDownContainer>
            <Dropdown
              filterByStatus={(checkboxesStatus) =>
                filteredByStatus(checkboxesStatus)
              }
            />
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
        {invoices.length < 1 && !searchedValue ? (
          startAnimation ? (
            <LoadingSpinner />
          ) : (
            <NoInvoice />
          )
        ) : startAnimation ? (
          <LoadingSpinner />
        ) : (
          <InvoiceList
            as={motion.div}
            variants={animation}
            initial="hidden"
            animate="visible"
          >
            <Searchbar
              searchedValue={searchedValue}
              setSearchedValue={(value: string) => setSearchedValue(value)}
            />
            {filteredInvoices.map((invoice, index) => (
              <InvoiceListCard key={index} invoice={invoice} index={index} />
            ))}
          </InvoiceList>
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
  margin-bottom: 2.25rem;

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
