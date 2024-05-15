import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Header from "../Main1/Header";
import Block from "./Block";
import NavigateMenu from "./NavigateMenu";
import PersonalityTest from "../../widgets/PersonalityTest/PersonalityTest";
import ProfileForm from "../CreateProfile/ProfileForm";
import CreateProfile from "../CreateProfile/CreateProfile";

import General from "./General/General";
import ZodiacBlock from "./Zodiac/ZodiacBlock";
import Privacy from "./Privacy/Privacy";



const Container = styled.div`
  height: 100vh;
  min-height: 1024px;
  max-height: 1200px;
  width: 100%;
  min-width: 1440px;
  max-width: 2400px;
  background-color: #ffffff;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NavigateWrapper = styled.div`
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: ${({ sticky }) => (sticky ? "0" : "200px")};
  right: 50px;
  z-index: 50;
  transition: top 0.2s;
`;

const Footer = styled.div`
  width: 100%;
  height: 200px;
`;

const Profile = () => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const headerHeight = 250; // это высота, после которой NavigateMenu станет sticky
    const scrolled = window.scrollY;
    if (scrolled > headerHeight) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container>
      <Header color="#f1e2ff" />
      <Wrapper>
        <Block name="General">
          <General/>
        </Block>
        <Block name="Personality Test">
          <PersonalityTest/>
        </Block>
        <Block name="Zodiac sign">
          <ZodiacBlock/>
        </Block>
        <Block name="Privacy" >
          <Privacy/>
        </Block>
        <Footer />
        <NavigateWrapper sticky={isSticky}>
          <NavigateMenu />
        </NavigateWrapper>
      </Wrapper>
    </Container>
  );
};

export default Profile;
