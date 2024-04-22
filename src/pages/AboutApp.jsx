import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 90vh;
  background-color: #9403f5;
  display: flex;
  justify-content: center; /* выравниваем по горизонтали по центру */
  align-items: center; /* выравниваем по вертикали по центру */
  position: relative;
`;

const Wrapper = styled.div`
  width: 60%;
  padding: 30px;
  border-radius: 30px;
  border: 5px;
  border-color: wheat;
  background-color: aliceblue;
`;
const PublicPage = () => {
  return (
    <Container>
      <Wrapper>
        Phystech Date - это ежегодное мероприятие, которое собирает студентов и
        выпускников МФТИ для обмена опытом, знаниями и планами на будущее. В
        рамках мероприятия проходят лекции от успешных предпринимателей и
        ученых, мастер-классы по разным научным дисциплинам, а также
        развлекательные программы и вечеринки. Phystech Date - это отличная
        возможность расширить свой круг общения, найти новых друзей и партнеров
        по проектам, а также получить дополнительные знания и навыки для своего
        будущего успеха.
      </Wrapper>
    </Container>
  );
};

export default PublicPage;
