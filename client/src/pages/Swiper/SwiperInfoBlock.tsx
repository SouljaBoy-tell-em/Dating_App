import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { SwiperContext } from "./SwiperPage";

const Container = styled.div`
  min-height: 520px;
  height: min-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GoToProfileButton = styled.div`
  border: 0;
  border-radius: 20px;
  background-color: #baa6b8;
  transition: all 0.3s;
  cursor: pointer;
  &:active {
    transform: scale(1.1);
  }
  font-size: 30px;
  font-weight: 500;
  padding: 10px;
  padding-right: 50px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MainText = styled.p`
  font-size: 50px;
  font-weight: 500;
`;

const LocationBlock = styled.div`
  display: flex;
`;

const LocationIcon = styled.img`
  margin-left: -8px;
  margin-right: 4px;
  width: 50px;
`;

const BaseText = styled.p`
  font-weight: 500;
  font-size: 30px;
`;

const SmallText = styled.p`
  font-weight: 400;
  font-size: 30px;
`;

const SmallInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const SwiperInfoBlock = observer(() => {
  const { swiperStore } = useContext(SwiperContext);
  const description = `${swiperStore.users[0]?.description.slice(0, 15)}...`;
  return (
    <Container>
      <InfoBlock>
        <MainText>
          {swiperStore.users[0]?.firstname}, {swiperStore.users[0]?.age}
        </MainText>
        <LocationBlock>
          <LocationIcon src="/images/swiper/Location.png" />
          <BaseText>{swiperStore.users[0]?.city ?? "(Location)"}</BaseText>
        </LocationBlock>
        <SmallInfoBlock>
          <BaseText>About me</BaseText>
          <SmallText>{description}</SmallText>
        </SmallInfoBlock>
        <SmallInfoBlock>
          <BaseText>Zodiac sign</BaseText>
          <SmallText>{swiperStore.users[0]?.zodiacSign ?? "Gemini"}</SmallText>
        </SmallInfoBlock>
        <SmallInfoBlock>
          <BaseText>Personality test</BaseText>
          <SmallText>{swiperStore.users[0]?.personalType ?? "-----"}</SmallText>
        </SmallInfoBlock>
      </InfoBlock>
      <Link to={`/user/${swiperStore.users[0]?.email}`}>
        <GoToProfileButton>Go to profile</GoToProfileButton>
      </Link>
    </Container>
  );
});

export default SwiperInfoBlock;
