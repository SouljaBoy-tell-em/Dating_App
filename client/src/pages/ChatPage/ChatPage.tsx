import React, { useContext } from "react";
import styled from "styled-components";

import Button1 from "../../components/Button1";
import Context from "../..";

const LogOut = Button1;

const Container = styled.div``;

const ChatPage = () => {

  const {store} = useContext(Context);

  const handleLogOut = async () => {
    await store.logout();
  }

  return <Container>
    <LogOut onClick={handleLogOut} className="log-out">LogOut</LogOut>
  </Container>;
};

export default ChatPage;
