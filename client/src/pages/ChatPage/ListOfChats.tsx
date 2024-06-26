import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import { observer } from "mobx-react-lite";

import { ChatDTO } from "../../shared/models/chat/ChatDTO";

import { ChatContext } from "./ChatPage";
import ConnectIndicator from "./ConnectIndicator";

const Container = styled.div`
  width: 330px;
  height: 700px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  @media (max-width: 1224px) {
    width: calc(100% - 20px);
    height: calc(100% - 100px);

    font-size: 30px;
  }
  overflow-y: auto;
  background-color: #e3b3df;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100%);
  height: 580px;
  background-color: white;
  @media (max-width: 1224px) {
    height: calc(100% - 100px);
    font-size: 30px;
  }
`;

const ImageWithPeople = styled.img`
  width: 250px;
  position: absolute;
  bottom: 0;
  @media (max-width: 1224px) {
    width: calc(70%);
  }
`;
const ListOfChatWrapper = styled.div`
  width: calc(100% - 35px);
  margin-top: 5px;
  margin-right: 5px;
  padding-right: 30px;
  padding-top: 10px;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999999;
  }

  @media (max-width: 1224px) {
    height: calc(60%);
    font-size: 30px;
  }
`;
const ChatBlock = styled.div`
  width: calc(100% - 20px);
  display: flex;
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
  font-weight: 500;
  font-size: 20px;
`;

const UnreadMessages = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
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
  color: white;

  margin-left: 20px;
  font-size: 30px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ImageOfChat = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #e3b3df;
`;

const ChatBlockWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100% - 10px);
  margin-left: 5px;
  margin-right: 5px;
`;

const BetweenChatBlock = styled.hr`
  width: 100%;

  height: 5px;
  background-color: #a8a6a8;
`;

const NameAndIndicatorBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ListOfChats = () => {
  const { chatStore } = useContext(ChatContext);

  useEffect(() => {
    chatStore.getAllChat();
  }, []);

  return (
    <Container>
      <NameAndIndicatorBlock>
        <Name>Chats</Name>
        <ConnectIndicator isConnected={chatStore.connectIdicator} />
      </NameAndIndicatorBlock>
      <Wrapper>
        <ListOfChatWrapper>
          {chatStore.chats.map((chat, index) => (
            <ChatBlockWrapper key={chat.chatDTO.id}>
              <ChatBlock
                key={chat.chatDTO.id}
                onClick={() => {
                  chatStore.setChatId(chat.chatDTO.id);
                  chatStore.getAllMessageFromChat();
                  chatStore.setMobileChatChoosing(false);
                }}
              >
                <ImageOfChat></ImageOfChat>
                <ChatName>
                  <p>
                    {chat.chatDTO.user1.length > 12
                      ? `${chat.chatDTO.user1.substring(0, 12)}...`
                      : chat.chatDTO.user1}
                  </p>
                  <p>
                    {chat.chatDTO.user2.length > 12
                      ? `${chat.chatDTO.user2.substring(0, 12)}...`
                      : chat.chatDTO.user2}
                  </p>
                </ChatName>
                {chat.unreadMessages > 0 && (
                  <UnreadMessages>{chat.unreadMessages}</UnreadMessages>
                )}
              </ChatBlock>
              <BetweenChatBlock />
            </ChatBlockWrapper>
          ))}
        </ListOfChatWrapper>

        <ImageWithPeople src="./images/chat/imageWithPeoples.png" />
      </Wrapper>

      {/* <Button onClick={chatStore.getAllChat}>Get chats</Button> */}
    </Container>
  );
};

export default observer(ListOfChats);
