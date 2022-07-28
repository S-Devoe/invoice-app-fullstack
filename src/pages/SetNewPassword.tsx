import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import AuthenticationContainer from "../components/AuthenticationContainer";
import { confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import Button from "../components/Button";
import FormInputs from "../components/FormInputs";
import FormTitle from "../components/FormTitle";
import { auth } from "../firebase/config";
import InputErrorMessage from "../components/InputErrorMessage";

const SetNewPassword = (props: any) => {
  const location = useLocation();
  //   console.log(location.search);

  const [error, setError] = useState("");
  const [succesMessage, setSuccessMessage] = useState("");
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setNewPassword({ ...newPassword, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);

    const oobCode: any = queryParams.get("oobCode");

    if (newPassword.password !== newPassword.confirmPassword) {
      return handleError();
    } else
      confirmPasswordReset(auth, oobCode, newPassword.password)
        .then(() => {
          console.log("success");
          setSuccessMessage("Password changed successfully, go to login page")

          // Password reset email sent!
          // ..
        })
        .catch(({ code }) => {
          switch (code) {
            case "auth/expired-action-code":
              setError("Link as expired, go back to reset password");
              break;
            case "auth/invalid-action-code":
              setError("Error!, try again later");
              break;
            case "auth/weak-password":
              setError("Password should be at least 6 characters");
              break;
            default:
          }
        });
  };

  const handleError = () => {
    if (newPassword.password !== newPassword.confirmPassword) {
      setError("Password does not match");
    }
  };

  return (
    <AuthenticationContainer>
      <PasswordResetPage>
        <div className="form_body">
          <form onSubmit={handleSubmit}>
            <FormTitle title="Reset Password" />
            <FormInputs
              label="New Password"
              id="password"
              name="password"
              value={newPassword.password}
              spellcheck={true}
              required={true}
              placeholder="Enter Password"
              type="password"
              handleInputChange={(e) => handleInputChange(e)}
              displayEye={true}
            />

            <FormInputs
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              value={newPassword.confirmPassword}
              spellcheck={true}
              required={true}
              placeholder="Confirm Password"
              type="password"
              handleInputChange={(e) => handleInputChange(e)}
              displayEye={true}
            />

            {error && <InputErrorMessage children={error} />}
            {succesMessage && <InputErrorMessage className="success" children={succesMessage} />}
            <CenterButton>
              <Button
                className="button-violet"
                children="Reset Password"
                type="submit"
              />
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
export default SetNewPassword;

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
