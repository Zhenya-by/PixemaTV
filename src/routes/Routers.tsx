import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../page/HomePage/Home/Home';
import { Favorites } from '../page/FavoritesPage/Favorites/Favorites';
import { Trends } from '../page/TrendsPage/Trends/Trends';
import { Settings } from '../page/SettingsPage/Settings/Settings';
import { MovieFull } from '../page/MoviePage/MovieFull/MovieFull';
import { SearchFilter } from '../components/SearchFilter/SearchFilter';
import { SearchFilters } from '../page/SearchResults/SearchFilters/SearchFilters';
// import './Routes.scss';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/trends' element={<Trends />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/search/movies/:id' element={<MovieFull />} />

      <Route path='/search-results' element={<SearchFilters />} /> {/* Добавлен новый маршрут для результатов поиска */}
      <Route path='/movies/:id' element={<MovieFull />} />
      <Route path='*' element={<>Ой, тут ничего нет.</>} />
      {/* Другие маршруты вашего приложения */}
    </Routes>
  );
};
