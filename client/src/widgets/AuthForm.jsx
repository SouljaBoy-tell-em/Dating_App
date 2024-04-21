import React, { useContext, useState } from "react";
import styled from "styled-components";
import Context from "..";
import { useLocation, useNavigate } from "react-router-dom";
import Button1 from "../components/Button1";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  height: min-content;
  width: min-content;
  padding: 20px;
  border-radius: 10px;
  background-color: #eeeeee;
  box-shadow: 0 0 1px 1px gray;
`;

const Input = styled.input`
  padding: 5px;
`;

const Button = Button1;

const Hr = styled.hr`
  width: 100%;
`;

const ErrorMessage = styled.div`
  font-size: small;
  width: 100%;
  background-color: #ff916caa;
  padding: 5px 2px;
  border-radius: 3px;
`;
const AuthForm = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  const { store } = useContext(Context);

  const [logUsename, setLogUsername] = useState("");
  const [logPassword, setLogPassword] = useState("");

  const [regUsename, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");

  const [errorMessege, setErrorMessege] = useState("");

  const handleLogIn = async () => {
    const e = await store.login(logUsename, logPassword);
    if (store.isAuth) {
      navigate(fromPage, {replace:true});
    } else {
      setErrorMessege(e?.response?.data ? e?.response?.data : "Проблема с авторизацией");
    }
  };

  const handleSignUp = async () => {
    const e = await store.registration(regUsename, regPassword, regEmail);
    if (store.isAuth) {
      navigate(fromPage, {replace:true});
    } else {
      setErrorMessege(e?.response?.data ? e?.response?.data : "Проблема с регистрацией");
    }
  };


  return (
    <Container>
      {errorMessege !== "" ? <ErrorMessage>{errorMessege}</ErrorMessage> : ""}
      <h4>Log In</h4>
      <Input
        placeholder="username"
        type="username"
        onChange={(e) => {
          setLogUsername(e.target.value);
        }}
      ></Input>
      <Input
        placeholder="password"
        type="password"
        onChange={(e) => {
          setLogPassword(e.target.value);
        }}
      ></Input>
      <Button onClick={handleLogIn}>Log In</Button>
      <Hr></Hr>
      <h4>Sign Up</h4>
      <Input
        placeholder="username"
        type="username"
        onChange={(e) => {
          setRegUsername(e.target.value);
        }}
      ></Input>
      <Input
        placeholder="password"
        type="password"
        onChange={(e) => {
          setRegPassword(e.target.value);
        }}
      ></Input>
      <Input
        placeholder="email"
        type="email"
        onChange={(e) => {
          setRegEmail(e.target.value);
        }}
      ></Input>
      <Button onClick={handleSignUp}>Sign In</Button>
    </Container>
  );
};

export default AuthForm;
