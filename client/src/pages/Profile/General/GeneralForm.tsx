import React, { useContext, useState } from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";

import Context from "../../..";
import UploadPhoto from "../../CreateProfile/UploadPhoto";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Label = styled.label`
  font-size: 25px;
  font-weight: 600;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 2px solid black;
  padding: 5px;
  font-size: 20px;
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledDatePicker = styled(DatePicker)`
  .react-datepicker {
    font-family: Arial, sans-serif;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
  }
`;

const AddressButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  width: fit-content;
  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #ccc;
  }
`;

const SaveButton = styled.button`
  background-color: #007bff;
  font-size: 25px;

  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #ccc;
  }
`;

const DateInput = styled.input`
  height: 30px;
  border-radius: 15px;
  padding-left: 10px;
  font-size: x-large;
`;

interface GeneralForimInterface{
  setABOpen: (isOpen:boolean) => void;
}
const GeneralForm:React.FC<GeneralForimInterface> = ({setABOpen}) => {
  const { store } = useContext(Context);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isPrivate, setIsPrivate] = useState("");

  const handleFirstnameChange = (event: any) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event: any) => {
    setLastname(event.target.value);
  };

  const handleBirthdayChange = (event: any) => {
    setBirthday(event.target.value);
  };

  const handleIsPrivateChange = (event: any) => {
    setIsPrivate(event.target.value);
  };

  const handleFormSubmit = () => {
    const isPrivateBool = isPrivate === "Yes" ? true : false;
    store.fieldProfile({
      email: "ifedorov555@mail.ru",
      firstname: firstname !== "" ? firstname : store.userInfo.firstName,
      lastname: lastname !== "" ? lastname : store.userInfo.lastName,
      birthday: birthday,
      isPrivate: isPrivateBool,
    });
  };

  return (
    <Container>
      <Wrapper>
        <Label>Firstname</Label>
        <Input
          type="text"
          value={firstname}
          onChange={handleFirstnameChange}
          placeholder={store.userInfo.firstName}
        />
      </Wrapper>
      <Wrapper>
        <Label>Lastname</Label>
        <Input
          type="text"
          value={lastname}
          onChange={handleLastnameChange}
          placeholder={store.userInfo.lastName}
        />
      </Wrapper>
      <Wrapper>
        <Label>Birthday</Label>
        <DateInput type="date" value={birthday} onChange={handleBirthdayChange} min="1940-01-01" max="2006-01-01"/>
      </Wrapper>
      
      <Wrapper>
        <Label>Is private</Label>
        <RadioContainer>
          <label>
            <input
              type="radio"
              value="Yes"
              checked={isPrivate === "Yes"}
              onChange={handleIsPrivateChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="No"
              checked={isPrivate === "No"}
              onChange={handleIsPrivateChange}
            />
            No
          </label>
        </RadioContainer>
      </Wrapper>
      <Wrapper>
        <Label>Address</Label>
        <AddressButton onClick={()=>{setABOpen(true);}}>Choosee Address</AddressButton>
      </Wrapper>
      <hr/>
      <UploadPhoto />
      <hr/>

      <SaveButton onClick={handleFormSubmit}>Save</SaveButton>
    </Container>
  );
};

export default GeneralForm;
