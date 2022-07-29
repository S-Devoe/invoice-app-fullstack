import styled from "styled-components";
import { AiTwotoneCalendar as CalenderIcon } from "react-icons/ai";
import FormInputs from "./FormInputs";
import { Invoice, PaymentTerms } from "../Types/invoice";
import { useRef, useState } from "react";
import parseDate from "../utils/parseDate";
import generateInvoiceId from "../utils/generateInvoiceId";
import isEmailValid from "../utils/isEmailValid";
import OverLay from "./OverLay";
import useMyContext from "../hooks/useContext";
import CalendarComp from "./CalendarComp";
import { AnimatePresence, motion } from "framer-motion";
import InputErrorMessage from "./InputErrorMessage";
import { MdDelete } from "react-icons/md";

interface Props {
  invoices: Invoice[];
  newInvoice: (data: Invoice) => void;
  editInvoice: (data: Invoice) => void;
  invoiceFormData: Invoice | null;
  setInvoiceFormData: (value: any) => void;
}

const InvoiceForm: React.FC<Props> = ({
  invoices,
  newInvoice,
  editInvoice,
  invoiceFormData,
  setInvoiceFormData,
}) => {
  const { setShowForm } = useMyContext();
  const paymentTermsValues = [1, 7, 14, 30];

  const [showCalendar, setShowCalendar] = useState(false);
  const [paymentDropdown, setPaymentDropdown] = useState(false);
  const [date, setDate] = useState(new Date());

  const [noItem, setNoItem] = useState(false);
  const [fieldIsEmpty, setFieldIsEmpty] = useState(false);
  const [showClientEmailError, setShowClientEmailError] = useState(false);

  const dateButton = useRef<HTMLButtonElement | null>(null);
  const calendar = useRef<HTMLInputElement | null>(null);

  const [paymentTerm, setPaymentTerm] = useState<PaymentTerms>(30);
  const [formData, setFormData] = useState<Invoice>({
    id: invoiceFormData?.id || generateInvoiceId(invoices),
    createdAt: invoiceFormData?.createdAt || parseDate(new Date()),
    timestamp: invoiceFormData?.timestamp || new Date(),
    paymentDue:
      invoiceFormData?.paymentDue ||
      parseDate(
        new Date(new Date().setDate(new Date().getDate() + paymentTerm))
      ),
    paymentTerms: invoiceFormData?.paymentTerms || paymentTerm,
    description: invoiceFormData?.description || "",
    clientName: invoiceFormData?.clientName || "",
    clientEmail: invoiceFormData?.clientEmail || "",
    status: invoiceFormData?.status || "",
    senderAddress: {
      street: invoiceFormData?.senderAddress.street || "",
      city: invoiceFormData?.senderAddress.city || "",
      postCode: invoiceFormData?.senderAddress.postCode || "",
      country: invoiceFormData?.senderAddress.country || "",
    },
    clientAddress: {
      street: invoiceFormData?.clientAddress.street || "",
      city: invoiceFormData?.clientAddress.city || "",
      postCode: invoiceFormData?.clientAddress.postCode || "",
      country: invoiceFormData?.clientAddress.country || "",
    },
    items: invoiceFormData?.items || [],
    total: invoiceFormData?.total || 0,
  });

  const [emptyFields, setEmptyFields] = useState({
    senderAddress: {
      street: false,
      city: false,
      postCode: false,
      country: false,
    },
    clientName: false,
    clientEmail: false,
    clientAddress: {
      street: false,
      city: false,
      postCode: false,
      country: false,
    },
    description: false,
  });

  const handleDateChange = (calendarDate: Date) => {
    setDate(calendarDate);

    setFormData({
      ...formData,
      timestamp: new Date(calendarDate),
      createdAt: parseDate(calendarDate),
      paymentDue: parseDate(
        new Date(
          calendarDate.setDate(calendarDate.getDate() + formData.paymentTerms)
        )
      ),
    });
    setShowCalendar(false);
  };

  const handlePaymentTermsValueChange = (index: any) => {
    const paymentTerm = paymentTermsValues[index];
    if (
      paymentTerm !== 1 &&
      paymentTerm !== 7 &&
      paymentTerm !== 14 &&
      paymentTerm !== 30
    )
      throw Error("Value is not of type PaymentTerms");

    setPaymentTerm(paymentTerm);

    setFormData({
      ...formData,
      paymentTerms: paymentTerm,
      paymentDue: parseDate(
        new Date(new Date().setDate(date.getDate() + paymentTermsValues[index]))
      ),
    });

    setPaymentDropdown(false);
  };
  // for adding more items to the list
  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          name: "",
          quantity: 1,
          price: 0,
        },
      ],
    });
  };

  // for sending the item
  const setItem = (e: any, index: number) => {
    const target = e.target;

    const newArray = [...formData.items];

    newArray[index] = {
      ...newArray[index],
      [target.name]: target.value,
    };

    setFormData({
      ...formData,
      items: newArray,
    });
  };

  // for removing or deleting an item
  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item, itemIndex) => itemIndex !== index),
    });
  };

  const setSenderAddress = (e: any) => {
    const target = e.target;

    setFormData((formData) => ({
      ...formData,
      senderAddress: {
        ...formData.senderAddress,
        [target.name]: target.value,
      },
    }));
  };

  const setClientAddress = (e: any) => {
    const target = e.target;

    setFormData((formData) => ({
      ...formData,
      clientAddress: {
        ...formData.clientAddress,
        [target.name]: target.value,
      },
    }));
  };

  // creating a custom form validation. In the future kindly use a react form package
  const validateForm = () => {
    let formIsValid = true;

    setFieldIsEmpty(false);
    setNoItem(false);
    setShowClientEmailError(false);

    const newEmptyFields = {
      senderAddress: {
        street: false,
        city: false,
        postCode: false,
        country: false,
      },
      clientName: false,
      clientEmail: false,
      clientAddress: {
        street: false,
        city: false,
        postCode: false,
        country: false,
      },
      description: false,
    };

    if (!formData.senderAddress.street.length) {
      newEmptyFields.senderAddress.street = true;
      formIsValid = false;
      setFieldIsEmpty(true);
    }

    if (!formData.senderAddress.city.length) {
      newEmptyFields.senderAddress.city = true;
      formIsValid = false;
      setFieldIsEmpty(true);
    }
    if (!formData.senderAddress.postCode.length) {
      newEmptyFields.senderAddress.postCode = true;
      formIsValid = false;
      setFieldIsEmpty(true);
    }
    if (!formData.senderAddress.country.length) {
      newEmptyFields.senderAddress.country = true;
      formIsValid = false;
      setFieldIsEmpty(true);
    }

    if (!formData.clientName.length) {
      newEmptyFields.clientName = true;
      formIsValid = false;
      setFieldIsEmpty(true);
    }

    if (!formData.clientEmail.length) {
      newEmptyFields.clientEmail = true;
      formIsValid = false;
      setFieldIsEmpty(true);
    } else if (!isEmailValid(formData.clientEmail)) {
      formIsValid = false;
      setShowClientEmailError(true);
      newEmptyFields.clientEmail = false;
    }

    if (!formData.clientAddress.street.length) {
      newEmptyFields.clientAddress.street = true;
      formIsValid = false;
      setFieldIsEmpty(true);
    }

    if (!formData.clientAddress.city.length) {
      newEmptyFields.clientAddress.city = true;
      formIsValid = false;
      setFieldIsEmpty(true);
    }

    if (!formData.clientAddress.postCode.length) {
      newEmptyFields.clientAddress.postCode = true;
      formIsValid = false;
      setFieldIsEmpty(true);
    }

    if (!formData.clientAddress.country.length) {
      newEmptyFields.clientAddress.country = true;
      formIsValid = false;
      setFieldIsEmpty(true);
    }

    if (!formData.description.length) {
      newEmptyFields.description = true;
      formIsValid = false;
      setFieldIsEmpty(true);
    }

    if (!formData.items.length) {
      formIsValid = false;
      setNoItem(true);
    }

    const areAllItemsNamed = formData.items.every((item) => item.name !== "");
    if (!areAllItemsNamed) {
      formIsValid = false;
      setFieldIsEmpty(true);
    }

    setEmptyFields(newEmptyFields);
    return formIsValid;
  };

  const handleSubmit = (
    e: any,
    operation: "draft" | "edit" | "create" | "editDraft"
  ) => {
    e.preventDefault();

    const total = parseFloat(
      formData.items
        .map((item) => item.price * item.quantity)
        .reduce((prev, curr) => prev + curr, 0)
        .toFixed(2)
    );

    if (operation === "draft") {
      newInvoice({
        ...formData,
        status: "draft",
        total: total,
      });
    }

    if (operation === "editDraft") {
      editInvoice({
        ...formData,
        status: "draft",
      });
    }

    if (operation === "edit") {
      const isFormValid = validateForm();
      if (!isFormValid) return;

      editInvoice({
        ...formData,
        total: total,
        status: "pending",
      });
    }

    if (operation === "create") {
      const isFormValid = validateForm();
      if (!isFormValid) return;

      newInvoice({
        ...formData,
        status: "pending",
        total,
      });
    }

    setShowForm(false);
  };

  const handleInputChange = (e: any) => {
    const target = e.target;

    setFormData((formData) => ({
      ...formData,
      [target.name]: target.value,
    }));
  };

  const closeForm = () => {
    setShowForm(false);

    // to clear any existing value in the form
    setInvoiceFormData(null);
  };

  return (
    <OverLay>
      <FormContainer
        as={motion.section}
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "0", opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 0.65, type: "spring" }}
      >
        <Heading>Create Invoice</Heading>
        <form action="">
          <BillByFieldset>
            <legend>Bill by</legend>
            <ContentContainer className="billed-by">
              <FormInputs
                label="Address"
                autoComplete="off"
                name="street"
                id="address"
                value={formData.senderAddress.street}
                type="text"
                required={true}
                spellcheck={false}
                handleInputChange={(e) => setSenderAddress(e)}
                showError={emptyFields.senderAddress.street}
              />
            </ContentContainer>
            <div className="align1">
              <ContentContainer className="gridAlign">
                <FormInputs
                  autoComplete="off"
                  label="City"
                  id="city"
                  name="city"
                  required={true}
                  spellcheck={false}
                  type="text"
                  value={formData.senderAddress.city}
                  handleInputChange={(e) => setSenderAddress(e)}
                  showError={emptyFields.senderAddress.city}
                />
                <FormInputs
                  autoComplete="off"
                  label="Postal Code"
                  id="postalCode"
                  name="postCode"
                  required={true}
                  spellcheck={false}
                  type="number"
                  value={formData.senderAddress.postCode}
                  handleInputChange={(e) => setSenderAddress(e)}
                  showError={emptyFields.senderAddress.postCode}
                />
              </ContentContainer>
              <ContentContainer>
                <FormInputs
                  autoComplete="off"
                  label="Country"
                  id="country"
                  name="country"
                  required={true}
                  spellcheck={false}
                  type="text"
                  value={formData.senderAddress.country}
                  handleInputChange={(e) => setSenderAddress(e)}
                  showError={emptyFields.senderAddress.country}
                />
              </ContentContainer>
            </div>
          </BillByFieldset>
          <BillToFieldset>
            <legend>Bill to</legend>
            <ContentContainer>
              <FormInputs
                autoComplete="off"
                label="Fullname"
                id="client-name"
                name="clientName"
                required={true}
                spellcheck={false}
                type="text"
                value={formData.clientName}
                handleInputChange={(e) => handleInputChange(e)}
                showError={emptyFields.clientName}
              />
            </ContentContainer>
            <ContentContainer>
              <FormInputs
                autoComplete="off"
                label="E-mail"
                id="client-email"
                name="clientEmail"
                required={true}
                spellcheck={false}
                type="text"
                value={formData.clientEmail}
                handleInputChange={(e) => handleInputChange(e)}
                placeholder="example@email.com"
                showError={emptyFields.clientEmail || showClientEmailError}
              />
            </ContentContainer>
            <ContentContainer>
              <FormInputs
                autoComplete="off"
                label="Address"
                id="client-address"
                name="street"
                required={true}
                spellcheck={false}
                type="text"
                value={formData.clientAddress.street}
                handleInputChange={(e) => setClientAddress(e)}
                showError={emptyFields.clientAddress.street}
              />
            </ContentContainer>
            <ContentContainer className="gridAlign">
              <div className="grid-align-content">
                <FormInputs
                  autoComplete="off"
                  label="City"
                  id="client-city"
                  name="city"
                  required={true}
                  spellcheck={false}
                  type="text"
                  value={formData.clientAddress.city}
                  handleInputChange={(e) => setClientAddress(e)}
                  showError={emptyFields.clientAddress.city}
                />
                <FormInputs
                  autoComplete="off"
                  label="Postal Code"
                  id="client-postalCode"
                  name="postCode"
                  required={true}
                  spellcheck={false}
                  type="number"
                  value={formData.clientAddress.postCode}
                  handleInputChange={(e) => setClientAddress(e)}
                  showError={emptyFields.clientAddress.postCode}
                />
              </div>
              <FormInputs
                autoComplete="off"
                label="Country"
                id="client-country"
                name="country"
                required={true}
                spellcheck={false}
                type="text"
                value={formData.clientAddress.country}
                handleInputChange={(e) => setClientAddress(e)}
                showError={emptyFields.clientAddress.country}
              />
            </ContentContainer>
            <ContentContainer className="gridAlign2">
              <DateContainer>
                <label className="payment-label">Invoice Date</label>
                <button
                  type="button"
                  className="payment-button"
                  ref={dateButton}
                  onClick={() => setShowCalendar((prev) => !prev)}
                >
                  <div className="calendar">{formData?.createdAt}</div>
                  <CalenderIcon style={{ fontSize: "1.04rem" }} />
                </button>
                {showCalendar && (
                  <CalendarComp
                    calendarRef={calendar}
                    date={formData.timestamp || new Date()}
                    onChange={(date: Date) => handleDateChange(date)}
                  />
                )}
              </DateContainer>
              <PaymentContainer>
                <label className="date-label">Payment Term</label>
                <button
                  type="button"
                  className="date-button"
                  onClick={() => setPaymentDropdown((prev) => !prev)}
                >
                  <DropDownValue>
                    {formData.paymentTerms === 1
                      ? `${formData.paymentTerms} day net`
                      : `${formData.paymentTerms} days net`}
                  </DropDownValue>
                  <ArrowIcon>
                    <img
                      src="/images/icon-arrow-down.svg"
                      alt="dropdown icon"
                      style={{
                        transform: paymentDropdown
                          ? "rotate(-180deg)"
                          : "rotate(0)",
                        transition: ".25s linear",
                      }}
                    />
                  </ArrowIcon>
                </button>
                <AnimatePresence>
                  {paymentDropdown && (
                    <PaymentTermsDropdown
                      as={motion.span}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.25, type: "tween" }}
                    >
                      <ul>
                        {paymentTermsValues.map((value, index) => (
                          <li key={index}>
                            <button
                              type="button"
                              onClick={() =>
                                handlePaymentTermsValueChange(index)
                              }
                              style={{
                                color:
                                  formData.paymentTerms === value
                                    ? "#7c5dfa"
                                    : "default",
                              }}
                            >
                              {value === 1
                                ? `${value} day net`
                                : `${value} days net`}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </PaymentTermsDropdown>
                  )}
                </AnimatePresence>
              </PaymentContainer>
            </ContentContainer>
            <ContentContainer>
              <FormInputs
                autoComplete="off"
                label="Project Description"
                id="project-description"
                name="description"
                required={true}
                spellcheck={false}
                type="text"
                value={formData.description}
                handleInputChange={(e) => handleInputChange(e)}
              />
            </ContentContainer>
          </BillToFieldset>
          <ItemList>
            <ItemListTitle>Item List</ItemListTitle>
            {formData.items.length !== 0 && (
              <ServiceList>
                {formData.items.map((item, index) => (
                  <li key={index}>
                    <div>
                      <ItemGrid>
                        <div className="grid1">
                          <FormInputs
                            autoComplete="off"
                            label="Name"
                            id={`item-name-${index}`}
                            name="name"
                            required={true}
                            spellcheck={false}
                            type="text"
                            value={item.name}
                            handleInputChange={(e) => setItem(e, index)}
                          />
                        </div>
                        <div className="grid2">
                          <FormInputs
                            autoComplete="off"
                            label="Qty"
                            id={`item-name-${index}`}
                            name="quantity"
                            required={true}
                            spellcheck={false}
                            type="number"
                            value={item.quantity.toString()}
                            handleInputChange={(e) => setItem(e, index)}
                            min="1"
                          />
                        </div>
                        <div className="grid3">
                          <FormInputs
                            autoComplete="off"
                            label="Price"
                            id={`item-name-${index}`}
                            name="price"
                            required={true}
                            spellcheck={false}
                            type="number"
                            value={item.price.toString()}
                            handleInputChange={(e) => setItem(e, index)}
                          />
                        </div>
                        <div className="grid4">
                          <Total>
                            <h3>Total</h3>
                            <p>$ {(+item.quantity * +item.price).toFixed(2)}</p>
                          </Total>
                        </div>
                        <div className="grid5">
                          <DeleteButton
                            type="button"
                            onClick={() => removeItem(index)}
                          >
                            {/* <img src="./images/icon-delete.svg" alt="delete" /> */}
                            <span>
                              <MdDelete />
                            </span>
                          </DeleteButton>
                        </div>
                      </ItemGrid>
                    </div>
                  </li>
                ))}
              </ServiceList>
            )}
            <AddListContainer type="button" onClick={addItem}>
              <div className="container">
                <img src="/images/icon-plus.svg" alt="add list" />
                Add New Item
              </div>
            </AddListContainer>
          </ItemList>
        </form>
        <ErrorMessageContainer>
          {fieldIsEmpty && (
            <InputErrorMessage>- All field must be completed</InputErrorMessage>
          )}
          {showClientEmailError && (
            <InputErrorMessage>
              - Invalid client email address
            </InputErrorMessage>
          )}
          {noItem && (
            <InputErrorMessage>
              {" "}
              - At least 1 Item must be added
            </InputErrorMessage>
          )}
        </ErrorMessageContainer>

        {!invoiceFormData ? (
          <InvoiceButtons>
            <div className="left">
              <button
                type="button"
                className="discard"
                onClick={() => closeForm()}
              >
                Discard
              </button>
            </div>
            <div className="right">
              <button
                type="button"
                className="draft"
                onClick={(e) => handleSubmit(e, "draft")}
              >
                Draft
              </button>
              <button
                type="button"
                className="send"
                onClick={(e) => handleSubmit(e, "create")}
              >
                Save & Send
              </button>
            </div>
          </InvoiceButtons>
        ) : (
          <InvoiceButtons>
            <div className="left">
              <button
                type="button"
                className="discard"
                onClick={() => closeForm()}
              >
                Discard
              </button>
            </div>
            <div className="right">
              {invoiceFormData?.status && invoiceFormData?.status === "draft" && (
                <button
                  type="button"
                  className="draft"
                  onClick={(e) => handleSubmit(e, "editDraft")}
                >
                  Save Draft
                </button>
              )}
              <button
                type="button"
                className="send"
                onClick={(e) => handleSubmit(e, "edit")}
              >
                Save & Send
              </button>
            </div>
          </InvoiceButtons>
        )}
      </FormContainer>
    </OverLay>
  );
};
export default InvoiceForm;

