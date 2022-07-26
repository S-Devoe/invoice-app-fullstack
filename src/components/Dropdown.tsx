import { useState } from "react";
import styled from "styled-components";
import { CheckedStatus } from "../Types/invoice";

interface Props {
  filterByStatus: (checkboxesStatus: CheckedStatus[]) => void;
}

const Dropdown: React.FC<Props> = ({ filterByStatus }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CheckedStatus[]>([
    {
      id: 1,
      text: "Paid",
      name: "paid",
      checked: false,
    },
    {
      id: 2,
      text: "Pending",
      name: "pending",
      checked: false,
    },
    {
      id: 3,
      text: "Draft",
      name: "draft",
      checked: false,
    },
  ]);

  const changeCheckboxStatus = (id: number) => {
    const checkbox = options.find((option) => option.id === id);

    if (!checkbox) throw new Error("Undefined checkbox");

    checkbox.checked = !checkbox.checked;

    setOptions([...options]);
    filterByStatus(options);
  };

  return (
    <DropDownContainer open={open}>
      <Head>
        <Heading as="div" onClick={() => setOpen(!open)}>
          <p>
            Filter <span>by status</span>{" "}
          </p>
          <img src="/images/icon-arrow-down.svg" alt="dropdown icon" />
        </Heading>

        {open && (
          <DropDownContent>
            {options.map((option) => (
              <Label
                key={option.id}
                onClick={() => changeCheckboxStatus(option.id)}
              >
                <CustomCheckbox selected={option.checked}>
                  <img
                    src="/images/icon-check.svg"
                    alt="check icon"
                    style={{ display: option.checked ? "block" : "none" }}
                  />
                </CustomCheckbox>
                <span>{option.text}</span>
              </Label>
            ))}
          </DropDownContent>
        )}
      </Head>
    </DropDownContainer>
  );
};
export default Dropdown;

const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  img {
    transition: transform 0.25s ease-in-out;
  }

  p {
    font-weight: 700;
    font-size: 0.85rem;
    color: ${(props) => props.theme.color.text.heading};

    span {
      display: none;
      @media screen and (min-width: 800px) {
        display: inline-block;
      }
    }

    @media screen and (min-width: 1000px) {
      font-size: 0.95em;
    }
  }
`;

const Head = styled.div``;

const DropDownContainer = styled.div<OpenProp>`
  cursor: pointer;
  ${Heading} {
    img {
      transform: ${({ open }) => (open ? "rotate(-180deg)" : "rotate(0)")};
    }
  }
`;

interface OpenProp {
  open: boolean;
}

const DropDownContent = styled.div`
  position: absolute;
  margin-top: 1.5rem;
  z-index: 8;
  padding: 1rem 1.5rem;
  background: ${(props) => props.theme.color.dropdown.bg};
  width: 100%;
  max-width: 11rem;
  border-radius: 0.5rem;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
`;

const CustomCheckbox = styled.span<CheckboxProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1rem;
  width: 1rem;
  background: ${({ selected, theme }) =>
    selected ? "#7C5DFA" : theme.color.checkbox.bg};

    img{
      margin-top: -0.15rem;
    
    }
    
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding-bottom: 0.65rem;
  color: ${(props) => props.theme.color.text.heading};
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;

  span {
    padding-top: 0.25rem;
  }

  

  &:hover {
    ${CustomCheckbox} {
      border: 2px solid #7c5dfa;
    }
  }
`;

interface CheckboxProp {
  selected: boolean;
}
