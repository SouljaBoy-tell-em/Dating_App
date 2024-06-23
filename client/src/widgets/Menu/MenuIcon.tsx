import React from "react";
import styled from "styled-components";

import { CgProfile } from "react-icons/cg";
import { MdSwipeRight } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";


enum IconType{
  profile,
}

interface MenuIconInterface{
  size?:number;
  type?:IconType;
  color?:string;
}

const MenuIcon:React.FC<MenuIconInterface> = ({size, type, color}) => {
  return (
    <>
      {type && type === "profile" && <CgProfile size={size} color={color}/>}
      {type && type === "swiper" && <MdSwipeRight size={size} color={color}/>}
      {type && type === "chat" && <IoChatboxEllipsesOutline size={size} color={color}/>}
    </>
  );
};

export default MenuIcon;