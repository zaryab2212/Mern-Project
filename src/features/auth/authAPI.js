import { isRejected } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// ********************Login Verfication

export function checkUser(logininfo) {
  return new Promise(async (resolve, reject) => {
    const email = logininfo.email;
    const password = logininfo.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);

    const data = await response.json();
    if (data.length) {
      if ( password ===  data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "wronge credentials" });
      }
    } else {
      reject({ message: "user not found" });
    }
  });
}

