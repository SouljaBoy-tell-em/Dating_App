import React, { useContext } from "react";
import styled from "styled-components";

import Button1 from "../../components/Button1";
import Context from "../..";
import {Menu} from "../../widgets/Menu/Menu";

const LogOut = Button1;

const Container = styled.div``;

const ChatPage = () => {

  const {store} = useContext(Context);

  const handleLogOut = async () => {
    await store.logout();
  };

  return <Container>
    <Menu/>
    <LogOut onClick={handleLogOut} className="log-out">LogOut</LogOut>
  </Container>;
};

export default ChatPage;
