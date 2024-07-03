import React from "react";
import styled from "styled-components";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Context from "../../";
import { observer } from "mobx-react-lite";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 1224px) {
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const LabelLogIn = styled.h2`
  margin-left: 32px;
  font-weight: 500;
  font-size: 65px;
  margin-bottom: 22px;
  @media (max-width: 1224px) {
    width: calc(100% - 20px);
    margin-left: 0;
    display: flex;
    justify-content: center;
  }
`;

const LogInForm = styled.form`
  background-color: #f1e2ff;
  display: flex;
  flex-direction: column;
  padding: 49px 44px;
  gap: 15px;
  border-radius: 20px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 40px;
`;

const Input = styled.input`
  font-weight: 400;
  font-size: 25px;
  padding-left: 15px;
  width: 617px;
  height: 42px;
  border-radius: 21px;
  border: 0;
  @media (max-width: 1224px) {
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const Button = styled.button`
  width: fit-content;
  padding: 5px;
  border-radius: 10px;
  font-size: 25px;
  color: black;
  font-weight: 600;
  background-color: #c58afc;
  border: 0px;
  &:hover {
    transform: scale(1.03);
  }
  &:active {
    transform: scale(1.1);
  }
`;

const LicenseP = styled.p`
  font-size: 20px;
  a {
    text-decoration: underline;
  }
`;

const LicenseBlock = styled.div`
  display: flex;
  gap: 10px;
  font-size: 20px;
`;

const LicenseInput = styled.input``;

const WarningBlock = styled.div`
  padding: 10px;
  border-radius: 15px;
  background-color: #ffa2a2;
`;

const FormBlock = observer(() => {
  const location = useLocation();
  const { store } = useContext(Context);
  const [isWarning, setWarning] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(store.signUpConfirmLicense);
    if (store.signUpConfirmPassword !== store.signUpPassword) {
      window.alert("Пароли не совпадают");
    } else if (store.signUpConfirmLicense === false) {
      setWarning(true);
    } else {
      setWarning(false);
      const e = await store.registration(
        store.signUpEmail,
        store.signUpPassword
      );
      store.setSignUpDefault();
      setTimeout(() => {
        if (store.isAuth) {
          navigate("/confirmEmail");
        } else {
          window.alert(
            e?.response?.data ? e?.response?.data : "Проблема с регистрацией"
          );
        }
      }, 100);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <Container>
      <LabelLogIn>Sign up</LabelLogIn>
      <LogInForm onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
        {isWarning && <WarningBlock>Please, confirm license</WarningBlock>}
        <Label htmlFor="login">Email</Label>
        <Input
          type="text"
          id="login"
          name="login"
          onChange={(e) => store.setSignUpEmail(e.target.value)}
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={store.signUpPassword}
          onChange={(e) => store.setSignUpPassword(e.target.value)}
          required
        />
        <Label htmlFor="confPassword">Confirm password</Label>
        <Input
          type="password"
          id="confPassword"
          name="confPassword"
          value={store.signUpConfirmPassword}
          onChange={(e) => store.setSignUpConfirmPassword(e.target.value)}
          required
        />

        <LicenseBlock>
          <LicenseP>
            By registering, you agree to the{" "}
            <Link to="/license" state={{ from: location }}>
              license agreement
            </Link>
          </LicenseP>
          <LicenseInput
            type="checkbox"
            value={store.signUpConfirmLicense}
            onChange={(e) => store.setSignUpConfirmLicense(e.target.value)}
          />
        </LicenseBlock>

        <Button onClick={handleSubmit}>Sign up</Button>
      </LogInForm>
    </Container>
  );
});

export default FormBlock;
