import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styled from "styled-components";

import { IoClose } from "react-icons/io5";

import { ChatContext } from "../ChatPage";
import ListOfChats from "../ListOfChats";

const Container = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 100vh;
  background-color: white;
  display: flex;
  justify-content: end;
  transition: all 0.5s;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  scale: ${(props) => (props.isOpen ? "1" : "0")};
`;

const Wrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 100%;
  background-color: #e3b3df;
  display: flex;
  flex-direction: column;
`;

const TopBlock = styled.div`
  display: flex;
  padding: 20px;
  justify-content: end;
  width: calc(100% - 40px);
`;

const CloseButton = styled.button`
  background-color: inherit;
  border: 0;
  transition: all 0.3s;
  &:active {
    transform: rotate(180);
  }
`;
const ListOfChatsMobile = observer(() => {
  const { chatStore } = useContext(ChatContext);

  return (
    <Container isOpen={chatStore.isMobileChatChoosing}>
      <Wrapper isOpen={chatStore.isMobileChatChoosing}>
        <TopBlock>
          <CloseButton
            onClick={() => {
              chatStore.setMobileChatChoosing(false);
            }}
          >
            <IoClose size={50} />
          </CloseButton>
        </TopBlock>
        <ListOfChats />
      </Wrapper>
    </Container>
  );
});

export default ListOfChatsMobile;
