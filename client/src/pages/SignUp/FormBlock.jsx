import React from "react";
import styled from "styled-components";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Context from "../../";

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
const FormBlock = () => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const { store } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (confPassword !== password) {
      window.alert("Пароли не совпадают");
    } else {
      const e = await store.registration(email, password);
      setTimeout(() => {
        if (store.isAuth) {
          navigate("/confirmEmail");
        } else {
          console.log(e);
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
        <Label htmlFor="login">Email</Label>
        <Input
          type="text"
          id="login"
          name="login"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Label htmlFor="confPassword">Confirm password</Label>
        <Input
          type="password"
          id="confPassword"
          name="confPassword"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          required
        />

        <Button onClick={handleSubmit}>Sign up</Button>
        <LicenseP>
          By registering, you agree to the{" "}
          <Link to="/license">license agreement</Link>
        </LicenseP>
      </LogInForm>
    </Container>
  );
};

export default FormBlock;
