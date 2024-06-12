import React, { useContext, useState } from "react";
import styled from "styled-components";

import { observer } from "mobx-react-lite";

import { ChatContext } from "../../pages/GrayChat/GrayChat";

const TextArea = styled.textarea`
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 18px;
  border: 0;
  width: 450px;
  overflow-y: auto;
  resize: none;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999;
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

const Container = styled.div`
  display: flex;
  align-items: center;
`;

interface ChatInputInterface {
  setMessage: (text: string) => void;
  message: string;
}

const ChatInput: React.FC<ChatInputInterface> = observer(({ setMessage, message }) => {
  const { chatStore } = useContext(ChatContext);
  const [rows, setRows] = useState(1);
  const maxRows = 6;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (rows < maxRows) {
        setRows(rows + 1);
      }
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaRows = event.target.value.split("\n").length;
    if (textareaRows <= maxRows) {
      setRows(textareaRows);
    }
    setMessage(event.target.value);
  };

  return (
    <Container>
      <TextArea
        rows={rows}
        style={{ height: `${rows * 30}px`, userSelect: "none", border: "0px" }}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
    </Container>
  );
});

export default ChatInput;
