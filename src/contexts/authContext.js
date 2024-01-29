// "use client"
import React, { createContext, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure, logoutSuccess } from '../redux/actions/authActions';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const testValue = useSelector(state => state.auth.user);
  // console.log(testValue)

  const confirmAuthenticationToken = () => {
    if (data.authentication_token) {
      // router.push('/home')
      console.log(localStorage.getItem("token"))
    } else {
      console.log("No auth token")
    }
  }

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
        localStorage.setItem("token", data.authentication_token)
        dispatch(loginSuccess(data.username, data.authentication_token))
        console.log(testValue)

      })
      .catch((error) => {
        console.log("Login error.. LoginAuth:" ,error)
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
        // router.push('/login');
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
