import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-scroll";

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 250px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden; // Скрываем контент за границами рамки
`;

const Circle = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #984caf; // Зеленый цвет для активности
  margin-left: 10px;
  margin-right: -10px;
  opacity: 0;
  transition: opacity 0.3s;

  .active & {
    opacity: 1;
  }
`;

const BlockSection = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;

  .active & {
    background-color: #f0f0f0; // Светло-серый фон для активной ссылки
    color: #333; // Темнее цвет текста для лучшего контраста
  }
`;

const BlockName = styled.p`
  font-size: 16px;
  padding: 15px 20px;
  margin: 0;
  font-weight: 500;
`;

const Hr = styled.hr`
  margin: 0;
  border-color: #eaeaea;
`;

const blockNames = ["General", "Personality Test", "Privacy"];

const NavigateMenu = () => {
  return (
    <Container>
      {blockNames.map((block, index) => (
        <React.Fragment key={index}>
          <BlockSection
            to={block}
            smooth={true}
            duration={500}
            spy={true}
            offset={-70}
            activeClass="active"
          >
            <Circle className="circle" activeClass="active" />
            <BlockName>{block}</BlockName>
          </BlockSection>
          {index < blockNames.length - 1 && <Hr />}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default NavigateMenu;
