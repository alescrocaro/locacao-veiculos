import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { api } from '../services/api';
import jwtDecode from 'jwt-decode';

export const TokenContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const { id } = jwtDecode(token);
      
      const fetchUser = async (id) => {
        return await api.get(`/users/${id}`);
      }
      
      fetchUser(id)
        .then(({ data }) => {
          notification.success({
            message: 'Sessão recuperada'
          })
          console.log('recoveredUser', data)

          setUser(data);
          navigate('/veiculos')
          api.defaults.headers.authorization = `Bearer ${token}`;
        })
        .catch(err => {
          notification.error({
            message: 'Erro recuperando sessão'
          });
          navigate('/login');
          localStorage.setItem('token', '');
        });    
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email, password) => {
	  setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      console.log('response', response);

      const token = response.data.token;

      // const loggedUserId = decode(token);
      // console.log(loggedUserId)
      setUser(response.data.user);

      localStorage.setItem('token', JSON.stringify(token));

      api.defaults.headers.authorization = `Bearer ${token}`;

      notification.success({
        message: 'Logado com sucesso',
      })
      navigate('/veiculos');
      setLoading(false);
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data.error ?? 'Error';
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

  return (
    <TokenContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        setLoading,
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