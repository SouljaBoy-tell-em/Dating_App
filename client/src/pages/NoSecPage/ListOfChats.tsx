import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { ChatDTO } from "../../shared/models/ChatDTO";

import { ChatContext } from "../../pages/NoSecPage/NoSecPage";

import { observer } from "mobx-react-lite";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid black;
  padding: 10px;
`;

const ChatBlock = styled.div`
  background-color: #d6d6d6;
  padding: 10px;
  cursor: pointer;
  transition: 0.2s;
  &:hover{
    background-color: #c1c1c1;
  }
`;

const Button = styled.button`
  background-color: #a4a4a4;
  padding: 5px;
  width: fit-content;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  &:active{
    transform: scale(1.05);
  }
`;



const ListOfChats = () => {

  const {chatStore} = useContext(ChatContext);

  useEffect(()=>{
    chatStore.getAllChat();
  },[]);

  return (
    <Container>
      <p>Список чатов:</p>
      {chatStore.chats.map((chat, index) => (
        <ChatBlock key={chat.id} onClick={()=>{chatStore.setChatId(chat.id)}}>
          <p>{chat.user1}</p>  
          <p>{chat.user2}</p>  
        </ChatBlock>
      ))}
      
      <Button onClick={chatStore.getAllChat}>Get chats</Button>
    </Container>
  );
}

export default observer(ListOfChats);