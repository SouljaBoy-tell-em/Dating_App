import React, { useState } from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
  border-radius: 1px;
  padding: 10px 5px;
  font-size: 18px;
  border: 0;
  box-shadow: 0 0 1px 1px gray;
  width: 350px;
  overflow-y: auto; // Убедитесь, что скролл активируется, если содержимое переполняется
  resize: none; // Отключает возможность изменения размера

  &::-webkit-scrollbar {
    width: 5px; // Ширина полосы прокрутки
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999; // Цвет бегунка
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

interface ChatInputInterface {
  setMessage: (text: string) => void; // Теперь функция принимает string и возвращает void
}

const ChatInput: React.FC<ChatInputInterface> = ({ setMessage }) => {
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
};

export default ChatInput;
