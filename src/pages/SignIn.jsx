import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useContext } from "react";

import Context from "..";



const Container = styled.div`
  background-color: #9403f5;
  height: 90vh;
  display: flex;
  justify-content: center; /* выравниваем по горизонтали по центру */
  align-items: center; /* выравниваем по вертикали по центру */
`;

const Wrapper = styled.div`
  height: auto;
  width: 250px;
  padding: 10px;
  background-color: aliceblue;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

const Label = styled.label``;

const Input = styled.input`
  border-radius: 5px;
  height: 25px;
  padding-left: 5px;
`;

export const Button = styled.button`
  height: 35px;
  width: 80px;
  border-radius: 5px;
  background-color: #d4aaff;
  cursor: pointer;

  transition: transform 0.2s, background-color 0.3s;
  &:hover {
    background-color: #c489ff;
  }

  &:active {
    transform: scale(1.06); /* увеличиваем кнопку при нажатии на 1.1 */
  }
`;



const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { store } = useContext(Context);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogIn =async () => {
    await store.login(username, password);    
  };  
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Label>Username</Label>
        <Input type="text" onChange={handleUsername} />
        <Label>Password</Label>
        <Input type="password" onChange={handlePassword}/>
        <Link to={"/"}>
          <Button onClick={handleLogIn}>Sign In</Button>
        </Link>
        <Title>Or Sign up</Title>
        <Label>Username</Label>
        <Input />
        <Label>Email</Label>
        <Input />
        <Label>Password</Label>
        <Input type="password" />
        <Label>Confirm password</Label>
        <Input type="password" />
        <Link to={"/"}>
          <Button>Sign Up</Button>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default SignIn;
