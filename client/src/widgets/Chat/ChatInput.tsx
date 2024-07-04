import React, { useContext, useState } from "react";
import styled from "styled-components";

import { observer } from "mobx-react-lite";

import { useMediaQuery } from "react-responsive";

import { ChatContext } from "../../pages/ChatPage/ChatPage";

const Container = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1224px) {
    width: calc(100% - 40px);
  }
`;

const TextArea = styled.textarea`
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 18px;
  border: 0;
  width: 420px;
  overflow-y: auto;
  resize: none;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999;
  }


  @media (max-width:1224px) {
    border-radius: 10px;
    width: 100%;
    font-size: 25px;
  }

  cursor: default;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  outline: none;
`;



interface ChatInputInterface {
  setMessage: (text: string) => void;
  message: string;
}


const ChatInput: React.FC<ChatInputInterface> = observer(
  ({ setMessage, message }) => {
    const { chatStore } = useContext(ChatContext);
    const maxRows = 6;

    const isDesktop = useMediaQuery({
      query: "(min-width: 1224px)",
    });
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        if (chatStore.rowNumber < maxRows) {
          chatStore.setRowNumber(chatStore.rowNumber + 1);
        }
      }
    };

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textareaRows = event.target.value.split("\n").length;
      if (textareaRows <= maxRows) {
        chatStore.setRowNumber(textareaRows);
      }
      setMessage(event.target.value);
    };

    return (
      <Container>
        <TextArea
          rows={chatStore.rowNumber}
          style={{
            height: `${chatStore.rowNumber * (isDesktop ? 30 : 40)}px`,
            userSelect: "none",
            border: "0px",
          }}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </Container>
    );
  }
);

export default ChatInput;
