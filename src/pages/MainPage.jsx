import styled from "styled-components";

import React, { useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";


const Container = styled.div`
  height: 90vh;
  background-color: #9403f5;
  display: flex;
  justify-content: center; /* выравниваем по горизонтали по центру */
  align-items: center; /* выравниваем по вертикали по центру */
  position: relative;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  height: 35px;
  width: 80px;
  border-radius: 5px;
  background-color: #d4aaff;
  cursor: pointer;

  transition: transform 0.2s, background-color 0.3s;
  &:hover {
    background-color: #c489ff;
  }

  &:active {
    transform: scale(1.06); /* увеличиваем кнопку при нажатии на 1.1 */
  }
`;

const Block = styled.div`
  width: 300px;
  height: 500px;
  background-color: aliceblue;
  border-radius: 10px;
`;

const MainPage = (props) => {
  const swiperRef = useRef(null);

  const socket = new SockJS("http://localhost:8189/ws");
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, function () {
    stompClient.subscribe("/topic/userAddedNotification", function (response) {
      console.log("Messege recieved!");
      const newUsers = JSON.parse(response.body);
      swiperRef.current.updateUsers(newUsers);
    });
  });


  return (
    <Container>
      <Block/>
    </Container>
  );
};

export default MainPage;
