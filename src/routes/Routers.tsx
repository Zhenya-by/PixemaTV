import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../page/HomePage/Home/Home';
import { Favorites } from '../page/FavoritesPage/Favorites/Favorites';
import { Trends } from '../page/TrendsPage/Trends/Trends';
import { Settings } from '../page/SettingsPage/Settings/Settings';
import { MovieFull } from '../page/MoviePage/MovieFull/MovieFull';
import { SearchFilter } from '../components/SearchFilter/SearchFilter';
import { SearchFilters } from '../page/SearchResults/SearchFilters/SearchFilters';
import { SignIn } from '../page/SignInPage/SignIn/SignIn';
import { SignUp } from '../page/SignInPage/SignUp/SignUp';
import { FormSignUp } from '../page/SignInPage/FormSignUp/FormSignUp';
import { FormSignIn } from '../page/SignInPage/FormSignIn/FormSignIn';
import { ResetPassword } from '../page/SignInPage/ResetPassword/ResetPassword';
import SearchMovies from 'components/SearchMovies/SearchMovies';
// import './Routes.scss';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/home' element={<SearchMovies />} />
      <Route path='/trends' element={<Trends />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/search/movies/:id' element={<MovieFull />} />
{/* <Route path="/login" element={<FormSignIn />} /> */}
      <Route path='/search-results' element={<SearchFilters />} /> {/* Добавлен новый маршрут для результатов поиска */}
      <Route path='/movies/:id' element={<MovieFull />} />
      <Route path='/sign-in' element={ <SignIn />} />
      <Route path='/sign-up' element={ <SignUp />} />
      <Route path='/reset-password' element={ <ResetPassword />} />
      <Route path='*' element={<>Ой, тут ничего нет.</>} />
      {/* Другие маршруты вашего приложения */}
    </Routes>
  );
};
