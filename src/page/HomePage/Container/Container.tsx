import { FC } from 'react';
import './Container.scss';
import { Header } from '../../../components/Header/Header';
import { Main } from '../Main/Main';

interface IContainer {
}

export const Container: FC<IContainer> = () => {
    return (
        <div className='container'>
            <Header/>
            <Main/>
        </div>
    )
};
