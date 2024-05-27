import React, { useState } from "react";

import styled from "styled-components";

import ProfileForm from "../../CreateProfile/ProfileForm";
import ProfilePhoto from "../../CreateProfile/ProfilePhoto";

import GeneralForm from "./GeneralForm";
import GeneralPhoto from "./GeneralPhoto";
import AddressBlock from "./AddressBlock";

const Container = styled.div`
  width: calc(100% - 350px);
  display: flex;
  justify-content: left;
  min-height: 720px;
`;

const Wrapper = styled.div`
  width: min-content;
  display: flex;
  align-items: top;
  gap: 50px;
  margin-left: 80px;
`;

const PhotoWrapper = styled.div`
  height: min-content;
  margin-top: 20px;
`;
const General = () => {

  const [isAddressBlockOpen, setAddressBlockOpen] = useState(false);


  return (
    <Container>
      <Wrapper>
        <GeneralForm setABOpen={setAddressBlockOpen} />
        <PhotoWrapper>
          <GeneralPhoto />
        </PhotoWrapper>
      </Wrapper>
      <AddressBlock isOpen={isAddressBlockOpen} setOpen={setAddressBlockOpen}/>
    </Container>
  );
};

export default General;
