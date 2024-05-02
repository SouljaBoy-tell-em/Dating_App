import React, { createContext, useEffect, useContext } from "react";
import styled from "styled-components";

import Chat from "../../widgets/Chat/Chat";
import ChatStore from "../../shared/store/chatStore";
import ChatService from "../../shared/services/ChatService";
import { ChatDTO } from "../../shared/models/ChatDTO";

import Context from "../..";

import ListOfChats from "./ListOfChats";

import CreateNewChat from "./CreateNewChat";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

chatStore.connect();

export { ChatContext };

const GrayChat = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    chatStore.reconnect();
  }, []);

  return (
    <Container>
      <Username>{store.user.email}</Username>
      <ChatContext.Provider value={{ chatStore }}>
        <Wrapper>
          <ListOfChats />
          <CreateNewChat />
        </Wrapper>
        <Chat />
      </ChatContext.Provider>
    </Container>
  );
};

export default GrayChat;
