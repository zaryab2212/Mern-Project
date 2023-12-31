import { isRejected } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup ", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("/auth/check");
    const data = response.json();
    resolve({ data });
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    resolve({ data: "success" });
  });
}

// ********************Login Verfication

export function loginUser(logininfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(logininfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject({ error });
      }
    } catch (error) {
      reject({ error });
    }
  });
}

export function checkUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject({ error });
      }
    } catch (error) {
      reject({ error });
    }
  });
}
