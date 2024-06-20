import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styled from "styled-components";

import Context from "../..";

const TopRightBlock = styled.div`
  z-index: 3;
  position: absolute;
  top: 0;
  right: 0;
  width: 540px;
  height: 330px;
  background-color: #f1e2ff;
  border-bottom-left-radius: 15px;
  padding-left: 10px;
  padding-bottom: 10px;
`;

const InnerTPBlock = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-bottom-left-radius: 10px;
`;

const BottomLeftBlock = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 380px;
  height: 300px;
  background-color: #f1e2ff;
  border-top-right-radius: 15px;
  padding-right: 10px;
  padding-top: 10px;
`;

const InnerBLBlock = styled.div`
  width: 100%;
  height: 100%;
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

const Header = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  width: 100%;
  height: 250px;
  background-color: 0;
`;

const HeaderText1 = styled.h2`
  font-size: 70px;
  font-weight: 500;
`;
const HeaderText2 = styled.h3`
  font-size: 50px;
  font-weight: 400;
`;

const HeaderTextContainer = styled.div`
  margin-left: 240px;
  margin-top: 80px;
  width: 755px;
  @media (min-width: 1900px) {
    width: max-content;
  }
`;

const ButterflyImage = styled.img`
  position: absolute;
  top:0;
  left: 0;
  margin-top: 300px;
  margin-left: 200px;
  width: 227px;
  height: auto;
`;
const SwiperLayout = observer(() => {
  const { store } = useContext(Context);

  return (
    <>
      <Header>
        <HeaderTextContainer>
          <HeaderText1>
            Hi, {`${store.userInfo.firstName || "..."}!`}
          </HeaderText1>
          <HeaderText2>
            We have find some profiles which you might like
          </HeaderText2>
        </HeaderTextContainer>
      </Header>
      <TopRightBlock>
        <InnerTPBlock />
        <ButterflyImage src={"/images/swiper/butterfly.png"} />
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
    </>
  );
});

export default SwiperLayout;
