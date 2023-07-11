import React, { useState, MouseEvent } from 'react';
import "./DropdownMovieType.scss"
import { ChevronBtn } from '../../assets/icons';
const DropdownMovieType: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState('');
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item: string) => {
        console.log(`Вы выбрали пункт меню: ${item}`);
        setSelectedItem(item);
        setIsOpen(false); // Закрыть меню после выбора пункта
    };

    return (
        <div className='wrap-selected'>
            <button className={`btn-selected ${isOpen ? 'btn-selected__active' : 'btn-selected__disable'}`} onClick={toggleMenu}>
                {selectedItem ? selectedItem : 'movie'}
                <ChevronBtn className='chevronBtn' />
            </button>
            {isOpen && (
                <div className='selectedUl'>
                    <ul className={`'selectedUl`}>
                        <li className='selectedUl__li' onClick={() => handleItemClick('movie')}>movie</li>
                        <li className='selectedUl__li' onClick={() => handleItemClick('series')}>series</li>
                        <li className='selectedUl__li' onClick={() => handleItemClick('episode')}>episode</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMovieType;