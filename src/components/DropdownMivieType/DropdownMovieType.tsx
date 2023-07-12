import React, { useState } from 'react';
import "./DropdownMovieType.scss";
import { ChevronBtn } from '../../assets/icons';

export type MovieType = 'movie' | 'series' | 'episode' | 'select movie type';

export interface DropdownMovieTypeProps {
  onTypeSelect: (type: MovieType) => void;
}

const DropdownMovieType: React.FC<DropdownMovieTypeProps> = ({ onTypeSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<MovieType>('select movie type');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (type: MovieType) => {
    console.log(`Вы выбрали тип фильма: ${type}`);
    setSelectedType(type);
    setIsOpen(false);
    onTypeSelect(type);
  };

  return (
    <div className='wrap-selected'>
      <button className={`btn-selected ${isOpen ? 'btn-selected__active' : 'btn-selected__disable'}`} onClick={toggleMenu}>
        {selectedType}
        <ChevronBtn className='chevronBtn' />
      </button>
      {isOpen && (
        <div className="selectedUl">
          <ul className={`'selectedUl`}>
            <li
              className="selectedUl__li"
              onClick={() => handleItemClick("movie")}
            >
              movie
            </li>
            <li
              className="selectedUl__li"
              onClick={() => handleItemClick("series")}
            >
              series
            </li>
            <li
              className="selectedUl__li"
              onClick={() => handleItemClick("episode")}
            >
              episode
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMovieType;
