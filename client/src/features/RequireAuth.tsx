import { useContext, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Context from "..";
import { AccessLevels } from "../shared/accessLevel/accessLevel";

interface RequireAuthInterface {
  children: any;
  accessLevel: AccessLevels;
}

const RequireAuth: React.FC<RequireAuthInterface> = observer(
  ({ children, accessLevel }) => {
    const location = useLocation();
    const { store } = useContext(Context);

    useEffect(() => {
      store.checkAuth();
    });

    console.log(store.accessLevel, accessLevel);

    return store.accessLevel >= accessLevel ? (
      children
    ) : (
      <>
        {store.accessLevel === AccessLevels.LEVEL0 && (
          <Navigate to="/logIn" state={{ from: location }} />
        )}
        {store.accessLevel === AccessLevels.LEVEL1 && (
          <Navigate to="/confirmEmail" state={{ from: location }} />
        )}
        {store.accessLevel === AccessLevels.LEVEL2 && (
          <Navigate to="/createProfile" state={{ from: location }} />
        )}
      </>
    );
  }
);

export { RequireAuth };
