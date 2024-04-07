import { useContext, useEffect } from "react";
import { Navigate } from "react-router";

import Context from "../";

export default function PrivateRoute({ children }) {
  const { store } = useContext(Context);

  store.checkAuth();
  
  return store.isAuth ? <>{children}</> : <Navigate to="/login"  />;
}
