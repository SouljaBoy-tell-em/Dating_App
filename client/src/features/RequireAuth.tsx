import { useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Context from "..";

const RequireAuth = observer(({ children }: any) => {

  const location = useLocation();
  const { store } = useContext(Context);

  useEffect(()=>{
    store.checkAuth();
  });
  
  return (
    store.isAuth ? children : <Navigate to="/logIn" state={{ from: location }} />
  );

});

export { RequireAuth };
