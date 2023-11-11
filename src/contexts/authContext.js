"use client"
// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, logoutSuccess } from '../redux/actions/authActions';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const dispatch = useDispatch();

  const loginAuth = (userData) => {
    fetch("http://localhost:3000/users/sign_in", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data auth context") // debugging
        dispatch(loginSuccess(data.username, data.authentication_token))
      })
      .catch((error) => {
        console.log(error, "in login")
        dispatch(loginFailure()) 
      });
  };

  const logout = () => {
    fetch("http://localhost:3000/users/sign_out", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(() => {
        dispatch(logoutSuccess());
        router.push('/login');
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const value = {
    loginAuth,
    logout,
  };

  return (
    <AuthContext.Provider value={{ loginAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
