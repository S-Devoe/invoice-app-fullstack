import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthenticationContainer from "../components/AuthenticationContainer";
import Button from "../components/Button";
import FormInputs from "../components/FormInputs";
import FormTitle from "../components/FormTitle";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import InputErrorMessage from "../components/InputErrorMessage";
import { auth } from "../firebase/config";

const Signup = () => {
  const navigate = useNavigate();

  const [signupError, setSignupError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [createAccount, setCreateAccount] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  console.log(createAccount.email, createAccount.password);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCreateAccount({ ...createAccount, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    const isFormValid: any = handleErrorsAndValidateForm();

    e.preventDefault();

    
    await createUserWithEmailAndPassword(
      auth,
      createAccount.email,
      createAccount.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
  
        if (userCredential) {
          navigate("/invoices");
        }

      })
      .catch(({ code }) => {
        if (typeof code === "string") handleErrorsAndValidateForm(code);
        alert(code);
      });

      if (!isFormValid) return;

  };

  const handleErrorsAndValidateForm = (code?: string) => {
    const errorObjects = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (code) {
      if (code === "auth/invalid-email") {
        errorObjects.email = "Invalid email address";
      }
      if (code === "auth/email-already-in-use") {
        errorObjects.email = "Email already in use";
      }

      if (code === "auth/weak-password") {
        errorObjects.password = "Password is too weak";
      }
    }

    if (createAccount.password !== createAccount.confirmPassword) {
      errorObjects.confirmPassword = "Passwords do not match";
    }

    setSignupError(errorObjects);
  };

  return (
    <AuthenticationContainer>
      <CreateAccount>
        <div className="form_body">
          <FormTitle title="Create Account" />
          <form onSubmit={handleSubmit}>
            <FormInputs
              name="email"
              label="Email Address"
              id="email"
              type="email"
              value={createAccount.email}
              handleInputChange={(e) => handleInputChange(e)}
              required={true}
              placeholder="john.doe@gmail.com"
              spellcheck={true}
              autoComplete="email"
            />
            {signupError.email && (
              <InputErrorMessage>{signupError.email}</InputErrorMessage>
            )}
            <FormInputs
              label="Password"
              id="password"
              type="password"
              name="password"
              value={createAccount.password}
              handleInputChange={(e) => handleInputChange(e)}
              required={true}
              spellcheck={false}
              displayEye={true}
            />
            {signupError.password && (
              <InputErrorMessage>{signupError.password}</InputErrorMessage>
            )}
            <FormInputs
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={createAccount.confirmPassword}
              handleInputChange={(e) => handleInputChange(e)}
              required={true}
              spellcheck={false}
              displayEye={true}
            />
            {signupError.confirmPassword && (
              <InputErrorMessage>
                {signupError.confirmPassword}
              </InputErrorMessage>
            )}
            <CenterButton>
              <Button
                type="submit"
                className="button-violet"
                children="Register"
              />
            </CenterButton>
          </form>
          <BackToLogin>
            Already have an account? <Link to="/login">log in</Link>
          </BackToLogin>
        </div>
      </CreateAccount>
    </AuthenticationContainer>
  );
};
export default Signup;

const CreateAccount = styled.section``;

const CenterButton = styled.div`
  text-align: center;
  .button-violet {
    background: #7c5dfa;
    color: #fff;
    border-radius: 24px;
    font-size: 1rem;

    padding: 0.67rem 1.5rem;
    box-shadow: ${(props) => props.theme.color.btn.shadow.boxShadow};

    &:hover {
      background: #7c5dfaca;
    }
  }
`;

const BackToLogin = styled.div`
  margin-top: 2.5rem;
  font-size: 0.85rem;
  text-align: center;

  a {
    color: rgb(126, 136, 195);

    &:focus {
      text-decoration: none;
    }
  }
`;
