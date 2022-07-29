import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import FormInputs from "../components/FormInputs";
import FormTitle from "../components/FormTitle";
import AuthenticationContainer from "../components/AuthenticationContainer";
import InputErrorMessage from "../components/InputErrorMessage";
import useMyContext from "../hooks/useContext";
import useAuthContext from "../hooks/AuthContext";

const Login = () => {
  const auth = getAuth();
  const { setLoggedIn } = useMyContext();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e: any, anonymousSignin?: boolean) => {
    e.preventDefault();

    try {
      anonymousSignin
        ? await signInAnonymously(auth)
        : await signInWithEmailAndPassword(
            auth,
            formInput.email,
            formInput.password
          ).then((userCredential) => {
            const user = userCredential;
            console.log(user)
            setLoggedIn(true);
            // console.log(user);
            dispatch({
              type: "LOGIN",
              payload: user,
            });
          });

      await setPersistence(auth, browserLocalPersistence);
      navigate("/invoices");
    } catch ({ code }) {
      switch (code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("The user credentials provided are incorrect");
          break;
        case "auth/user-disabled":
          setError("The account has been deactivated");
          break;
        case "auth/too-many-requests":
          setError("Too many requests. Try again later");
          break;
        default:
          break;
      }
    }
  };

  return (
    <AuthenticationContainer>
      <LoginContainer>
        <FormTitle title="Login" />
        <FormGroup className="form_body">
          <form onSubmit={handleSubmit}>
            <FormInputs
              showError={error ? true : false}
              id="email"
              type="email"
              label="Email Address"
              value={formInput.email}
              handleInputChange={(e) => handleInputChange(e)}
              placeholder="john.doe@gmail.com"
              required={true}
              name="email"
              spellcheck={false}
              autoComplete="email"
            />
            <FormInputs
              label="password"
              showError={error ? true : false}
              id="password"
              type="password"
              placeholder="Password"
              handleInputChange={(e) => handleInputChange(e)}
              required={true}
              name="password"
              value={formInput.password}
              autoComplete="current-password"
              spellcheck={false}
              displayEye={true}
            />
            {error && <InputErrorMessage>{error}</InputErrorMessage>}
            <CenterButton>
              <Button
                className="button-violet"
                type="submit"
                children="Login"
              />
            </CenterButton>
          </form>
        </FormGroup>
        <div className="form_body">
          <NewUser className="new-user">
            <p>
              New user? <Link to="/signup">Create an account</Link>
            </p>
          </NewUser>
          <ForgetPassword className="forget_password">
            <p>
              Forget password?{" "}
              <Link to="/reset-password">Reset password here</Link>
            </p>
          </ForgetPassword>
          <AnonymousLogin className="anonymous_login">
            <p>
              You can also
              <span onClick={(e) => handleSubmit(e, true)}>
                {" "}
                login with an anonymous account{" "}
              </span>{" "}
              in order to quickly test the application.
            </p>
          </AnonymousLogin>
        </div>
      </LoginContainer>
    </AuthenticationContainer>
  );
};
export default Login;

const LoginContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .form_body {
    width: 100%;
    max-width: 26rem;
  }
  @media screen and (min-width: 768px) {
    width: 100%;
    align-items: center;
    justify-content: center;

    .form_body {
      width: 100%;
      max-width: 25rem;
    }
  }
`;
const FormGroup = styled.div``;

const NewUser = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.color.text.heading};
  a {
    color: ${(props) => props.theme.color.text.link};

    &:hover {
      color: ${(props) => props.theme.color.text.linkHover};
    }
  }
`;

const ForgetPassword = styled.div`
  text-align: center;
  font-size: 0.89rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.color.text.bodyA};
  a {
    color: ${(props) => props.theme.color.text.bodyA};

    &:hover {
      color: ${(props) => props.theme.color.text.heading};
    }
  }
`;

const AnonymousLogin = styled.div`
  text-align: center;
  font-size: 0.79rem;
  padding: 0 3rem;
  color: ${(props) => props.theme.color.text.bodyA};

  span {
    color: ${(props) => props.theme.color.text.bodyA};
    text-decoration: underline;
    cursor: pointer;
    
    &:hover {
      color: ${(props) => props.theme.color.text.heading};
    }
  }

  @media screen and (min-width: 768px) {
    text-align: center;
  }
`;

const CenterButton = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

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
