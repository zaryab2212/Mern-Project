import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

export  const ProtectedAdmin = ({children}) => {
 
  const userinfo = useSelector(selectUserInfo)
  if (!userinfo) {
    return <Navigate to="/login" replace={true} />
  }
  if (userinfo && userinfo.role !== "admin") {
    return <Navigate to="/" replace={true} />
  }
  return children
   

 
}


