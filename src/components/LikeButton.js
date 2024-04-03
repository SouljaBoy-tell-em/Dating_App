import { React } from "react";
import { useSwiper } from "swiper/react";

const LikeButton = () => {
  const swiper = useSwiper();

  return (
    <button className="like-button" onClick={() => swiper.slideNext()}>Like</button>
  );
};

export default LikeButton;