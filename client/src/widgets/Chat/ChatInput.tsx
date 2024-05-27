import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../../pages/GrayChat/GrayChat";
import { observer } from "mobx-react-lite";

const TextArea = styled.textarea`
  border-radius: 1px;
  padding: 10px 5px;
  font-size: 18px;
  border: 0;
  box-shadow: 0 0 1px 1px gray;
  width: 450px;
  overflow-y: auto; 
  resize: none; 

  &::-webkit-scrollbar {
    width: 5px; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999; 
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

interface ChatInputInterface {
  setMessage: (text: string) => void;

}

const ChatInput: React.FC<ChatInputInterface> = observer(({ setMessage}) => {

  const {chatStore} = useContext(ChatContext);
  const [rows, setRows] = useState(1);
  const maxRows = 8;

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
        style={{ height: `${rows * 20}px` }}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        onChange={(e) => setMessage(e.target.value)}
      />
    </Container>
  );
});

export default ChatInput;
