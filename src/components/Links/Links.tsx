import React, { useState } from 'react';
import './Links.scss';

interface LinkProps {
  content: string;
  linkState?: 'default' | 'active' | 'hover' | 'disabled';
  setLinkState?: React.Dispatch<React.SetStateAction<'default' | 'active' | 'hover' | 'disabled'>>;
  svg?: string;
}

export const Links: React.FC<LinkProps> = ({ linkState, setLinkState, content, svg }) => {
  const [currentLinkState, setCurrentLinkState] = useState<'default' | 'active' | 'hover' | 'disabled'>(
    linkState || 'default'
  );

  const handleMouseEnter = () => {
    if (currentLinkState !== 'disabled') {
      setCurrentLinkState('hover');
    }
  };

  const handleMouseLeave = () => {
    if (currentLinkState !== 'disabled') {
      setCurrentLinkState('default');
    }
  };

  const handleClick = () => {
    if (currentLinkState !== 'disabled') {
      setCurrentLinkState('active');
      if (setLinkState) {
        setLinkState('active');
      }
    }
  };

  return (
    <a className={`link ${currentLinkState}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      {svg && <img className='svg' src={svg} alt={content} />}
      {content}
    </a>
  );
};
