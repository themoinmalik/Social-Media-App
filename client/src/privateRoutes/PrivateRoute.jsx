import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const user = localStorage.getItem("userToken") == null ? false : true;;
  return <div>{user ? <Outlet /> : <Navigate to="/" />};</div>;
}

export default PrivateRoute;
