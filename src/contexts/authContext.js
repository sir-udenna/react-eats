// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { API_BASE_URL } from '../api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  console.log(user)

  const login = (userData) => {
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

        sessionStorage.setItem('token', data.token);
        setUser(data.user);
        console.log(data)
      })
      .catch((error) => {
        // Handle login error
        console.log(error)
      });
  };

  const logout = () => {
    fetch(`${API_BASE_URL}/users/sign_out`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then(() => {
        sessionStorage.removeItem('token');
        setUser(null);
        router.push('/login');
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
