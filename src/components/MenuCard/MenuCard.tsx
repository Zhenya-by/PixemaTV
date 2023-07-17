import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconButton } from "../IconButton/IconButton";
import { Close, Favorites, Home, Menu, Setting, Trends } from "assets/icons";
import "./MenuCard.scss";

interface CustomNavLinkProps {
  to: string;
  content: string;
  svg?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  to,
  content,
  svg: SvgIcon,
  onClick,
}) => {
  const [currentLinkState, setCurrentLinkState] = useState<
    "default" | "active" | "hover" | "disabled"
  >("default");

  const handleMouseEnter = () => {
    if (currentLinkState !== "disabled") {
      setCurrentLinkState("hover");
    }
  };

  const handleMouseLeave = () => {
    if (currentLinkState !== "disabled") {
      setCurrentLinkState("default");
    }
  };

  const handleClick = () => {
    if (currentLinkState !== "disabled") {
      setCurrentLinkState("active");
    }
    onClick?.();
  };

  return (
    <NavLink
      className={`link ${currentLinkState}`}
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {SvgIcon && (
        <SvgIcon
          className="svg"
          fill={currentLinkState !== "default" ? "currentColor" : undefined}
        />
      )}
      {content}
    </NavLink>
  );
};

export const MenuCard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOption = (typeOption: string) => {
    setIsMenuOpen(false);
    if (typeOption === "Edit") console.log("edit");
    if (typeOption === "Delete") console.log("Delete");
  };

  return (
    <div className={`menu ${isMenuOpen ? "open" : ""}`}>
      <IconButton onClick={handleToggleClick}>
        {isMenuOpen ? <Close /> : <Menu />}
      </IconButton>
      <div
        className="menu__overlay"
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div className="menu__content">
        {isMenuOpen && (
          <ul className="menu__items">
            <li className="menu__item">
              <CustomNavLink
                to="/"
                content="Home"
                svg={Home}
                onClick={() => setIsMenuOpen(false)}
              />
            </li>
            <li className="menu__item">
              <CustomNavLink
                to="/trends"
                content="Trends"
                svg={Trends}
                onClick={() => setIsMenuOpen(false)}
              />
            </li>
            <li className="menu__item">
              <CustomNavLink
                to="/favorites"
                content="Favorites"
                svg={Favorites}
                onClick={() => setIsMenuOpen(false)}
              />
            </li>
            <li className="menu__item">
              <CustomNavLink
                to="/settings"
                content="Settings"
                svg={Setting}
                onClick={() => setIsMenuOpen(false)}
              />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
