import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";

import { observer } from "mobx-react-lite";

import { useLocation } from "react-router-dom";

import { TutorialContext } from "../Tutorial";
import { Slides } from "../../../../shared/store/turorialStore";
import Context from "../../../..";


import AnimatedText from "../AnimatedText";


const Container = styled.div`
  position: absolute;
  top: 15px;
  left: 70px;
  width: 100%;
`;

const ArrowImage = styled.img`
  width: 200px;
`;

const ArrowImage2 = styled.img`
  width: 150px;
  margin-left: -50px;
`;

const SecondAnimationContainer = styled.div`
  width: 60%;
  margin-left: 300px;
`;
const MenuSlide = observer(() => {
  const { tutorialStore } = useContext(TutorialContext);
  const { store } = useContext(Context);
  const location = useLocation();
  const index = tutorialStore.indexOfAnimation.get(Slides.MENU) ?? 0;
  const [startLocation, setStartLocation] = useState("");

  const nextAnimation = () => {
    tutorialStore.nextAnimation(Slides.MENU);
  };

  useEffect(() => {
    store.setMenuOpen(false);
    setStartLocation(location.pathname);
  }, []);

  if (store.isMenuOpen === true && index === 0) {
    nextAnimation();
  }

  if (startLocation !== "" && location.pathname !== startLocation) {
    store.isTutorial = false;
  }

  return (
    <Container>
      {index === 0 && (
        <>
          <ArrowImage
            src="/images/Tutorial/Menu_First_Arrow.png"
            alt="Menu_First_Arrow"
          />
          <AnimatedText text={"Please, click on menu"} callback={() => {}} />
        </>
      )}
      <SecondAnimationContainer>
        {index > 0  && (
          <AnimatedText
            text={
              "In fact, it's very simple. We have a swiper to help you find the right people, and a way to chat with them."
            }
            callback={() => {
              setTimeout(nextAnimation, 200);
            }}
          />
        )}
        {index > 1 && (
          <AnimatedText
            text={"Click on the swiper and start getting to know each other!"}
            callback={() => {
              nextAnimation();
            }}
            styles={{ marginTop: "50px" }}
          />
        )}
        {index === 3 && (
          <ArrowImage2
            src="/images/Tutorial/Menu_Second_Arrow.svg"
          />
        )}
      </SecondAnimationContainer>
    </Container>
  );
});

export default MenuSlide;
