import React, { useState, useEffect } from 'react';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
//   children: any;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <>
      {isOpen && (
        <div className={`modal ${isAnimating ? 'animate-in' : 'animate-out'}`}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <h2>Filtres</h2>
            
            <h3>Movie name</h3>
            <input className='input-filters' type="text" />
            
            
            <h3>Year</h3>
            <input className='input-filters' type="text" />
            
            
            <h3>Movie type</h3>
            <input className='input-filters' type="text" />
            
          </div>
        </div>
      )}
    </>
  );
};
