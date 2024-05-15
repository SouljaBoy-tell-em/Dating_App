import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  min-height: 600px;
  margin-bottom: 20px;
  
`;

const BlockName = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 390px);
  margin-left: 30px;
`;

const Name = styled.p`
  font-size: 30px;
  margin: 0 10px;
  font-weight: 600;
`;

const HrLeft = styled.hr`
  border: 2px solid #bababaff;
  width: 10%;
  margin: 0;
`;

const HrRight = styled.hr`
  border: 2px solid #bababaff;
  flex-grow: 1;
  margin: 0;
`;

interface BlockInterface {
  name: string;
  children?: React.ReactNode; 
}

const Block: React.FC<BlockInterface> = ({ name, children }) => {
  return (
    <Container id={name}>
      <BlockName>
        <HrLeft />
        <Name>{name}</Name>
        <HrRight />
      </BlockName>
      {children}
    </Container>
  );
};

export default Block;
