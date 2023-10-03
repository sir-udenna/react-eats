// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

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
        localStorage.setItem('token', data.authentication_token);
        setUser(data.user);
        console.log(data)
      })
      .catch((error) => {
        // Handle login error
        console.log(error)
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
