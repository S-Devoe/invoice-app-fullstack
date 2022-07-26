import { useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import styled from "styled-components";
interface Props {
  setSearchedValue: (value: string) => void;
  searchedValue: string;
}

const Searchbar: React.FC<Props> = ({ setSearchedValue, searchedValue }) => {
  const [showCancelIcon, setShowCancelIcon] = useState(false);

  useEffect(() => {
    searchedValue !== "" ? setShowCancelIcon(true) : setShowCancelIcon(false);
  }, [searchedValue]);

  const handleChange = (e: any) => {
    const target = e.target;
    setSearchedValue(target.value);
  };

  return (
    <InputContainer>
      <Input
        type="text"
        placeholder="Enter client name"
        spellCheck="false"
        value={searchedValue}
        onChange={(e) => handleChange(e)}
      />
      {showCancelIcon ? (
        <CancelIconContainer onClick={() => setSearchedValue('')}>
          <RiCloseFill />
        </CancelIconContainer>
      ) : (
        <CancelIconContainer>
          <RiSearchLine />
        </CancelIconContainer>
      )}
    </InputContainer>
  );
};
export default Searchbar;

const InputContainer = styled.div`
  transition: 100ms ease-in;
  width: 100%;
  margin-bottom: 1rem;
  background: ${(props) => props.theme.color.input.bg};
  border: 1px solid ${(props) => props.theme.color.input.border};
  display: flex;
  align-items: center;
  border-radius: 0.5rem;

  @media screen and (min-width: 768px) {
    max-width: 20rem;
  }
`;

const Input = styled.input`
  font-family: "Spartan", sans-serif;
  font-weight: 700;
  width: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 1rem 1.5rem;
  color: ${(props) => props.theme.color.text.heading};

  &::placeholder {
    font-family: "Spartan", sans-serif;
    font-weight: 500;
    color: ${(props) => props.theme.color.text.placeholder};
  }
`;

const CancelIconContainer = styled.div`
  margin-right: .5rem;
  cursor: pointer;
  color: ${(props) => props.theme.color.text.heading};
`;
