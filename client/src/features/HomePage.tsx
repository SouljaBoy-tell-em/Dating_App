import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import Context from "..";

const HomePage = observer(() => {

  const { store } = useContext(Context);

  return <Navigate to={`/user/${store.userInfo.username}`}/>;
});

export default HomePage;
