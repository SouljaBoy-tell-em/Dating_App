import React from "react";
import styled from "styled-components";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Context from "../../";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelLogIn = styled.h2`
  margin-left: 32px;
  font-weight: 500;
  font-size: 65px;
  margin-bottom: 22px;
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
      if (store.isAuth) {
        navigate(fromPage, { replace: true });
      } else {
        console.log(e);
        window.alert(
          e?.response?.data ? e?.response?.data : "Проблема с регистрацией"
        );
      }
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
      </LogInForm>
    </Container>
  );
};

export default FormBlock;
