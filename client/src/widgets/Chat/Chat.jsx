import { React, useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { observer } from "mobx-react-lite";

import { ChatContext } from "../../pages/GrayChat/GrayChat";

import Context from "../..";

import BottomBlock from "./BottomBlock";
import Message from "./Message";

const Container = styled.div`
  width: 700px;
  height: 750px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const MessegeBlock = styled.div`
  background-image: url("/images/ChatBackGround.png");
  box-shadow: 0 0 2px 2px #eac3ff;

  height: 500px;

  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 6px;
  width: 650px;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999;
  }
`;

const Messege = styled.div`
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  width: min-content;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MessageContainer = styled.div`
  border-radius: 5px;
  width: 100%;
  display: flex;
  position: relative;
`;

const MessegeWrapper = styled.div`
  display: flex;
  width: max-content;
  gap: 10px;
  position: relative;
`;

const Name = styled.p`
  font-size: medium;
  font-weight: 800;
`;

const ChatNameBlock = styled.div`
  width: 642px;
  padding: 10px;
  background-color: #fff5ff;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 0 2px 2px #eac3ff;
`;

const ChatName = styled.p`
  font-size: 25px;
  font-weight: 800;
  z-index: 100;
`;

const Chat = () => {
  const { chatStore } = useContext(ChatContext);
  const { store } = useContext(Context);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [chatStore.isScrolling]);

  return (
    <Container>
      <ChatNameBlock>
        <ChatName>
          {chatStore.chatUsers.length === 0
            ? "Выберите чат"
            : chatStore.chatUsers[0] === store.userInfo.username
            ? chatStore.chatUsers[1]
            : chatStore.chatUsers[0]}
        </ChatName>
      </ChatNameBlock>

      <MessegeBlock>
        {chatStore.messages.map(
          (value, index) =>
            value.chatId === chatStore.chatId && <Message value={value} />
        )}
        <div ref={messagesEndRef}></div>
      </MessegeBlock>

      <BottomBlock />
    </Container>
  );
};

export default observer(Chat);
