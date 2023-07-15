import { FC } from 'react';
import './Container.scss';
import { Header } from '../../../components/Header/Header';
import { Main } from '../Main/Main';
import { useAppContext } from '../../../Contexts/AppContex';

interface IContainer {
}

export const Container: FC<IContainer> = () => {
    const { isDarkTheme } = useAppContext();
    return (
        <div className={isDarkTheme() ? 'dark' : 'light'}>
            <div className='container'>

                <Header />
                <Main />
            </div>
        </div>
    )
};
