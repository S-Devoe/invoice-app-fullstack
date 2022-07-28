import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthenticationContainer from "../components/AuthenticationContainer";
import { sendPasswordResetEmail } from "firebase/auth";
import Button from "../components/Button";
import FormInputs from "../components/FormInputs";
import FormTitle from "../components/FormTitle";
import { auth } from "../firebase/config";
import InputErrorMessage from "../components/InputErrorMessage";

const PasswordReset = () => {
  const [error, setError] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  const handleInputChange = (e: any) => {
    const { value } = e.target;

    setResetEmail(value);
  };

  console.log(resetEmail);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        console.log("success");
        setSuccessMessage(
          "A reset link has just been sent to your email address (check your spam if you can't find the link)"
        );
        // Password reset email sent!
        // ..
      })
      .catch(({ code }) => {
        console.log(code);
        switch (code) {
          case "auth/invalid-email":
            setError("Please enter a valid email address");
            break;
          case "auth/user-not-found":
            setError("No account matches this email address");
            break;
          case "auth/too-many-requests":
            setError("Too many requests, try again in a few minute");
            break;
          default:
        }
      });
  };

  return (
    <AuthenticationContainer>
      <PasswordResetPage>
        <div className="form_body">
          <form onSubmit={handleSubmit}>
            <FormTitle title="Reset Password" />
            <FormInputs
              label="Enter amail address"
              id="email"
              name="email"
              value={resetEmail}
              spellcheck={true}
              autoComplete="email"
              required={true}
              placeholder="john.doe@gmail.com"
              type="email"
              handleInputChange={(e) => handleInputChange(e)}
            />

            {error && <InputErrorMessage children={error} />}
            {succesMessage && (
              <InputErrorMessage className="success" children={succesMessage} />
            )}
            <CenterButton>
              <Button className="button-violet" children="Send" type="submit" />
            </CenterButton>
          </form>
          <BackToLogin>
            <Link to="/login">Back to login</Link>
          </BackToLogin>
        </div>
      </PasswordResetPage>
    </AuthenticationContainer>
  );
};
export default PasswordReset;

const PasswordResetPage = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .form_body {
    width: 100%;
    height: 100%;
    margin-top: 10%;
    max-width: 26rem;

    .success {
      color: #20bd20;
    }
  }
  @media screen and (min-width: 768px) {
    width: 100%;
    align-items: center;
    justify-content: center;

    .form_body {
      width: 100%;
      max-width: 25rem;
      margin-top: 5%;
    }
  }
`;

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
  text-align: center;
  margin-top: 3rem;
  a {
    color: rgb(126, 136, 195);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
