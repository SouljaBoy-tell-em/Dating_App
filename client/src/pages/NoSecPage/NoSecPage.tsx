import React, {createContext } from "react";
import styled from "styled-components";

import Chat from "../../widgets/Chat/Chat";
import ChatStore from "../../shared/store/chatStore";


interface State {
  chatStore: ChatStore;
}

const chatStore = new ChatStore();

const ChatContext = createContext<State>({
  chatStore,
});

chatStore.connect();

export {ChatContext}

const NoSecPage = () => {

  return (
    <ChatContext.Provider value={{ chatStore }}>
      <Chat/> 
    </ChatContext.Provider>
  );
};

export default NoSecPage;