const ErrorMessageContainer = styled.div``;
const InvoiceButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  font-size: 1rem;
  margin-top: 1rem;
  padding-bottom: 2rem;
  box-shadow: 2px -34px 153px -3px rgba(211, 203, 203, 0.75);

  button {
    font-family: "Spartan", sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    border: none;
    outline: none;
    transition: background 0.3s linear;
    cursor: pointer;
    padding: 0.55rem 1rem;
    border-radius: 2rem;
    font-size: 0.856rem;
  }

  .discard {
    background-color: ${({ theme }) => theme.color.btn.secondary.bg};
    color: ${({ theme }) => theme.color.text.bodyA};
    padding: 1rem;
    &:hover {
      background-color: ${({ theme }) => theme.color.btn.secondary.hover};
    }
  }

  .draft {
    margin-left: auto;
    color: #fafafa;
    background-color: ${({ theme }) => theme.color.btn.tertiary.bg};
    padding-block: 1.1rem;

    &:hover {
      background-color: ${({ theme }) => theme.color.btn.tertiary.hover};
    }
  }

  .send {
    margin-right: 0.5rem;
    color: #fafafa;
    background: #7c5dfa;
    transition: background 0.25s ease-in;

    &:hover {
      background: #513aad;
    }
  }

  .right {
    display: flex;
    gap: 1rem;
  }
