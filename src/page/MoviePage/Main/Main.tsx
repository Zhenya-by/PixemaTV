import { FC } from 'react';
import './Main.scss';
import SearchMovies from '../../../components/SearchMovies/SearchMovies';
import { Movie } from '../../../components/Movie/Movie';

interface IMain {
}

export const Main: FC<IMain> = () => {
    return (
        <main>
            <SearchMovies />
            <Movie />
        </main>
    )
};
