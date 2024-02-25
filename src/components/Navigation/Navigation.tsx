import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = (): React.ReactElement => {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li className="navigation-link__home">
          <NavLink className="navigation-link" to="/home">
            Home
          </NavLink>
        </li>
        <li className="navigation-link__post">
          <img
            className="pointer"
            src="/img/pointer.png"
            alt="red pointer"
            width={18}
            height={18}
          />
          <NavLink className="navigation-link" to="/addproperty">
            Post your property
          </NavLink>
        </li>
      </ul>
      <div className="hamburguer">
        <img
          id="menu-toggle"
          src="/img/bars-solid.svg"
          alt="menu bars"
          width={28}
          height={28}
        />
      </div>
    </nav>
  );
};

export default Navigation;