`;
const DeleteButton = styled.button`
  background: none;
  outline: none;
  border: none;

  span {
    color: #888eb0;
    font-size: 1rem;
  }
`;
const Total = styled.div`
  font-size: 0.85rem;
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.color.text.formLabel};
  h3 {
    font-weight: 500;
    margin-top: -1rem;
  }
`;
const AddListContainer = styled.button`
  width: 100%;
  border-radius: 10rem;
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.color.form.fieldBorder};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  .container {
    padding-block: 0.65rem;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: "Spartan" sans-serif;
    color: ${(props) => props.theme.color.text.formLabel};
    img {
      margin-right: 0.5rem;
    }

    @media screen and (min-width: 768px) {
      padding-block: 1rem;
    }
  }
`;
const ItemList = styled.div``;
const ItemGrid = styled.div`
  display: grid;
  grid-template-areas: "grid1 grid2 grid3 grid4 grid5";
  gap: 1rem;
  align-items: center;

  .grid1 {
    grid-area: grid1;
  }
  .grid2 {
    grid-area: grid2;
  }
  .grid3 {
    grid-area: grid3;
  }
  .grid4 {
    grid-area: grid4;
  }
  .grid5 {
    margin-left: 0.5rem;
    grid-area: grid5;
  }

  @media screen and (min-width: 768px) {
    .grid5 {
      margin-left: 1.85rem;
      grid-area: grid5;
    }
  }
