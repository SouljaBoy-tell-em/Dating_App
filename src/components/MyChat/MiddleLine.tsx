import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: calc(80px + 10vh);
  height: 500px;
  width: 100%;
  background-color: #9403f5;
  z-index: 2;
`;

const MiddleLine = () => {
  return <Container></Container>;
};

export default MiddleLine;
