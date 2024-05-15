import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useSwiper } from "swiper/react";

import { observer } from "mobx-react-lite";

import TinderSlide from "./TinderSlide";
import { SwiperContext } from "../SwiperPage";

const Container = styled.div`
  width: 370px;
`;

const OurSwiper = observer(() => {
  const { swiperStore } = useContext(SwiperContext);
  const swiper = useSwiper();

  useEffect(() => {
    swiperStore.getUsers();
  }, []);


  return (
    <Container>
      {swiperStore.users.length !== 0 && (
        <Swiper
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
        >
          <SwiperSlide key={0}>
            <TinderSlide
              src={swiperStore.getHamachiUrl(
                swiperStore.users[swiperStore.order[0]].imageAvatarUrl
              )}
              id={0}
              name={swiperStore.users[swiperStore.order[0]].firstname}
              age={swiperStore.users[swiperStore.order[0]].lastname}
            />
          </SwiperSlide>

          <SwiperSlide key={1}>
            <TinderSlide
              src={swiperStore.getHamachiUrl(
                swiperStore.users[swiperStore.order[1]].imageAvatarUrl
              )}
              id={1}
              name={swiperStore.users[swiperStore.order[1]].firstname}
              age={swiperStore.users[swiperStore.order[1]].lastname}
            />
          </SwiperSlide>

          <SwiperSlide key={2}>
            <TinderSlide
              src={swiperStore.getHamachiUrl(
                swiperStore.users[swiperStore.order[2]].imageAvatarUrl
              )}
              id={2}
              name={swiperStore.users[swiperStore.order[2]].firstname}
              age={swiperStore.users[swiperStore.order[2]].lastname}
            />
          </SwiperSlide>
        </Swiper>
      )}
    </Container>
  );
});

export default OurSwiper;
