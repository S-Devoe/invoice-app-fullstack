import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthenticationContainer from "../components/AuthenticationContainer";
import Button from "../components/Button";
import FormInputs from "../components/FormInputs";
import FormTitle from "../components/FormTitle";

const PasswordReset = () => {
  const [resetPassword, setResetPassword] = useState({
    email: "",
  });

  const handleInputChange = (e: any) => {};
  return (
    <AuthenticationContainer>
      <PasswordResetPage>
        <div className="form_body">
          <form action="">
            <FormTitle title="Reset Password" />
            <FormInputs
              label="Enter amail address"
              id="email"
              name="email"
              value={resetPassword.email}
              spellcheck={true}
              autoComplete="email"
              required={true}
              placeholder="john.doe@gmail.com"
              type="email"
              handleInputChange={(e) => handleInputChange(e)}
            />
            <CenterButton>
              <Button className="button-violet" children="Send" />
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
    margin-top: 30%;
    max-width: 26rem;
  }
  @media screen and (min-width: 768px) {
    width: 100%;
    align-items: center;
    justify-content: center;

    .form_body {
      width: 100%;
      max-width: 25rem;
      margin-top: 35%;
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

    &:hover{
      text-decoration: underline;
    }
  }
`;
