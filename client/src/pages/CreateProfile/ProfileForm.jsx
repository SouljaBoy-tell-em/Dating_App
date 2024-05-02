import React, { useContext, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import {observer} from "mobx-react-lite";

import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import UploadPhoto from "./UploadPhoto";
import Context from "../..";

const Container = styled.div`
  border-radius: 15px;
  font-size: 30px;

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #f1e2ff;

`;

const Input = styled.input`
  font-size: 20px;
  padding-left: 5px;
  height: 30px;
  width: 300px;
`;

const Label = styled.label``;

const Button = styled.button`
  font-size: 30px;
  width: fit-content;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 15px;
  border:1px;
  background-color: #e884ff;
  &:active {
    transform: scale(1.05);
  }
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ProfileForm = () => {
  const { store } = useContext(Context);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [isPrivate, setIsPrivate] = useState("");

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleBirthdayChange = (date) => {
    setBirthday(date);
  };

  const handleIsPrivateChange = (event) => {
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
      <Label>Firstname</Label>
      <Input type="text" value={firstname} onChange={handleFirstnameChange} placeholder={store.userInfo.firstName}/>
      <Label>Lastname</Label>
      <Input type="text" value={lastname} onChange={handleLastnameChange}  placeholder={store.userInfo.lastName} />
      <Label>Birthday</Label>
      <DatePicker
        selected={birthday}
        onChange={handleBirthdayChange}
        dateFormat="dd/MM/yyyy"
        showTimeSelect={false}
        className="create-profile-date-picker"
      />
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
      <Button onClick={handleFormSubmit}>Send</Button>
      <UploadPhoto/>

    </Container>
  );
};

export default observer(ProfileForm);
