import React from "react";
import styled from "styled-components";

interface ConIndicatorInterface {
  isConnected: boolean;
}

const Container = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const RoundIndicator = styled.div<{ isConnected: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => (props.isConnected ? "green" : "red")};
`;

const Text = styled.p`
    color:white;
    font-weight: 500;
    font-size: 30px;
`;

const ConnectIndicator: React.FC<ConIndicatorInterface> = ({ isConnected }) => {
  return (
    <Container>
      <RoundIndicator isConnected={isConnected} />
      <Text>{isConnected ? "Online" : "Offline"}</Text>
    </Container>
  );
};

export default ConnectIndicator;
