import { useState } from "react";
import styled, { css } from "styled-components";
import {BsEye} from "react-icons/bs";
import {BsEyeSlash} from "react-icons/bs";

interface FormTypes {
  label: string;
  id: string;
  placeholder?: string;
  type: string;
  required: boolean;
  spellcheck: boolean;
  autoComplete?: string;
  value: string;
  name: string;
  className?: string;
  showError?: boolean;
  handleInputChange: (e: any) => void;
  displayEye?: boolean;
  labelFontSize?: string | undefined;
  min?: string;
  max?: string;
}

const FormInputs: React.FC<FormTypes> = ({
  label,
  id,
  placeholder,
  type,
  required,
  name,
  value,
  showError,
  min,
  max,
  displayEye,
  spellcheck,
  handleInputChange,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormInput showError={showError}>
      <Label htmlFor={id} style={{ color: showError ? "#EC5757" : "default" }}>
        {label}
      </Label>
      <div className="input-class">
        <Input
          id={id}
          showError={showError}
          name={name}
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          required={required}
          min={min}
          max={max}
          spellCheck={spellcheck}
          autoComplete={autoComplete}
          onChange={(e) => handleInputChange(e)}
        />
        {displayEye && type === "password" && (
          <Button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <div className="eye-icon">
                <BsEye />
              </div>
            ) : (
              <div className="eye-icon">
                <BsEyeSlash />
              </div>
            )}
          </Button>
        )}
      </div>
    </FormInput>
  );
};
export default FormInputs;


interface InputProps {
  showError: boolean | undefined;
}

const FormInput = styled.div<InputProps>`
  position: relative;

  .input-class {
    display: flex;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    padding: 1rem 0.89rem;
    background: ${(props) => props.theme.color.input.bg};
    outline: none;
    border: 1px solid ${(props) => props.theme.color.input.border};
    border-radius: 0.5rem;
    &:focus,
    :active,
    :hover {
      border: 1px solid ${(props) => props.theme.color.input.focus};
    }

    ${({ showError }) =>
      showError &&
      css`
        border: 1px solid #ec5757;
      `}
  }
`;


const Input = styled.input<InputProps>`
  font-family: "Spartan", sans-serif;
  font-weight: 500;
  width: 100%;
  background: none;
  outline: none;
  border: none;
  color: ${(props) => props.theme.color.text.heading};

  &[type="number"] {
    -moz-appearance: textfield;
  }



  &::placeholder {
    font-family: "Spartan", sans-serif;
    font-weight: 500;
    color: ${(props) => props.theme.color.text.placeholder};
  }
`;

const Label = styled.label`
  font-size: .85rem;
  text-transform: capitalize;
  color: ${(props) => props.theme.color.text.formLabel};
`;

const Button = styled.button`
    background: none;
    border: none;
    outline: none;

    .eye-icon{
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${(props) => props.theme.color.text.bodyA};
        font-size: 1rem;
    }
`;