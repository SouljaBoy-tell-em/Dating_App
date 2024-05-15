import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import { observer } from "mobx-react-lite";

import { ChatDTO } from "../../shared/models/chat/ChatDTO";

import { ChatContext } from "./GrayChat";


const Container = styled.div`
  border-radius: 10px;
  height: 340px;
  overflow-y: auto;
  background-color: #f1e2ff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
  box-shadow: 0 0 2px 2px #eac3ff;
`;

const ChatBlock = styled.div`
  background-color: #ffffff;
  padding: 10px;
  cursor: pointer;
  transition: 0.1s;
  display: flex;
  gap: 10px;
  &:hover {
    background-color: #ddbdfd;
  }
`;

const ChatName = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  background-color: #ffffff;
  padding: 5px;
  width: fit-content;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  &:active {
    transform: scale(1.05);
  }
  border: 2px solid #eac3ff;
  margin-left: auto;
  margin-right: auto;
`;

const UnreadMessages = styled.div`
  background-color: red;
  color: white;
  font-weight: 800;
  font-size: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.p`
  margin-left: 10px;
  font-size: 20px;
  font-weight: 600;
`;
const ListOfChats = () => {
  const { chatStore } = useContext(ChatContext);

  useEffect(() => {
    chatStore.getAllChat();
  }, []);

  return (
    <Container>
      <Name>List of chats:</Name>
      {chatStore.chats.map((chat, index) => (
        <ChatBlock
          key={chat.chatDTO.id}
          onClick={() => {
            chatStore.setChatId(chat.chatDTO.id);
          }}
        >
          <ChatName>
            <p>{chat.chatDTO.user1}</p>
            <p>{chat.chatDTO.user2}</p>
          </ChatName>
          {chat.unreadMessages > 0 && (
            <UnreadMessages>{chat.unreadMessages}</UnreadMessages>
          )}
        </ChatBlock>
      ))}

      <Button onClick={chatStore.getAllChat}>Get chats</Button>
    </Container>
  );
};

export default observer(ListOfChats);