`;
const ServiceList = styled.ul``;
const ItemListTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.4rem;
  color: ${(props) => props.theme.color.text.heading};
`;

const FormContainer = styled.section`
  background: ${(props) => props.theme.color.form.bg};
  position: absolute;
  height: calc(100vh - 4rem);
  /* height: 100vh; */
  z-index: 10;
  top: 4.5rem;
  bottom: 0;
  padding: 2.4rem 2.4rem 3.2rem;

  @media screen and (min-width: 768px) {
    height: calc(100% - 4rem);
    right: 5rem;
    border-top-right-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
  }

  @media screen and (min-width: 1000px) {
    width: 40rem;
    top: 0;
    left: 2rem;
    height: 100vh;
    margin-right: 5rem;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }

  form {
    padding: 1rem 0;
    overflow: hidden;
    height: 90%;
    overflow-y: auto;

    fieldset {
      border: none;

      legend {
        font-size: 1rem;
        font-weight: bold;
        color: rgb(124, 93, 250);
        margin-bottom: 1rem;
        margin-top: 1rem;
      }
    }
    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.color.form.fieldBorder};
      border-radius: 0.4rem;
    }

    input {
      &::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
    }
  }

  @media screen and (min-width: 768px) {
    form {
      padding-right: 0.8rem;
    }
  }
`;
const Heading = styled.h2`
  color: ${(props) => props.theme.color.text.heading};
  font-size: 1.5rem;
`;

