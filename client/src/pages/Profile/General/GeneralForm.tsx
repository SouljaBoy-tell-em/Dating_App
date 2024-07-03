import React, { useContext, useState } from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";

import Context from "../../..";
import UploadPhoto from "../../CreateProfile/UploadPhoto";
import { observer } from "mobx-react-lite";
import Dropdown from "../../CreateProfile/DropDown";
import { zodiacOptions } from "../../../shared/models/profile/ZodiacOptions";
import { UserUpdateField } from "../../../shared/models/profile/GeneralUpdateRequest";

const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: fit-content;
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
  background-color: #c768c0;
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
  background-color: #c768c0;
  font-size: 25px;

  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  &:hover {
    background-color: #c754bf;
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

const TextArea = styled.textarea`
  font-size: 20px;
  width: 300px;
  cursor: default;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  outline: none;
  overflow-y: auto;
  resize: none;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999;
  }
  border: none;
`;

const TextAreaWrapper = styled.div`
  padding: 2px 10px;
  border-radius: 15px;
  border: 1px solid black;
`;

interface GeneralForimInterface {
  setABOpen: (isOpen: boolean) => void;
}
const GeneralForm: React.FC<GeneralForimInterface> = observer(
  ({ setABOpen }) => {
    const { store } = useContext(Context);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [birthday, setBirthday] = useState(store.userInfo.birthDate ?? "");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [zodiac, setZodiac] = useState("");
    const [description, setDescription] = useState("");

    const handleFirstnameChange = (event: any) => {
      setFirstname(event.target.value);
    };

    const handleLastnameChange = (event: any) => {
      setLastname(event.target.value);
    };

    const handleBirthdayChange = (event: any) => {
      setBirthday(event.target.value);
    };

    const handleIsGenderChange = (event: any) => {
      setGender(event.target.value);
    };

    const handleCityChange = (event: any) => {
      setCity(event.target.value);
    };

    const handleDescriptionChange = (event: any) => {
      setDescription(event.target.value);
    };

    const handleZodiacChange = (value: string) => {
      setZodiac(value);
    };

    const handleFormSubmit = async () => {
      const genderBool = gender === "Male" ? "true" : "false";

      await store.fieldProfile({
        email: "ifedorov555@mail.ru",
        firstname: firstname !== "" ? firstname : store.userInfo.firstName,
        lastname: lastname !== "" ? lastname : store.userInfo.lastName,
        birthday: birthday,
        isPrivate: false,
        zodiacSign:
          zodiac !== "" ? zodiac.toUpperCase() : store.userInfo.zodiacSign,
        city: city !== "" ? city : store.userInfo.city,
      });

      await store.updateField({
        email: store.userInfo.username,
        field: gender !== "" ? genderBool : store.userInfo.gender,
        type: UserUpdateField.gender,
      });
      await store.updateField({
        email: store.userInfo.username,
        field: description !== "" ? description : store.userInfo.description,
        type: UserUpdateField.description,
      });
    };

    console.log(store.userInfo.birthDate);

    return (
      <GeneralContainer>
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
            <Label>Country</Label>
            <Input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder={store.userInfo.city}
            />
          </Wrapper>
          <Wrapper>
            <Dropdown
              label="Zodiac"
              options={zodiacOptions}
              onChange={handleZodiacChange}
            />
          </Wrapper>
          <Wrapper>
            <Label>Birthday</Label>
            <DateInput
              type="date"
              value={birthday}
              placeholder={store.userInfo.birthDate}
              onChange={handleBirthdayChange}
              min="1940-01-01"
              max="2006-01-01"
            />
          </Wrapper>

          <Wrapper>
            <Label>Gender</Label>
            <RadioContainer>
              <label>
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={handleIsGenderChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={handleIsGenderChange}
                />
                Female
              </label>
            </RadioContainer>
          </Wrapper>
          <hr />
          <UploadPhoto />
          <hr />
        </Container>
        <Wrapper>
          <Label>Description</Label>
          <TextAreaWrapper>
            <TextArea
              value={description}
              onChange={handleDescriptionChange}
              placeholder={store.userInfo.description}
              rows={4}
            />
          </TextAreaWrapper>
        </Wrapper>

        <SaveButton onClick={handleFormSubmit}>Save</SaveButton>
      </GeneralContainer>
    );
  }
);

export default GeneralForm;
