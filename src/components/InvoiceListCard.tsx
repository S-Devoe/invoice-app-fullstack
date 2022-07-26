import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Invoice as InvoiceExtended } from "../Types/invoice";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

interface Props {
  invoice: InvoiceExtended;
  index: number;
}

const InvoiceListCard: React.FC<Props> = ({ invoice, index }) => {
  const animation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

   const addComma = (x: any) => {
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   };

  return (
    <Link to={`/invoices/${invoice.id}`}>
      <InvoiceCardContainer key={index} as={motion.div} variants={animation}>
        <Align1>
          <Id>
            {" "}
            <span>#</span>
            {invoice.id}
          </Id>
          <PaymentDue>Due {invoice.paymentDue}</PaymentDue>
          <Total>${addComma(invoice.total)}</Total>
        </Align1>
        <Align2>
          <ClientName>{invoice.clientName}</ClientName>
          <InvoiceStatusBadge status={invoice.status} />
        </Align2>
      </InvoiceCardContainer>
    </Link>
  );
};
export default InvoiceListCard;

const InvoiceCardContainer = styled.div`
  background-color: ${({ theme }) => theme.color.invoiceItem.bg};
  border-radius: 0.5rem;
  padding: 2rem 1.8rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid transparent;
  transition: border 0.3s, background 0.3s;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    border-color: #7c5dfa;
  }

  &:focus,
  :focus-visible,
  :focus-within {
    outline: 2px dotted #7c5dfa;
    border: 2px dotted #7c5dfa;
  }
  @media screen and (min-width: 768px) {
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.95rem;
    gap: 1.5rem;
  }
`;

const Align1 = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;
const Align2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const Id = styled.div`
  line-height: 1.1;
  letter-spacing: -0.63px;
  font-size: 1.15rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.text.heading};
  margin-bottom: 0.85rem;

  span {
    color: ${(props) => props.theme.color.text.bodyA};
  }

  @media screen and (min-width: 768px) {
    flex: 1;
    margin: unset;
  }
`;
const PaymentDue = styled.div`
  font-size: 0.98rem;
  font-weight: 500;
  color: ${(props) => props.theme.color.text.bodyA};
  margin-bottom: 0.85rem;
  @media screen and (min-width: 768px) {
    margin: unset;

    /* max-width: 7.5rem; */
  }
`;
const Total = styled.div`
  font-size: 1.15rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.text.heading};
  line-height: 1.1;
  letter-spacing: -0.63px;

  @media screen and (min-width: 768px) {
    flex: 1;
  }
`;
const ClientName = styled.div`
  color: ${(props) => props.theme.color.text.bodyB};
  line-height: 1.125;
  letter-spacing: -0.25px;
  font-size: 1rem;
`;
