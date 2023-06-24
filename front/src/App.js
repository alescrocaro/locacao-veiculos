import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoutesProvider from './routes/routes';


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesProvider />
      </AuthProvider>
    </BrowserRouter>
  );
}