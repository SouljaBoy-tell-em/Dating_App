import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styled from "styled-components";

import Context from "../..";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const TopRightBlock = styled.div`
  z-index: 0;
  position: absolute;
  top: 0;
  right: 0;
  width: 700px;
  height: 445px;
`;

const BottomLeftBlock = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 165px;
  height: 710px;
  background-color: #f1e2ff;
  border-top-right-radius: 15px;
  padding-right: 10px;
  padding-top: 10px;
`;

const InnerBLBlock = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  border-top-right-radius: 10px;
`;
const BottomRightBlock = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 800px;
  height: 510px;
`;

const FInnerBRBlock = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  height: calc(100% - 10px);
  width: 340px;
  padding-top: 10px;
  padding-left: 10px;
  background-color: #f1e2ff;
  border-top-left-radius: 10px;
`;

const FInnerInnerBRBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-top-left-radius: 10px;
`;

const FSInnerInnerBRBlock = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 220px;
  height: 64px;
  background-color: #f1e2ff;
  border-top-right-radius: 20px;
`;

const SInnerBRBlock = styled.div`
  z-index: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  height: 54px;
  width: calc(100% - 10px);
  padding-top: 10px;
  padding-left: 10px;
  background-color: #f1e2ff;
  border-top-left-radius: 10px;
`;

const SInnerInnerBRBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-top-left-radius: 10px;
`;
////////////////////////////////////////////////
const FInnerTRBlock = styled.div`
  z-index: 1;
  position: absolute;
  right: 0;
  height: calc(100% - 10px);
  width: 155px;
  padding-bottom: 10px;
  padding-left: 10px;
  background-color: #f1e2ff;
  border-bottom-left-radius: 20px;
`;

const FInnerInnerTRBlock = styled.div`
  width: 100%;
  height: 280px;
  background-color: white;
  border-bottom-left-radius: 10px;
`;

const FSInnerInnerTRBlock = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 220px;
  height: 64px;
  background-color: #f1e2ff;
  border-bottom-left-radius: 20px;
`;

const SInnerTRBlock = styled.div`
  z-index: 0;
  position: absolute;
  right: 0;
  top: 0;
  height: 54px;
  width: calc(100% - 10px);
  padding-bottom: 10px;
  padding-left: 10px;
  background-color: #f1e2ff;
  border-bottom-left-radius: 10px;
`;

const SInnerInnerTRBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-bottom-left-radius: 10px;
`;

const ChatLayout = observer(() => {
  const { store } = useContext(Context);

  return (
    <Container>
      <TopRightBlock>
        <FInnerTRBlock>
          <FInnerInnerTRBlock>
            <FSInnerInnerTRBlock />
          </FInnerInnerTRBlock>
        </FInnerTRBlock>
        <SInnerTRBlock>
          <SInnerInnerTRBlock />
        </SInnerTRBlock>
      </TopRightBlock>
      <BottomLeftBlock>
        <InnerBLBlock />
      </BottomLeftBlock>
      <BottomRightBlock>
        <FInnerBRBlock>
          <FInnerInnerBRBlock>
            <FSInnerInnerBRBlock />
          </FInnerInnerBRBlock>
        </FInnerBRBlock>
        <SInnerBRBlock>
          <SInnerInnerBRBlock />
        </SInnerBRBlock>
      </BottomRightBlock>
    </Container>
  );
});

export default ChatLayout;
