import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../../public/img/logo.png";

const Navigation = (): React.ReactElement => {
  const [open, setOpen] = useState(false);

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
    },
    exit: {
      scaleY: 0,
    },
  };

  return (
    <nav className="navigation">
      <div className="title-container">
        <img
          className="title__logo"
          src={logo}
          alt="black and white building logo"
          height="40"
          width="40"
        />
        <h1 className="title-text">InvestWise</h1>
      </div>
      <ul className="navigation-list">
        <li className="navigation-link__home">
          <NavLink className="navigation-link" to="/home">
            Home
          </NavLink>
        </li>
        <li className="navigation-link__post-open">
          <img
            className="pointer"
            src="/img/pointer.png"
            alt="red pointer"
            width={18}
            height={18}
          />
          <NavLink className="navigation-link" to="/add-property">
            Post your property
          </NavLink>
        </li>
      </ul>
      <div className="hamburguer-menu">
        {!open && (
          <button className="hamburguer" onClick={() => setOpen(true)}>
            <img
              id="menu-toggle"
              src="/img/menu.png"
              alt="menu bars"
              width={28}
              height={28}
            />
          </button>
        )}
        <AnimatePresence>
          {open && (
            <motion.div
              className="open-menu"
              variants={menuVars}
              animate="animate"
              initial="initial"
              exit="exit"
              transition={{ duration: 1, delay: 0.3 }}
              origin-top
            >
              <button onClick={() => setOpen(false)} className="button-cross">
                <img
                  id="menu-toggle"
                  src="/img/cross.png"
                  alt="cross menu"
                  width="32"
                  height="32"
                />
              </button>
              <ul className="hambuerguer-link-list">
                <li className="hambuerguer-link__home">
                  <NavLink
                    className="navigation-link"
                    to="/home"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="hambuerguer-link__post">
                  <img
                    className="pointer"
                    src="/img/pointer.png"
                    alt="red pointer"
                    width={18}
                    height={18}
                  />
                  <NavLink
                    className="hambuerguer-link"
                    to="/add-property"
                    onClick={() => setOpen(false)}
                  >
                    Post your property
                  </NavLink>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
