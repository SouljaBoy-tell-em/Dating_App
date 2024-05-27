import React, { useContext, useState } from "react";
import { useSwiper } from "swiper/react";

import styled from "styled-components";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { observer } from "mobx-react-lite";

import { SwiperContext } from "../SwiperPage";

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  position: relative;
  width: min-content;
`;

const Img = styled.img`
  position: relative;
  object-fit: cover;
  border-radius: 10px;
  width: 350px;
  height: 500px;
  z-index: 1;
  box-shadow: 0 0 2px 2px gray;
  margin: 3px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const LikeButton = styled.button`
  border: 0;
  background-color: #aafbbd;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 2px 2px #afafaf;
  &:active {
    transform: scale(1.05);
  }
`;

const DisButton = styled.button`
  border: 0;
  background-color: #fbaaaa;
  box-shadow: 0 0 2px 2px #afafaf;

  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:active {
    transform: scale(1.05);
  }
`;

const Name = styled.p`
  position: absolute;
  top: 4%;
  left: 4%;
  color: white;
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-size: 30px;
  background-color: rgba(20, 20, 20, 0.51);
  border-radius: 10px;
  padding: 5px;
  z-index: 10;
`;


const TinderSlide = observer((props: any) => {
  const { swiperStore } = useContext(SwiperContext);

  const swiper = useSwiper();

  const [isVisible, setIsVisible] = useState(swiper.realIndex === props.id);

  swiper.on("slideChange", function () {
    if (swiper.realIndex === props.id) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const handleRate = async (isLike: boolean) => {

    const email = swiperStore.users[0].email;
    await swiperStore.ratePerson(email ? email : "", isLike);
    await swiperStore.getUsers();
    if (isLike) {
      swiperStore.next();
    } else {
      swiperStore.prev();
    }
  };
  return (
    <Container>
      {isVisible && (
        <Name>
          {props.name}, {props.age}
        </Name>
      )}
      <Img src={props.src} />
      {isVisible && (
        <ButtonWrapper>
          <DisButton
            onClick={() => {
              swiper.slidePrev();
              handleRate(false);
            }}
          >
            <RxCross2 color="red" size={40} />
          </DisButton>
          <LikeButton
            onClick={() => {
              swiper.slideNext();
              handleRate(true);
            }}
          >
            <GiCheckMark color="#42bc00" size={40} />
          </LikeButton>
        </ButtonWrapper>
      )}
    </Container>
  );
});

export default TinderSlide;
