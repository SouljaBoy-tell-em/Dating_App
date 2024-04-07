import { React } from "react";
import { useSwiper } from "swiper/react";
import "../css/main.css";

const DisButton = () => {
  const swiper = useSwiper();

  return (
    <button className="dis-button" onClick={() => swiper.slideNext()}>
      Dis
    </button>
  );
};

export default DisButton;
