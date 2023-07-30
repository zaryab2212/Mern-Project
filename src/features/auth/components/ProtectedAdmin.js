import React from "react";
import { useSelector } from "react-redux";
import { selectLogedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({chlidren}) => {
  const user = useSelector(selectLogedInUser);
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  if (user && user.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  } 
   
  return chlidren

  // {user && user.role === admin}
};

export default ProtectedAdmin;
