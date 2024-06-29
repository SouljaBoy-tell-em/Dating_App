import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MenuIcon from "./MenuIcon";
import { observer } from "mobx-react-lite";
import Context from "../..";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    visibility: "visible",
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    visibility: "hidden",
  },
};

const colors = [
  "#FF008C",
  "#D309E1",
  "#9C1AFF",
  "#7700FF",
  "#4400FF",
  "#6600ff",
];

const routes = ["/", "/chat", "/swiper", "/profile"];
const text = ["Main Page", "Chat", "Swiper", "Edit Profile"];

const iconType = ["", "chat", "swiper", "profile"];

export const MenuItem = observer(({ i }) => {
  const style = {
    border: `2px solid ${colors[1]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const { store } = React.useContext(Context);

  return (
    <Link
      to={routes[i]}
      style={{
        textDecoration: "none",
        color: store.colorTheme ? "white" : "black",
      }}
      onClick={()=>{store.setMenuOpen(false)}}
    >
      <motion.li
        className="menu-li"
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="icon-placeholder" style={style}>
          <MenuIcon type={iconType[i]} size={30} />
        </div>
        <div className="text-placeholder" style={style}>
          {text[i]}
        </div>
      </motion.li>
    </Link>
  );
});
