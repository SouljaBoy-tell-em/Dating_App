import React from "react";
import styled from "styled-components";

import Messege from "./Messege";

const Container = styled.div`
    position: relative;
  width: 580px;
  height: min-content;
  margin-top: auto;
  padding: calc(50vh - 190px) 0;
  background-color: #f1e2ff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 22px;
  background-image: url("/images/ChatBackGround.png");
  background-repeat: repeat;
`;

const Messeges = () => {
  return (
    <Container>
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
      <Messege />
    </Container>
  );
};

export default Messeges;
