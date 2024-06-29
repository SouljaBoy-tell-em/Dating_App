import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import React, { useState } from "react";
import styled from "styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Container = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgb(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 0 2px 2px #bababa;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TopBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.p`
  font-size: 25px;
`;

const CloseButton = styled.button`
  cursor: pointer;
  background: 0;
  border: 0;
  &:active {
    transform: scale(1.1);
  }
`;

export function useAddressBlock() {}

interface AddressBlockInterface {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const AddressBlock: React.FC<AddressBlockInterface> = ({ isOpen, setOpen }) => {
  const [address, setAddress] = useState(null);
  return isOpen ? (
    <Container>
      <Wrapper>
        <TopBlock>
          <Label>Please, choose address</Label>
          <CloseButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <IoIosCloseCircleOutline size={30} color="#696969f" />
          </CloseButton>
        </TopBlock>

        <YMaps
          enterprise={false}
          query={{ apikey: process.env.REACT_APP_YMAP_API_KEY, lang: "en_US" }}
        >
          <Map
            height={400}
            width={400}
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            options={{
              copyrightLogoVisible: false,
              fullscreenZIndex: 1,
              nativeFullscreen: true,
            }}
          >
            <Placemark geometry={[55.751574, 37.573856]} />
          </Map>
        </YMaps>
        <Label>Address:</Label>
        {address && (
          <p style={{ fontSize: "22px", fontWeight: "600" }}>{address}</p>
        )}
      </Wrapper>
    </Container>
  ) : (
    <></>
  );
};

export default AddressBlock;
