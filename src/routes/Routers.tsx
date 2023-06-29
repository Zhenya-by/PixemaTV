import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../page/HomePage/Home/Home';
import { Favorites } from '../page/FavoritesPage/Favorites/Favorites';
import { Trends } from '../page/TrendsPage/Trends/Trends';
import { Settings } from '../page/SettingsPage/Settings/Settings';
import SearchMovies from '../components/SearchMovies/SearchMovies';
// import './Routes.scss';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/trends' element={<Trends />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/search' element={<SearchMovies />} />
      {/* Другие маршруты вашего приложения */}
    </Routes>
  );
};
