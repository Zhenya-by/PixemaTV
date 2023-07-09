import { FC } from 'react';
import './Main.scss';
import SearchMovies from '../../../components/SearchMovies/SearchMovies';

interface IMain {
}

export const Main: FC<IMain> = () => {
    return (
        <main>
            <SearchMovies />
            <h3>Cтраница (Settings) находится в разработке 0_x</h3>
        </main>
    )
};
