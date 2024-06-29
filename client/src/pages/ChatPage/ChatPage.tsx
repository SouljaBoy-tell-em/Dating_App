import React, { createContext, useEffect, useContext, useState } from "react";
import styled from "styled-components";

import { observer } from "mobx-react-lite";

import { useMediaQuery } from "react-responsive";

import Chat from "../../widgets/Chat/Chat";
import ChatStore from "../../shared/store/chatStore";
import ChatService from "../../shared/services/ChatService";
import { ChatDTO } from "../../shared/models/chat/ChatDTO";

import Context from "../..";

import ListOfChats from "./ListOfChats";

import CreateNewChat from "./CreateNewChat";
import ChatLayout from "./ChatLayout";
import ChatMobile from "./MobileVersion/ChatMobile";
import ListOfChatsMobile from "./MobileVersion/ListOfChatsMobile";

const Container = styled.div<{ colorTheme: boolean }>`
  height: 100vh;
  min-height: 900px;
  max-height: 1200px;
  background-color: ${(props) => (props.colorTheme ? "#202020" : "#ffffff ")};
  position: relative;
  width: 100%;
  min-width: 1440px;
  max-width: 2400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s background-color;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ChatWrapper = styled.div`
  z-index: 100;
  align-items: flex-start;
  display: flex;
  gap: 30px;
`;

const Username = styled.div`
  font-size: x-large;
  font-weight: 600;
  position: absolute;
  top: 0;
  right: 0;
  margin: 50px;
  background-color: #ddbdfd;
  padding: 10px;
  border-radius: 15px;
`;
interface State {
  chatStore: ChatStore;
}

const chatStore = new ChatStore();

const ChatContext = createContext<State>({
  chatStore,
});

export { ChatContext };

const ChatPage = observer(() => {
  const { store } = useContext(Context);
  const [isDisplayChatChoosing, setDisplayChatChoosing] = useState(true);
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  useEffect(() => {
    chatStore.reconnect();
    store.checkAuth();
    chatStore.getAllChat();
  }, []);

  const handleChangeDisplayMobile = async () => {
    setTimeout(() => {
      setDisplayChatChoosing(chatStore.isMobileChatChoosing);
    }, chatStore.isMobileChatChoosing ? 0 : 500);
  };

  useEffect(() => {
    handleChangeDisplayMobile();
  }, [chatStore.isMobileChatChoosing]);
  return (
    <ChatContext.Provider value={{ chatStore }}>
      {isDesktop ? (
        <Container colorTheme={store.colorTheme}>
          <Wrapper>
            <ChatLayout />
            <Username>{store.user?.email}</Username>
            <ChatWrapper>
              <ListOfChats />
              <Chat />
            </ChatWrapper>
          </Wrapper>
        </Container>
      ) : isDisplayChatChoosing ? (
        <ListOfChatsMobile />
      ) : (
        <ChatMobile />
      )}
    </ChatContext.Provider>
  );
});

export default ChatPage;
