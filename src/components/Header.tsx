import { useContext } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import Context from "..";
import { Button } from "../pages/SignIn";

import "../css/header.css";

const MyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #ffffff;
  padding: 10px;
`;

const HeaderLinks = styled.div`
  display: inline-flex;
  background-color: #9403f558;
  border-radius: 5px;
  height: 30px;
`;


const Header = () => {
  const { store } = useContext(Context);

  return (
    <MyHeader>
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.username}`
          : "АВТОРИЗУЙТЕСЬ"}
      </h1>
      <HeaderLinks>
        {!store.isAuth? (<Link to={"/login"} className="header-link">LogIn </Link>):null}
        <Link to={"/private"} className="header-link">Private </Link>
        <Link to={"/"} className="header-link">About</Link>
        <Link to={"/PersonalityTest"} className="header-link">Personality Test</Link>
        <Link to={"/chat"} className="header-link">Chat</Link>

      </HeaderLinks>

      {store.isAuth ? (
        <Button
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
          }}
          onClick={() => {
            store.logout();
          }}
        >
          LogOut
        </Button>
      ) : null}
    </MyHeader>
  );
};

export default Header;
