import React from "react";
import styled from "styled-components";

import TextArea from "./TextArea";

const Header = styled.div`
  background-color: #efefef;
  position: absolute;
  top: 0;
  height: 70px;
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;


const Container = styled.div`
  height: 600px;
  width: 600px;
  box-shadow: 0 0 2px 2px #e4e4e4;
  border-radius: 15px;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  z-index: 100;
`;

const Footer = styled.div`
  background-color: #efefef;
  position: absolute;
  bottom: 0;
  padding: 20px 0;
  width: 100%;
  height: fit-content;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap:20px;
`;

const SendButton = styled.button`
  cursor: pointer;
  width: fit-content;
  padding: 5px;
  border-radius: 18px;
  background-color: #baa6b8;
  border: 0;
  &:active {
    transform: scale(1.05);
  }
  font-size: 25px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 15px;
`;

const ChatBlock = () => {
  return (
    <Container>
      <Header></Header>
      <Footer>
        <TextArea  rows="3" maxrows="8"/>
        <SendButton>Send</SendButton>
      </Footer>
    </Container>
  );
};

export default ChatBlock;
