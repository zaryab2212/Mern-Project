import React from "react";
import { useSelector } from "react-redux";
import { selectLogedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const user = useSelector(selectLogedInUser);
  console.log(user);
  if (!user) {
    return <Navigate replace={true} to="/login"></Navigate>;
  }
  return children;
}

export default Protected;
