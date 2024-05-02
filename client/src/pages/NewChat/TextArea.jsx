import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.textarea`
  border-radius: 1px;
  padding: 10px 5px;
  font-size: 18px;
  border: 0;
  box-shadow: 0 0 1px 1px gray;
  width: 350px;
`;

const TextArea = () => {
  const [rows, setRows] = useState(1);
  const maxRows = 8;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (rows < maxRows) {
        setRows(rows + 1);
      }
    }
  };

  const handleInput = (event) => {
    const textareaRows = event.target.value.split("\n").length;
    if (textareaRows <= maxRows) {
      setRows(textareaRows);
    }
  };

  return (
    <Container
      rows={rows}
      style={{ height: `${rows * 20}px` }}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
    />
  );
};

export default TextArea;
