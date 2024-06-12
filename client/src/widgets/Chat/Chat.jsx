import { React, useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { observer } from "mobx-react-lite";

import { ChatContext } from "../../pages/GrayChat/GrayChat";

import Context from "../..";

import BottomBlock from "./BottomBlock";
import Message from "./Message";

const Container = styled.div`
  background-color: #e3b3df;
  width: 560px;
  height: 700px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;

  display: flex;
  flex-direction: column;
`;

const MessegeBlock = styled.div`
  position: absolute;
  height: 560px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 6px;
  margin-top: 40px;
  top:0px;
  width: calc(100% - 12px);
  gap: 10px;
  background-color: white;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999;
  }
`;

const ChatName = styled.p`
  font-size: 30px;
  font-weight: 500;
  z-index: 100;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: white;
`;

const MessageBlockWrapper = styled.div`
  background-color: white;
  padding-right: 5px;
  height: 580px;
  width: calc(100% - 5px);
  overflow-y: hidden;
  position: relative;
`;

const BottomBlockWrapper = styled.div`
  padding: 8px 0;
`;
const Chat = () => {
  const { chatStore } = useContext(ChatContext);
  const { store } = useContext(Context);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatStore.isScrolling]);

  return (
    <Container>
      <ChatName>
        {chatStore.chatUsers.length === 0
          ? "Выберите чат"
          : chatStore.chatUsers[0] === store.userInfo.username
          ? chatStore.chatUsers[1]
          : chatStore.chatUsers[0]}
      </ChatName>
      <MessageBlockWrapper>
        <MessegeBlock>
          {chatStore.messages.map(
            (value, index) =>
              value.chatId === chatStore.chatId && <Message value={value} />
          )}
          <div ref={messagesEndRef}></div>
        </MessegeBlock>
      </MessageBlockWrapper>
      <BottomBlockWrapper>
        <BottomBlock />
      </BottomBlockWrapper>
    </Container>
  );
};

export default observer(Chat);
