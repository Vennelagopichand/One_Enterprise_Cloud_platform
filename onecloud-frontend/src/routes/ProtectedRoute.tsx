import {
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";

import {
  ROUTES
} from "../constants/routes";

import {
  useAuth
} from "../hooks/useAuth";


function ProtectedRoute() {

  const location =
    useLocation();


  const {
    isAuthenticated
  } = useAuth();


  if (!isAuthenticated) {

    return (

      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{
          from: location
        }}
      />

    );
  }


  return <Outlet />;
}


export default ProtectedRoute;