import React, { useContext, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { observer } from "mobx-react-lite";
import { SwiperContext } from "../SwiperPage";
import { SexType } from "../../../shared/models/swiper/SexType";

const Container = styled.div`
  background-color: #e6e6e6;
  height: auto; // изменено для учета новой кнопки
  width: 294px;
  border: 8px solid gray;
  border-radius: 15px;
  z-index: 10;
  padding-bottom: 20px;
`;

const Menu = styled(motion.div)`
  margin-right: -200px;
  border: 0;
  display: flex;
  align-items: flex-start;
`;

const Button = styled(motion.button)`
  margin-top: auto;
  margin-bottom: auto;
  border: 0;
  cursor: pointer;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 10px 0;
  background-color: #bababa;
  display: flex;
  align-items: center;
  z-index: 20;
`;

const FilterName = styled.p`
  padding: 5px;
  font-size: 30px;
  font-weight: 600;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  padding-left: 25px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100px;
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100px;
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const ApplyButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transform: 0.3s;
  &:active {
    transform: scaleY(1.05);
  }
`;

const SwiperFilter = observer(() => {
  const [isOpen, setOpen] = useState(false);
  const { swiperStore } = useContext(SwiperContext);

  const [ageFrom, setAgeFrom] = useState(18);
  const [ageTo, setAgeTo] = useState(70);
  const [sex, setSex] = useState("man");

  const handleApply = () => {
    swiperStore.setFilter({ ageFrom, ageTo, sex });
  };

  return (
    <Menu
      initial={{ marginRight: -313 }}
      animate={{ marginRight: isOpen ? 5 : -313 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        onClick={() => setOpen(!isOpen)}
        initial={{
          marginRight: 0,
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        animate={
          isOpen
            ? {
                marginRight: -30,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
              }
            : {
                marginRight: 0,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }
        }
        transition={{ duration: 0.5 }}
      >
        {isOpen ? (
          <AiOutlineDoubleRight size={30} />
        ) : (
          <AiOutlineDoubleLeft size={30} />
        )}
      </Button>
      <Container>
        <FilterName>Swiper filter</FilterName>
        <Wrapper>
          <InputContainer>
            <Label>Gender:</Label>
            <Select value={sex} onChange={(e) => setSex(e.target.value)}>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="any">Any</option>
            </Select>
          </InputContainer>
          <InputContainer>
            <Label>Age from:</Label>
            <Input
              type="number"
              min="18"
              max="70"
              value={ageFrom}
              onChange={(e) => setAgeFrom(Number(e.target.value))}
            />
          </InputContainer>
          <InputContainer>
            <Label>Age to:</Label>
            <Input
              type="number"
              min="18"
              max="70"
              value={ageTo}
              onChange={(e) => setAgeTo(Number(e.target.value))}
            />
          </InputContainer>
        </Wrapper>
        <ApplyButton onClick={handleApply}>Apply</ApplyButton>
      </Container>
    </Menu>
  );
});

export default SwiperFilter;
