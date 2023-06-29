import { FC } from 'react';
import './Main.scss';

interface IMain {
}

export const Main: FC<IMain> = () => {
    return (
        <main>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aspernatur harum dolor qui placeat? Voluptatibus quasi culpa
                nulla veniam omnis nobis et maxime, facilis necessitatibus consequatur
                ullam aliquid tempore, repudiandae corrupti?</p>
        </main>
    )
};
