import { FC } from 'react';
import './Main.scss';
import SearchMovies from '../../../components/SearchMovies/SearchMovies';
import { SearchFilter } from '../../../components/SearchFilter/SearchFilter';

interface IMain {
}

export const Main: FC<IMain> = () => {
    return (
        <main>
            <SearchMovies />
            <SearchFilter/>
            <h3>Cтраница (Settings) находится в разработке 0_x</h3>
            <h3>Cтраница (Settings) находится в разработке 0_x</h3>
        </main>
    )
};
