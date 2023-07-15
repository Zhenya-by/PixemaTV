import React from 'react';
import { Header } from './components/Header/Header';
import './App.scss';
import { Router } from './routes/Routers';
import { useAppContext } from './Contexts/AppContex';

export function App() {
  const { isDarkTheme } = useAppContext();

  return (
    <div className={isDarkTheme() ? 'dark' : 'light'}>
    <Router />
    </div>
  
  );
}
