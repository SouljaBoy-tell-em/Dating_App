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
  font-weight: 600;
  font-size: 55px;
  margin-bottom: 22px;
  margin-left: 10px;
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
  font-size: 45px;
`;

const Input = styled.input`
  font-weight: 400;
  font-size: 30px;
  padding-left: 15px;
  width: 617px;
  height: 68px;
  border-radius: 15px;
  border: 0;
`;

const Button = styled.button`
  width: fit-content;
  padding: 5px;
  border-radius: 10px;
  font-size:25px;
  color:black;
  font-weight: 600;
  background-color: #c58afc;
  border: 0px;
  &:hover{
    transform: scale(1.03);
  }
  &:active{
    transform: scale(1.1);
  }
`;

const FormBlock = () => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const { store } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const e = await store.login(email, password);
    if (store.isAuth) {
      navigate(fromPage, { replace: true });
    } else {
      window.alert(
        e?.response?.data ? e?.response?.data : "Проблема с авторизацией"
      );
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <Container>
      <LabelLogIn>Log in</LabelLogIn>
      <LogInForm
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        onKeyPress={handleKeyPress}
      >
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
        <Button onClick={handleSubmit}>Log in</Button>
      </LogInForm>
    </Container>
  );
};

export default FormBlock;
