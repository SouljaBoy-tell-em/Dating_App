import React, { useState } from "react";
import styled from "styled-components";
import ChatService from "../../shared/services/ChatService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid black;
  padding: 10px;
`;

const Button = styled.button`
  background-color: #a4a4a4;
  padding: 5px;
  width: fit-content;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  &:active {
    transform: scale(1.05);
  }
`;

const Input = styled.input`
  padding: 5px;
  font-size: 15px;
`;
const Label = styled.label``;

const CreateNewChat = () => {
  const [email, setEmail] = useState("");

  const handleAddChat = async () => {
    try {
      await ChatService.createNewChat(email);
    } catch (error: any) {
      window.alert(error?.response?.data);
    }
  };
  return (
    <Container>
      <Label>User Email</Label>
      <Input
        placeholder="marat@mail.ru"
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          handleAddChat();
        }}
      >
        Create new chat
      </Button>
    </Container>
  );
};

export default CreateNewChat;
