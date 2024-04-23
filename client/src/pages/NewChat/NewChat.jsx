import React from "react";
import styled from "styled-components";
import Messeges from "./Messeges";
import ChatBlock from "./ChatBlock";

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
`;



const OutHeader = styled.div`
  top: 0;
  position: fixed;
  height: calc(50vh - 280px);
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  width: 604px;
  z-index: 10;

`;
const OutFooter = styled.div`
  bottom: 0;
  position: fixed;
  height: calc(50vh - 300px);
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  z-index: 10;
  width: 604px;

`;

const NewChat = () => {
  return (
    <Container>
      <OutHeader />
      <Messeges />
      <ChatBlock/>
      <OutFooter />
    </Container>
  );
};

export default NewChat;
