import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 200px;
  position: relative;
  margin-right: 80px;
`;

const OutBlock = styled.div`
    padding-top:10px;
    padding-right: 10px;
    height: 390px;
    width: 290px;
    border-top-right-radius: 15px;
    background-color: #E4E4E4;
    position: absolute;
    bottom:0;
    z-index: 2;
`;
const InnerBlock = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
`;
const Img = styled.img`
    margin-top: -60px;
    position: absolute;
    z-index: 10;
    margin-left: 83px;
`;

const LogInLeftBlock = () => {
  return (
    <Container>
      <Img src="/images/logIn_left_human.svg"></Img>
      <OutBlock>
        <InnerBlock></InnerBlock>
      </OutBlock>
    </Container>
  );
};

export default LogInLeftBlock;
