import React from 'react';
import ReactDOM from 'react-dom/client';
import "./services/master.css";
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from "./services/AuthContext";

const queryClient=new QueryClient;
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
     <App />
      </AuthProvider>
     </QueryClientProvider>
  </React.StrictMode>
);
