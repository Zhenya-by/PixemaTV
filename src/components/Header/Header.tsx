import { FC } from "react";
import "./Header.scss";
import { Logo } from "../Logo/Logo";
import { Link } from "react-router-dom";
import { Links } from "../Links/Links";
import Home from "../../assets/icons/Home.svg";
import Trends from "../../assets/icons/Trends.svg";
import Favorites from "../../assets/icons/Favorites.svg";
import Settings from "../../assets/icons/Setting.svg";

interface IHeader {}

export const Header: FC<IHeader> = () => {
  return (
    <>
        <header>
          <nav>
            <div>
              <Link to="/main">
                <Logo />
              </Link>
            </div>
            <ul className="nav-bar">
              <Link to="/main">
                <li className="nav-bar--link">
                  {/* <img src={Home} alt="Home" /> */}
                  <Links svg={Home} content="Home" linkState="active" />
                </li>
              </Link>
              <Link to="/trends">
                <li className="nav-bar--link">
                  <Links svg={Trends} content="Trends" linkState="default" />
                </li>
              </Link>
              <Link to="/favorites">
                <li className="nav-bar--link">
                  <Links
                    svg={Favorites}
                    content="Favorites"
                    linkState="default"
                  />
                </li>
              </Link>
              <Link to="/settings">
                <li className="nav-bar--link">
                  <Links
                    svg={Settings}
                    content="Settings"
                    linkState="default"
                  />
                </li>
              </Link>
            </ul>
          </nav>
        </header>
        {/* <Main /> */}
    </>
  );
};
