import React, { FC, useContext, useState } from "react";

import { observer } from "mobx-react-lite";

import Context from "..";

const LoginForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { store } = useContext(Context);

  return (
    <div>
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        type="text"
        placeholder="username"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        type="password"
        placeholder="password"
      />
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        type="text"
        placeholder="email"
      />
      <button onClick={() => store.login(username, password)}>Логин</button>
      <button onClick={() => store.registration(username, password, email)}>
        Регистрация
      </button>
    </div>
  );
};

export default observer(LoginForm);
