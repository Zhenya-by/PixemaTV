import { FC } from 'react';
import './Main.scss';
import SearchMovies from '../../../components/SearchMovies/SearchMovies';
import { Movies } from '../../../components/Movies/Movies';

interface IMain {
}

export const Main: FC<IMain> = () => {
    return (
        <main>
            <SearchMovies />
            <Movies />
        </main>
    )
};
