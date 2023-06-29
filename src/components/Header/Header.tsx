import React, { FC } from "react";
import "./Header.scss";
import { Logo } from "../Logo/Logo";
import { NavLink } from "react-router-dom";
import { ReactComponent as Home } from "../../assets/icons/Home.svg";
import { ReactComponent as Trends } from "../../assets/icons/Trends.svg";
import { ReactComponent as Favorites } from "../../assets/icons/Favorites.svg";
import { ReactComponent as Settings } from "../../assets/icons/Setting.svg";

import { CustomNavLink } from "../CustomNavLink/CustomNavLink";

interface IHeader {}

export const Header: FC<IHeader> = () => {
  return (
    <>
      <header>
        <nav>
          <div>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>
          <ul className="nav-bar">
              <li className="nav-bar--link">
              <CustomNavLink to="/" content="Home" svg={Home} />
              </li>
              <li className="nav-bar--link">
                <CustomNavLink to="/trends" content="Trends" svg={Trends}  />
              </li>
              <li className="nav-bar--link">
                <CustomNavLink to="/favorites" content="Favorites" svg={Favorites}  />
              </li>
              <li className="nav-bar--link">
                <CustomNavLink to="/settings" content="Settings" svg={Settings}  />
              </li>
          </ul>
        </nav>
      </header>
    </>
  );
};