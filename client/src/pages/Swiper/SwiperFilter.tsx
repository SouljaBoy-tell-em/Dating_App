import React, { useContext, useState } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { SwiperContext } from "./SwiperPage";
import { SexType } from "../../shared/models/swiper/SexType";

const Container = styled.div`
  width: 400px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 2px 4px 6px gray;
  display: flex;
  flex-direction: column;
  height: max-content;
  padding-bottom:20px;
  @media(max-width:1224px){
    max-width:calc(100% - 20px);

  }
`;

const Label = styled.label``;
const Input = styled.input``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 20px;
`;
const TopBlock = styled.div`
    width:calc(100% - 30px)
    padding: 15px;
    display: flex;
    justify-content: end;
    align-items:center;
`;

const UnstyledButton = styled.button`
  background-color: inherit;
  border: 0;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubmitButton = styled.button`
    border-radius:15px; 
    font-size: 30px;
    color: white;
    background-color: #c768c0;
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: -5px;
`;

interface SwiperFilterParams {
  onClose: () => void;
}

const SwiperFilter: React.FC<SwiperFilterParams> = ({ onClose }) => {
    
  const {swiperStore} = useContext(SwiperContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    swiperStore.setFilter({
      ageFrom: ageFrom,
      ageTo: ageTo,
      sex: selectedGender === "Male" ? SexType.MALE : SexType.FEMALE,
    });

    onClose();
  };
  

  const [ageFrom, setAgeFrom] = useState(0);
  const [ageTo, setAgeTo] = useState(99);
  const [selectedGender, setSelectedGender] = useState<string>("");

  const handleIsGenderChange = (event: any) => {
    setSelectedGender(event.target.value);
  };

  return (
    <Container>
      <TopBlock>
        <UnstyledButton onClick={onClose}>
          <IoClose size={30} />
        </UnstyledButton>
      </TopBlock>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label>Age from</Label>
          <Input
            type="number"
            min={0}
            max={99}
            onChange={(e: any) => setAgeFrom(e.target.value)}
            value={ageFrom}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Age to</Label>
          <Input
            type="number"
            min={0}
            max={99}
            onChange={(e: any) => setAgeTo(e.target.value)}
            value={ageTo}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Gender</Label>
          <RadioContainer>
            <label>
              <input
                type="radio"
                value="Male"
                checked={selectedGender === "Male"}
                onChange={handleIsGenderChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={selectedGender === "Female"}
                onChange={handleIsGenderChange}
              />
              Female
            </label>
          </RadioContainer>
        </InputWrapper>
        <SubmitButton>Apply</SubmitButton>
      </Form>
    </Container>
  );
};

export default SwiperFilter;
