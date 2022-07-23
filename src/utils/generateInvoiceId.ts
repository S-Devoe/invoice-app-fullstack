import { Invoice } from "../Types/invoice";

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const randomLetter = () => {
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

const randomNumber = () => {
  return Math.floor(Math.random() * 9);
};

const generateInvoiceId = (invoices: Invoice[] ): string => {
  const id =
    randomLetter() +
    randomLetter() +
    randomNumber() +
    randomNumber() +
    randomNumber() +
    randomNumber();

  const idAlreadyExist = invoices.some((invoice) => invoice.id === id);
  if (idAlreadyExist) {
    return generateInvoiceId(invoices);
  }
  return id;


};

export default generateInvoiceId


