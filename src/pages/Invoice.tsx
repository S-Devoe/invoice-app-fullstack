import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ConfirmModal from "../components/ConfirmModal";
import InvoiceStatusBadge from "../components/InvoiceStatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import OverLay from "../components/OverLay";
import { Invoice as InvoicesExtended } from "../Types/invoice";

interface Props {
  markAsPaid: (id: string) => void;
  deleteInvoice: (id: string) => void;
  showInvoiceForm: (id: string) => void;
  showFormToEdit: (id: string) => void;
  invoices: InvoicesExtended[];
}

const Invoice: React.FC<Props> = ({
  invoices,
  markAsPaid,
  deleteInvoice,
  showInvoiceForm,
  showFormToEdit,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState<InvoicesExtended | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMarkAsPaidModal, setShowMarkAsPaidModal] = useState(false);
  const [startAnimation, setStartAnimation] = useState(true);

  // Reset the history state so the correct animation can trigger on refresh
  useEffect(() => {
    window.history.replaceState({}, "");
    setTimeout(() => setStartAnimation(false), 1500);
  }, []);

  useEffect(() => {
    if (invoices) {
      const invoice = invoices?.find((invoice) => invoice.id === id);
      if (!invoice) return navigate("/invoices");
      setInvoice(invoice);
    }
  }, [invoices, id, navigate]);

  const handleMarkAsPaid = () => {
    if (!id)
      throw Error(
        "Couldn't mark this invoice as paid because its id is undefined"
      );

    markAsPaid(id);
    setShowMarkAsPaidModal(false);
  };

  const handleEditButton = (id: string | undefined) => {
    if (!id) throw Error("Undefined invoice id");

    showInvoiceForm(id);
    showFormToEdit(id);
  };

  const handleDeleteInvoice = () => {
    if (!id)
      throw Error("Couldn't delete the invoice because it id is undefined");

    deleteInvoice(id);
    setShowConfirmModal(false);
    navigate("/invoices");
  };

  const addComma = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return startAnimation ? (
    <LoadingSpinner />
  ) : (
    <>
      {showMarkAsPaidModal && (
        <OverLay center={true}>
          <ConfirmModal
            title={`Mark #${id} as paid?`}
            text="This action cannot be modified after submitting"
            cancelText="Cancel"
            confirmText="Confirm"
            cancel={() => setShowMarkAsPaidModal(false)}
            confirm={handleMarkAsPaid}
          />
        </OverLay>
      )}

      {showConfirmModal && (
        <OverLay center={true}>
          <ConfirmModal
            title={`Delete invoice with Id #${id}`}
            text="This action cannot be modified after submitting"
            cancelText="Cancel"
            confirmText="Confirm"
            cancel={() => setShowMarkAsPaidModal(false)}
            confirm={handleDeleteInvoice}
          />
        </OverLay>
      )}
      {invoice && (
        <Container>
          <ReturnButton onClick={() => navigate(-1)}>
            <img src="/images/icon-arrow-left.svg" alt="go back" />{" "}
            <p>Go Back</p>
          </ReturnButton>
          <TopHeader>
            <Status>
              <p>Status</p>
              <div className="status">
                <InvoiceStatusBadge status={invoice.status} />
              </div>
            </Status>

            <DesktopButtonView>
              {invoice.status !== "paid" && (
                <button className="edit" onClick={() => handleEditButton(id)}>
                  Edit
                </button>
              )}
              <button
                className="delete"
                onClick={() => setShowConfirmModal(true)}
              >
                Delete
              </button>
              {invoice.status === "pending" && (
                <button
                  className="paid"
                  onClick={() => setShowMarkAsPaidModal(true)}
                >
                  Mark As Paid
                </button>
              )}
            </DesktopButtonView>
          </TopHeader>
          <InvoiceContent>
            <InvoiceContentChild1>
              <div className="left">
                <div className="id">
                  <span>#</span>
                  {invoice.id}
                </div>
                <div className="description">{invoice.description}</div>
              </div>
              <div className="right">
                <div className="street">{invoice.senderAddress.street}</div>
                <div className="city">{invoice.senderAddress.city}</div>
                <div className="postalCode">
                  {invoice.senderAddress.postCode}
                </div>
                <div className="country">{invoice.senderAddress.country}</div>
              </div>
            </InvoiceContentChild1>
            <InvoiceContentChild2>
              <div className="left">
                <div className="date">
                  <div className="invoice-date">
                    <p>Invoice date</p>
                    <h3> {invoice.createdAt}</h3>
                  </div>
                  <div className="payment-date">
                    <p>Payment Due</p>
                    <h3>{invoice.paymentDue}</h3>
                  </div>
                </div>
                <div className="billTo">
                  <p>Bill to</p>
                  <h3>{invoice.clientName}</h3>
                  <p>{invoice.clientAddress.street}</p>
                  <p>{invoice.clientAddress.city}</p>
                  <p>{invoice.clientAddress.postCode}</p>
                  <p>{invoice.clientAddress.country}</p>
                </div>
              </div>
              <div className="right">
                <p>Send To</p>
                <h3>{invoice.clientEmail}</h3>
              </div>
            </InvoiceContentChild2>
            <InvoiceTableDesktop>
              <table>
                <thead>
                  <tr>
                    <th className="head-name">Item Name</th>
                    <th className="head-qty">QTY</th>
                    <th className="head-price">Price</th>
                    <th className="head-total">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr>
                      <td className="item-name">{item.name}</td>
                      <td className="item-quantity">{item.quantity}</td>
                      <td className="item-price">${addComma(item.price)}</td>
                      <td className="item-total">
                        ${addComma(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InvoiceTableDesktop>
            <InvoiceTableMobile>
              <table>
                {invoice.items.map((item) => (
                  <tr>
                    <td className="item-name">{item.name}</td>

                    <td className="item-total">
                      ${addComma(item.quantity * item.price)}
                    </td>
                  </tr>
                ))}
              </table>
            </InvoiceTableMobile>
            <Amount>
              <p>Amount Due</p>
              <span>${addComma(invoice.total)}</span>
            </Amount>
          </InvoiceContent>
          <MobileButtonView>
            {invoice.status !== "paid" && (
              <button className="edit" onClick={() => handleEditButton(id)}>
                Edit
              </button>
            )}
            <button
              className="delete"
              onClick={() => setShowConfirmModal(true)}
            >
              Delete
            </button>
            {invoice.status === "pending" && (
              <button
                className="paid"
                onClick={() => setShowMarkAsPaidModal(true)}
              >
                Mark As Paid
              </button>
            )}
          </MobileButtonView>
        </Container>
      )}
    </>
  );
};
export default Invoice;

const Container = styled.section`
  margin-top: 2rem;
`;

const Amount = styled.div`
  background: ${(props) => props.theme.color.invoiceTable.footerBg};
  transition: background 0.3s;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: 1rem 1.2rem;
  display: flex;
  justify-content: space-between;
  color: #fafafa;

  p {
    font-size: 0.85rem;
    font-weight: 600;
  }

  span {
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

const InvoiceTableMobile = styled.div`
  margin-top: 2rem;
  width: 100%;
  border-spacing: 0;
  padding: 1rem 1.2rem;
  background: ${(props) => props.theme.color.invoiceTable.bg};
  transition: background 0.3s;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;

  td {
    font-weight: 600;
    font-size: 1rem;
    color: ${({ theme }) => theme.color.text.heading};
    padding-bottom: 1.85rem;

    &:last-child {
      width: 100%;
      text-align: end;
    }
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const InvoiceTableDesktop = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
    margin-top: 3rem;
    width: 100%;
    border-spacing: 0;
    padding: 1rem 1.2rem;
    background: ${(props) => props.theme.color.invoiceTable.bg};
    transition: background 0.3s;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    table {
      width: 100%;
      th {
        font-weight: 500;
        font-size: 0.85rem;
        color: ${({ theme }) => theme.color.text.bodyB};
        text-align: end;
        padding-bottom: 1.5rem;

        &:nth-child(1) {
          text-align: start;
        }

        &:nth-child(2) {
          text-align: start;
        }
        &:nth-child(3) {
          text-align: start;
        }
      }

      td {
        font-weight: 600;
        font-size: 1rem;
        color: ${({ theme }) => theme.color.text.heading};
        padding-bottom: 1.85rem;

        &:last-child {
          text-align: end;
        }
      }
    }
  }
`;

const InvoiceContent = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  background-color: ${({ theme }) => theme.color.invoiceItem.bg};
  border-radius: 0.5rem;
  padding: 1.5rem 1.5rem;
`;
const InvoiceContentChild1 = styled.div`
  .left {
    margin-bottom: 2rem;
    .id {
      font-size: 1.1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.color.text.heading};
      span {
        color: ${({ theme }) => theme.color.text.bodyA};
      }
      margin-bottom: 0.25rem;
    }

    .description {
      font-size: 0.95rem;
      color: ${({ theme }) => theme.color.text.bodyB};
    }
  }

  .right {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.color.text.bodyB};
    line-height: 1.5;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    .left {
      margin-bottom: unset;
    }

    .right {
      text-align: right;
    }
  }
`;

const InvoiceContentChild2 = styled.div`
  margin-top: 2rem;
  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.color.text.bodyB};
    line-height: 1.56;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.color.text.heading};
    line-height: 1.5;
  }

  .left {
    display: flex;
    justify-content: space-between;

    .date {
      .invoice-date {
        margin-bottom: 2.85rem;
      }
    }

    .billTo {
      h3 {
        margin-top: 0.65rem;
      }
    }
  }
  .right {
    margin-top: 1rem;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;

    .left {
      gap: 2.5rem;
    }
  }
`;

const ReturnButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  cursor: pointer;

  img {
    height: 0.65rem;
    width: 0.65rem;
    margin-top: -0.15rem;
  }

  p {
    font-weight: 600;
    font-size: 1rem;
    color: ${({ theme }) => theme.color.text.heading};
  }
`;

const TopHeader = styled.div`
  background-color: ${({ theme }) => theme.color.invoiceItem.bg};
  border-radius: 0.5rem;
  padding: 1rem 1.8rem;
  display: flex;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 100%;
    gap: 2.5rem;
    justify-content: space-between;
  }
`;
const Status = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  @media screen and (min-width: 768px) {
    justify-content: unset;
    gap: 1rem;

    p {
      color: ${(props) => props.theme.color.text.bodyA};
      font-size: 0.95rem;
      line-height: 1.1;
    }
  }
`;

const DesktopButtonView = styled.div`
  display: none;
  width: 100%;

  flex: 1;
  gap: 1rem;
  button {
    padding: 0.65rem 0.85rem;
    min-width: 5rem;
    border: none;
    outline: none;
    border-radius: 4rem;
    font-weight: 700;
    font-size: 0.85rem;
    line-height: 1.25;
    cursor: pointer;
  }
  .edit {
    background-color: ${({ theme }) => theme.color.btn.secondary.bg};
    color: ${({ theme }) => theme.color.text.bodyA};
    &:hover {
      background-color: ${({ theme }) => theme.color.btn.secondary.hover};
    }
  }

  .delete {
    background: rgb(236, 87, 87);
    color: #fafafa;
  }

  .paid {
    color: #fafafa;
    background: #7c5dfa;
    transition: background 0.25s ease-in;
    width: 8rem;
  }

  @media screen and (min-width: 768px) {
    display: flex;
  }
`;

const MobileButtonView = styled(DesktopButtonView)`
  display: flex;
  flex-direction: column;
  display: flex;
  background-color: ${({ theme }) => theme.color.invoiceItem.bg};
  border-radius: 0.5rem;
  padding: 1.5rem 1.5rem;

  .paid {
    width: 100%;
  }

  @media screen and (min-width: 400px) {
    width: 100%;
    flex-direction: row;
  }
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
