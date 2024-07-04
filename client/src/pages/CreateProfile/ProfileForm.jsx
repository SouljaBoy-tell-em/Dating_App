import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useMediaQuery } from "react-responsive";

import "./style.css";
import UploadPhoto from "./UploadPhoto";
import Context from "../..";
import Dropdown from "./DropDown";
import { zodiacOptions } from "../../shared/models/profile/ZodiacOptions";

const Container = styled.div`
  border-radius: 15px;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #f1e2ff;
  box-shadow: 2px 2px 5px rgba(191, 171, 191, 0.5);
  @media (max-width: 1224px) {
    margin-top: 80px;
    margin-bottom: 20px;
    height: min-content;
  }
`;

const Input = styled.input`
  font-size: 20px;
  padding-left: 5px;
  height: 30px;
  width: 300px;
  border: 0;
  border-radius: 15px;
  box-shadow: 2px 2px 5px rgba(191, 171, 191, 0.5);
`;

const Label = styled.label``;

const Button = styled.button`
  font-size: 30px;
  width: fit-content;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 15px;
  border: 1px;
  background-color: #e884ff;
  &:active {
    transform: scale(1.05);
  }
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: -10px;
`;

const DateInput = styled.input`
  height: 30px;
  border-radius: 15px;
  padding-left: 10px;
  font-size: x-large;
`;

const Warning = styled.p`
  padding: 10px;
  border-radius: 10px;
  font: red 700 30px;
  background-color: #fbbcbc;
`;

const ZodiacInput = styled.input``;


const ProfileForm = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isWarning, setWarning] = useState(false);
  const [file, setFile] = useState(null);
  const [zodiac, setZodiac] = useState("");
  const [city, setCity] = useState("");

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleIsPrivateChange = (event) => {
    setIsPrivate(event.target.value);
  };

  const handleCountryChange = (e) => {
    setCity(e.target.value);
  };

  const handleZodiacChange = (e) => {
    setZodiac(e);
  };
  const handleFormSubmit = async () => {
    store.setLoading(true);
    if (checkField()) {
      setWarning(false);
      const isPrivateBool = isPrivate === "Yes" ? true : false;
      await store.fieldProfile({
        email: store.userInfo.username,
        firstname: firstname,
        lastname: lastname,
        birthday: birthday,
        isPrivate: isPrivateBool,
        city: city,
        zodiacSign: zodiac.toUpperCase()
      });
      await store.uploadAvatar(file);
      if (isDesktop) store.setTutorial(true);
      navigate("/main");
    } else {
      setWarning(true);
    }
    store.setLoading(false);
  };

  const checkField = () => {
    if (
      firstname != "" &&
      lastname != "" &&
      birthday != "" &&
      zodiac != "" &&
      city != "" &&
      file != null
    ) {
      return true;
    } else {
      console.log(
        firstname,
        lastname,
        birthday,
        isPrivate,
        zodiac,
        city,
        file
      );
      return false;

    }
  };

  return (
    <Container>
      {isWarning && <Warning>Please, fill all fields</Warning>}
      <Label>Firstname</Label>
      <Input
        type="text"
        value={firstname}
        onChange={handleFirstnameChange}
        placeholder={store.userInfo.firstName}
      />
      <Label>Lastname</Label>
      <Input
        type="text"
        value={lastname}
        onChange={handleLastnameChange}
        placeholder={store.userInfo.lastName}
      />
      <Label>Birthday</Label>
      <DateInput
        type="date"
        value={birthday}
        onChange={handleBirthdayChange}
        min="1940-01-01"
        max="2006-01-01"
      />
      <Label>City</Label>
      <Input type="text" value={city} onChange={handleCountryChange} />
      <Dropdown
        label="Zodiac"
        options={zodiacOptions}
        onChange={handleZodiacChange}
      />
      {/* <Label>Is private</Label>
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
      </RadioContainer> */}
      <UploadPhoto externalFile={file} externalSetFile={setFile} />
      <Button onClick={handleFormSubmit}>Send</Button>
    </Container>
  );
};

export default observer(ProfileForm);
