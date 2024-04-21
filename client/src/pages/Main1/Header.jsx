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
`;

const AuthButtonsWrapper = styled.div`
  margin-top: 140px;
  margin-right: 100px;
`;

const LogoWrapper = styled.div`
  margin-left: 140px;
`;

const Header = (props) => {
  return (
    <Container>
      <LogoWrapper>
        <Link to="/main1">
          <Logo color={props.color}/>
        </Link>
      </LogoWrapper>
      <AuthButtonsWrapper>
        <AuthButtons />
      </AuthButtonsWrapper>
    </Container>
  );
};

export default observer(Header);
