import React from "react";
import styled from "styled-components";
import Messege from "./Messege/Messege";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-left: 40%;
  z-index: 5;
  margin-bottom: 100px;
  margin-top: 100px;

`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MessegeFeed = () => {
  return (
    <Container>
      <Wrapper>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
        <Messege text="Hello, how are you?"/>
        <Messege text="I'm fine"/>
      </Wrapper>
    </Container>
  );
};

export default MessegeFeed;
