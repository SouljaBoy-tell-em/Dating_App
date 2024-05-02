import React, { useContext, useState } from "react";
import styled from "styled-components";

import { IoSend } from "react-icons/io5";

import { ChatContext } from "../../pages/GrayChat/GrayChat";

import ChatInput from "./ChatInput";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 642px;
  padding: 10px 10px;
  background-color: #fff5ff;
  box-shadow: 0 0 2px 2px #eac3ff;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const SendButton = styled.button`
    background: 0;
    border: 0;
    width: min-content;
    height: min-content;
    cursor: pointer;
    &:active{
        transform: scale(1.1);
    }
`;
const BottomBlock = () => {
  const { chatStore } = useContext(ChatContext);
  const [message, setMessage] = useState("");

  return (
    <Wrapper>
      <ChatInput
        setMessage={(text) => {
          setMessage(text);
        }}
      />
      <SendButton
        onClick={() => {
          chatStore.send(message);
          console.log(message);
        }}
      >
        <IoSend size={30}/>
      </SendButton>
      <button onClick={chatStore.getAll}>Get All</button>
    </Wrapper>
  );
};

export default BottomBlock;
