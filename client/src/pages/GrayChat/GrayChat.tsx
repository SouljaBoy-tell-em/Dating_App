import React, { createContext, useEffect, useContext } from "react";
import styled from "styled-components";

import Chat from "../../widgets/Chat/Chat";
import ChatStore from "../../shared/store/chatStore";
import ChatService from "../../shared/services/ChatService";
import { ChatDTO } from "../../shared/models/chat/ChatDTO";

import Context from "../..";

import ListOfChats from "./ListOfChats";

import CreateNewChat from "./CreateNewChat";
import { observer } from "mobx-react-lite";

const Container = styled.div<{colorTheme:boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (!props.colorTheme ? "#white" : "#202020")}  ;
  transition: 0.2s background-color;

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


export { ChatContext };

const GrayChat = observer(() => {
  const { store } = useContext(Context);

  useEffect(() => {
    chatStore.reconnect();
    store.checkAuth();
    chatStore.getAllChat();
  }, []);

  return (  
    <Container colorTheme={store.colorTheme}>
      <Username>{store.user.email}</Username>
      <ChatContext.Provider value={{ chatStore }}>
        <Wrapper>
          <ListOfChats />
          {/* <CreateNewChat /> */}
        </Wrapper>
        <Chat />
      </ChatContext.Provider>
    </Container>
  );
});

export default GrayChat;
