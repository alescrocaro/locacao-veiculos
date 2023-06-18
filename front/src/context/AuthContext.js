import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { api } from '../services/api';
import jwt_decode from 'jwt-decode';

export const TokenContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const recoveredUser = decode(token);

    if (recoveredUser && token) {
      setUser(recoveredUser);
      api.defaults.headers.authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const decode = token => {
    try {
      const data = jwt_decode(token);

      console.log('dentrodecode', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (email, password) => {
	  setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      console.log('response', response);

      const token = response.data.token;

      const loggedUser = decode(token);
      setUser(loggedUser);

      localStorage.setItem('token', JSON.stringify(token));

      api.defaults.headers.authorization = `Bearer ${token}`;

      notification.success({
        message: 'Logado com sucesso',
      })
      navigate('/');
      setLoading(false);
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data.error;
      console.log(errorMessage);
      notification.error({
        message: errorMessage,
      })
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('logout');

    localStorage.removeItem('token');
    api.defaults.headers.authorization = null;

    setUser(null);
    navigate('/login');
  };

  console.log('aqui')

  return (
    <TokenContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  return context;
}