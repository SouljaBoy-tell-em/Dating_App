import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Logo from "./Logo";
import AuthButtons from "./AuthButtons";

const Container = styled.div`
  height: 290px;
  position: absolute;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  z-index: 10;
  @media (max-width: 1224px) {
    justify-content: end;
    height: 140px;
  }
`;

const AuthButtonsWrapper = styled.div`
  margin-top: 140px;
  margin-right: 100px;
  @media (max-width: 1224px) {
    margin: 0;
    margin-top: 10px;
    margin-right: 10px;
  }
`;

const LogoWrapper = styled.div`
  margin-left: 140px;
  @media (max-width: 1224px) {
    display: none;
  }
`;

const Header = (props) => {
  return (
    <Container>
      <LogoWrapper>
        <Link to="/">
          <Logo color={props.color} />
        </Link>
      </LogoWrapper>
      <AuthButtonsWrapper>
        <AuthButtons />
      </AuthButtonsWrapper>
    </Container>
  );
};

export default observer(Header);
