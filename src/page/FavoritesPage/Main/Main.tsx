import { FC } from 'react';
import './Main.scss';
import SearchMovies from '../../../components/SearchMovies/SearchMovies';
import { Favorites } from '../Favorites/Favorites';
import { Card } from '../../../components/Card/Card';
import { FavoriteMovie } from '../../../components/FavoriteMovie/FavoriteMovie';

interface IMain {
}

export const Main: FC<IMain> = () => {
    return (
        <main>
            <SearchMovies />
            <FavoriteMovie/>
        </main>
    )
};
