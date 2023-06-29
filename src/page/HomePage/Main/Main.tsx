import { FC } from 'react';
import './Main.scss';
import SearchMovies from '../../../components/SearchMovies/SearchMovies';
import { Card } from '../../../components/Card/Card';

interface IMain {
}

export const Main: FC<IMain> = () => {
    return (
        <main>
            <SearchMovies/>
            <Card/>
            <h3>Cтраница (Home) находится в разработке 0_x</h3>
            <h3>Cтраница (Home) находится в разработке 0_x</h3>
        </main>
    )
};
