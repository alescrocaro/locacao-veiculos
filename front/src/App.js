import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider, useToken } from './context/AuthContext';
import RoutesProvider from './routes/routes';


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesProvider>

        </RoutesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}