const BillByFieldset = styled.fieldset`
  margin-bottom: 1rem;
  .align1 {
    .gridAlign {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1.2rem;
    }
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 1.2rem;
    .align1 {
      display: flex;
      gap: 1.2rem;

      .gridAlign {
        display: flex;
      }
    }
  }
`;

const BillToFieldset = styled.fieldset`
  .gridAlign {
    .grid-align-content {
      display: flex;
      gap: 1.2rem;
    }

    @media screen and (min-width: 768px) {
      display: flex;
      gap: 1.2rem;
    }
  }

  .gridAlign2 {
    display: flex;
    width: 100%;
    gap: 1.2rem;
  }
`;

const ContentContainer = styled.div``;

const PaymentTermsDropdown = styled.div`
  position: absolute;
  top: 5.5rem;
  left: 8%;
  z-index: 10;

  ul {
    list-style-type: none;
    background-color: ${({ theme }) => theme.color.input.bg};
    min-width: 15rem;
    width: 100%;
    max-width: 40rem;
    border-radius: 0.5rem;
    box-shadow: rgba(100, 100, 111, 0.25) 0px 7px 29px 0px;
    margin-bottom: 5rem;

    li {
      width: 100%;
      border-bottom: 1px solid ${(props) => props.theme.color.input.border};

      button {
        background: none;
        border: none;
        outline: none;
        padding-left: 1rem;
        padding-top: 1.5rem;
        padding-bottom: 0.65rem;
        width: 100%;
        text-align: left;
        font-size: 0.8rem;
        font-weight: 500;
        font-family: "Spartan", sans-serif;
        color: ${(props) => props.theme.color.text.heading};
        cursor: pointer;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
  @media screen and (min-width: 768px) {
    left: 0;
    right: 0;
  }
`;

const DateContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    color: ${(props) => props.theme.color.text.formLabel};
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
  }

  button {
    background: none;
    background-color: ${({ theme }) => theme.color.input.bg};
    border: 1px solid ${(props) => props.theme.color.input.border};
    outline: none;
    border-radius: 0.5rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    font-size: 0.8rem;
    font-family: "Spartan", sans-serif;
    color: ${(props) => props.theme.color.text.heading};
  }
`;

const PaymentContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  flex-direction: column;
  margin-bottom: 1rem;
  cursor: pointer;

  label {
    color: ${(props) => props.theme.color.text.formLabel};
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  > button {
    background: none;
    background-color: ${({ theme }) => theme.color.input.bg};
    border: 1px solid ${(props) => props.theme.color.input.border};
    outline: none;
    border-radius: 0.5rem;

    display: flex;
    justify-content: space-between;
    padding: 1rem;
    font-size: 0.8rem;
    font-family: "Spartan", sans-serif;
    color: ${(props) => props.theme.color.text.heading};

    &:focus {
      color: #7c5dfa;
    }
  }
`;

const DropDownValue = styled.span`
  font-weight: 500;
`;

const ArrowIcon = styled.span``;
