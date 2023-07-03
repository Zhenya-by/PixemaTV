import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./CustomNavLink.scss";

interface CustomNavLinkProps {
  to: string;
  content: string;
  svg?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, content, svg: SvgIcon }) => {
  const [currentLinkState, setCurrentLinkState] = useState<'default' | 'active' | 'hover' | 'disabled'>('default');

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
    }
  };

  return (
    <NavLink
      className={`link ${currentLinkState}`}
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {SvgIcon && <SvgIcon className="svg" fill={currentLinkState !== 'default' ? 'currentColor' : undefined} />}
      {content}
    </NavLink>
  );
};
