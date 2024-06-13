import React, { useContext, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { ChatContext } from "../GrayChat";
import Context from "../../..";
import { observer } from "mobx-react-lite";

import BottomBlock from "../../../widgets/Chat/BottomBlock";
import Message from "../../../widgets/Chat/Message";

const Container = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 100vh;
  background-color: #e3b3df;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChatName = styled.p`
  color: white;
  font-size: 70px;
  font-weight: 500;
  margin-left: 100px;
`;

const MessageBlockWrapper = styled.div`
  z-index: 10;
  margin-top: 210px;
  background-color: white;
  height: calc(100% - 240px);
  overflow-y: hidden;
  padding-right: 10px;
  width: calc(100% - 10px);
  position: relative;
  margin-bottom: 120px;
`;

const MessegeBlock = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 6px;
  margin-top: 40px;
  height: calc(100% - 50px);
  top: 0px;
  width: calc(100% - 20px);
  gap: 10px;
  background-color: white;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999;
  }
`;

const BottomBlockWrapper = styled.div`
  z-index: 20;
  background-color: #e3b3df;
  position: fixed;
  bottom: 0;
  width: calc(100% - 40px);
  padding: 20px 20px;
`;

const TopBlock = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 20px;
  background-color: #e3b3df;
  padding-bottom: 20px;
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 30px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const colorChangeAnimation = keyframes`
  0% {
    background-color: #ff4c68;
  }
  50% {
    background-color: #00c9cb;
  }
  100% {
    background-color: #ff4c68;
  }
`;

const ChooseChatBottom = styled.div`
  font-size: 70px;
  color: white;
  padding: 20px;
  border-radius: 20px;
  animation: ${pulseAnimation} 2s ease-in-out infinite,
    ${colorChangeAnimation} 5s linear infinite;
  margin-right: 20px;
`;

const ChatMobile = observer(() => {
  const { chatStore } = useContext(ChatContext);
  const { store } = useContext(Context);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatStore.isScrolling]);

  return (
    <Container isOpen={!chatStore.isMobileChatChoosing}>
      <Wrapper>
        <TopBlock>
          <ChatName>
            {chatStore.chatUsers.length === 0
              ? "Choose chat"
              : chatStore.chatUsers[0] === store.userInfo.username
              ? chatStore.chatUsers[1]
              : chatStore.chatUsers[0]}
          </ChatName>
          <ChooseChatBottom
            onClick={() => {
              chatStore.setMobileChatChoosing(true);
            }}
          >
            My chats
          </ChooseChatBottom>
        </TopBlock>

        <MessageBlockWrapper>
          <MessegeBlock>
            {chatStore.messages.map(
              (value, index) =>
                value.chatId === chatStore.chatId && (
                  <Message key={value.id} value={value} />
                )
            )}
            <div ref={messagesEndRef}></div>
          </MessegeBlock>
        </MessageBlockWrapper>
        <BottomBlockWrapper>
          <BottomBlock />
        </BottomBlockWrapper>
      </Wrapper>
    </Container>
  );
});

export default ChatMobile;
