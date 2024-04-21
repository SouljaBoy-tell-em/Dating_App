import React from "react";
import styled from "styled-components";

import InnerLeftBlock from "./InnerLeftBlock";
import InnerRightBlock from "./InnerRightBlock";
import Header from "./Header";

const Container = styled.div`
  height: 100vh;
  min-height: 1024px;
  max-height: 1200px;
  background-color: #ffffff;
  position: relative;
  width: 100%;
  min-width: 1440px;
  max-width: 2400px;
  margin-left: auto;
  margin-right: auto; 
`;

const Wrapper = styled.div`
  height: 664px;
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  gap: 20px;
`;

const LeftBlock = styled.div`
  height: 100%;
  width: 893px;
  background-color: #f1e2ff;
  border-top-right-radius: 15px;
  display: flex;
  justify-content: flex-end;
  padding-top: 55px;
`;

const WrapperRightBlock = styled.div`
  height: 93%;
  width: 496px;
  background-color: #f1e2ff;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 8px 0 8px 8px;
`;


const Main1 = () => {
  return (
    <Container>
      <Header color="#f1e2ff"/>
      <Wrapper>
        <LeftBlock>
          <InnerLeftBlock />
        </LeftBlock>
        <WrapperRightBlock>
          <InnerRightBlock></InnerRightBlock>
        </WrapperRightBlock>
      </Wrapper>
    </Container>
  );
};

export default Main1;
