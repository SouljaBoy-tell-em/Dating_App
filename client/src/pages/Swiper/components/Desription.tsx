import React, { useContext } from "react";
import styled from "styled-components";
import Swiper from "swiper";

import { observer } from "mobx-react-lite";

import { SwiperContext } from "../SwiperPage";
import Store from "../../../shared/store/store";

const Container = styled.div`
  background-color: #ffffff;
  height: 500px;
  width: 300px;
  padding: 0 20px;
  position: relative;
  border-radius: 10px;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
`;

const Text = styled.p`
  font-size: 20px;
`;
const Desription = observer(() => {
  const { swiperStore } = useContext(SwiperContext);
  return (
    <Container>
      <Title>About me:</Title>
      <Text>{swiperStore.users[0]?.description}</Text>
    </Container>
  );
});

export default Desription;
