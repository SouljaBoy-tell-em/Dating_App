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
  background-color: #eeeeee;
  border-radius: 10px;
  box-shadow: 0 0 1px 1px gray;
  border: 0;
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
const GeneralForm = () => {
  const { store } = useContext(Context);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [isPrivate, setIsPrivate] = useState("");

  const handleFirstnameChange = (event: any) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event: any) => {
    setLastname(event.target.value);
  };

  const handleBirthdayChange = (date: any) => {
    setBirthday(date);
  };

  const handleIsPrivateChange = (event: any) => {
    setIsPrivate(event.target.value);
  };

  const handleFormSubmit = () => {
    const isPrivateBool = isPrivate === "Yes" ? true : false;
    store.fieldProfile({
      email: "ifedorov555@mail.ru",
      firstname: firstname,
      lastname: lastname,
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
        <StyledDatePicker
          selected={birthday}
          onChange={handleBirthdayChange}
          dateFormat="dd/MM/yyyy"
          showTimeSelect={false}
        />
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

      <UploadPhoto />
    </Container>
  );
};

export default GeneralForm;
