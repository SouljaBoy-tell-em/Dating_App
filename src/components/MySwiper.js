import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import axios from "axios";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import TinderSlide from "./TinderSlide";

const MySwiper = forwardRef((props, ref) => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8189/users/all")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Ошибка при получении списка пользователей:", error);
      });
  }, []);

  const updateUsers = (newUsers) => {
    setUsers(newUsers);
  };

  useImperativeHandle(ref, () => ({
    updateUsers
  }));

  return (
    <div className="swiper__div">
      <Swiper
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={20}
      >
        {users.map((user, index) => (
          <SwiperSlide key={index}>
            <TinderSlide src={user.image_url} id={index} name={user.name} age={user.age} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );

});

export default MySwiper;
