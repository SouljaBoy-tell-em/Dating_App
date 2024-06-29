import React from "react";
import styled from "styled-components";
import { Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useMediaQuery } from "react-responsive";

import Context from "../../";
import Header from "../Main/Header";
import LogInLeftBlock from "./LogInLeftBlock";
import LogInRightBlock from "./LogInRightBlock";
import FormBlock from "./FormBlock";
import MobileLogIn from "./MobileLogIn/MobileLogIn";

const Container = styled.div`
  height: 100vh;
  min-height: 1024px;
  max-height: 1200px;
  width: 100%;
  min-width: 1440px;
  max-width: 2400px;

  background-color: #ffffff;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 667px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
`;

const LogIn = () => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const { store } = useContext(Context);
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  
  useEffect(() => {
    store.checkAuth();
  });

  if (store.isAuth) {
    return <Navigate to={fromPage} />;
  }

  return isDesktop ? (
    <Container>
      <Header color="#f1e2ff" />
      <Wrapper>
        <LogInLeftBlock />
        <FormBlock />
        <LogInRightBlock />
      </Wrapper>
    </Container>
  ) : (
    <MobileLogIn />
  );
};

export default observer(LogIn);
