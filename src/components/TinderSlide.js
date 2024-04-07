import React, { useState } from "react";

import { useSwiper } from "swiper/react";

import LikeButton from "./LikeButton";
import DisButton from "./DisButton";
import "../css/buttons.css";

const TinderSlide = (props) => {
  const swiper = useSwiper();
  const [isVisible, setIsVisible] = useState(props.id === 0 ? true : false);

  swiper.on("slideChange", function () {
    if (swiper.activeIndex === props.id) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  return (
    <div>
      {isVisible && <p className="name-on-slide">{props.name}, {props.age}</p>}
      <img src={props.src} />
      {isVisible && <LikeButton />}
      {isVisible && <DisButton />}
    </div>
  );
};

export default TinderSlide;

