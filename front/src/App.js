import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoutesProvider from './routes/routes';
import { Provider as SupabaseProvider } from 'react-supabase'
import supabaseClient from './supabase.js';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SupabaseProvider value={supabaseClient}>
          <RoutesProvider />
        </SupabaseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}