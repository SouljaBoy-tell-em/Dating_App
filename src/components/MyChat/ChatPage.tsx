import React from "react";
import styled from "styled-components";

import MessegeFeed from "./MessegeFeed/MessegeFeed";

import Header from "./Header";
import Footer from "./Footer/Footer";
import MiddleLine from "./MiddleLine";  

const Container = styled.div``;

const Messege = styled.div`
  position: relative;
  height: 50px;
  width: 200px;
  background-color: #ffffff;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const ChatPage = () => {
  return (
    <Container>
      <Header />
      <MiddleLine/>
      <Footer/>
      <MessegeFeed/>
    </Container>
  );
};

export default ChatPage;
