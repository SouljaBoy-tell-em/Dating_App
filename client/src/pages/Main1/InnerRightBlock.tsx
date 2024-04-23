import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-image:url("/images/main1_table.svg");
  background-size: cover;
  background-position: center;
`;
const InnerRightBlock = () => {
  return <Container></Container>;
};

export default InnerRightBlock;
