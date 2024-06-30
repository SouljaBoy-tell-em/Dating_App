import styled from "styled-components";

import Header from "../Main/Header";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Context from "../..";
import { observer } from "mobx-react-lite";
import { AccessLevels } from "../../shared/accessLevel/accessLevel";

const Container = styled.div`
  height: 100vh;
  min-height: 1024px;
  max-height: 1200px;
  width: 100%;
  min-width: 1440px;
  max-width: 2400px;

  background-color: #ffffff;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputBlock = styled.div`
  height: min-content;
  width: min-content;
  padding: 20px;
  border-radius: 15px;
  background-color: #f1e2ff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1224px) {
    width: 90%;
    padding: 10px;
  }
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 40px;
`;

const Input = styled.input`
  font-weight: 400;
  font-size: 25px;
  padding-left: 15px;
  width: 617px;
  height: 72px;
  border-radius: 15px;
  border: 0;
  @media (max-width: 1224px) {
    width: 90%;
  }
`;
const ConfirmButtonBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;
const ConfirmButton = styled.button`
  cursor: pointer;
  width: fit-content;
  padding: 14px;
  height: 65px;
  border-radius: 18px;
  background-color: #baa6b8;
  border: 0;
  &:active {
    transform: scale(1.05);
  }
  font-size: 35px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 15px;
`;

const Codelive = styled.p`
  font-size: 30px;
  font-weight: 500;
  @media (max-width: 1224px) {
    display: none;
  }
`;

const RequestNewCodeButton = styled.button`
  cursor: pointer;
  width: fit-content;
  padding: 14px;
  height: 65px;
  border-radius: 18px;
  background-color: #9400de;
  border: 0;
  &:active {
    transform: scale(1.05);
  }
  font-size: 35px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 15px;
`;

const MobileConfirmEmail = styled.div`
  width: 100%;
  height: 100vh;
`;

const DesktopStyles = {
  height: "100vh",
  minHeight: "1024px",
  maxHeight: "1200px",
  width: "100%",
  minWidth: "1440px",
  maxWidth: "2400px",
  backgroundColor: "#ffffff",
  position: "relative",
  marginLeft: "auto",
  marginRight: "auto",
};

const MobileStyles = {
  width: "100%",
  height: "100vh",
};

const ConfirmEmail = observer(() => {
  const [confirmCode, setConfirmCode] = useState(null);
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const handleConfirm = async () => {
    const regex = /^[0-9]{6}$/;

    if (!regex.test(confirmCode)) {
      window.alert("Неверный код подтверждения. Пожалуйста, введите 6 цифр.");
      return;
    }

    const e = await store.confirmEmail(confirmCode);

    if (store.isConfirmEmail === false) {
      window.alert(
        e?.response?.data ? e?.response?.data : "Проблема с подтвержением"
      );
    } else {
      window.alert("Почта успешно подтверждена!");
      navigate("/createProfile");
    }
  };

  const handleRequestNewCode = async () => {
    const e = await store.requestNewCode();
    if (e)
      window.alert(
        e?.response?.data
          ? e?.response?.data
          : "Проблема с получением нового кода"
      );
  };

  return store.accessLevel === AccessLevels.LEVEL1 ? (
    <div style={isDesktop ? DesktopStyles : MobileStyles}>
      {isDesktop && <Header color="#f1e2ff" />}
      <Wrapper>
        <InputBlock>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
          >
            <Label>Сonfirmation code</Label>
            <Input
              placeholder="######"
              onChange={(e) => {
                setConfirmCode(e.target.value);
              }}
            />
            <ConfirmButtonBlock>
              <ConfirmButton>Confirm</ConfirmButton>
              <Codelive>Codelive is 10 min</Codelive>
            </ConfirmButtonBlock>
          </form>

          <RequestNewCodeButton
            onClick={() => {
              handleRequestNewCode();
            }}
          >
            Request new code
          </RequestNewCodeButton>
        </InputBlock>
      </Wrapper>
    </div>
  ) : (
    <Navigate to="/createProfile" />
  );
});

export default ConfirmEmail;
