import React, { useState } from "react";
import { Link } from "gatsby";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="bg-black sm:pb-3 fixed w-full z-20">
      <div className="p-2 sm:hidden">
        <div className="flex items-center justify-between xs:p-3">
          <Link to="/">
            <span className="sm:hidden material-icons xs:text-3xl">home</span>
          </Link>
          <h3 className="yel-txt text-xl">Portfolio</h3>
          {toggle ? (
            <span
              className="sm:hidden material-icons xs:text-3xl"
              onClick={() => setToggle(!toggle)}
              onKeyDown={() => setToggle(!toggle)}
            >
              close
            </span>
          ) : (
            <span
              className="sm:hidden material-icons self-end xs:text-3xl"
              onClick={() => setToggle(!toggle)}
              onKeyDown={() => setToggle(!toggle)}
            >
              menu
            </span>
          )}
        </div>
        {toggle && (
          <nav className="flex flex-col">
            <Link className="yel-txt" to="/">
              Home
            </Link>
            <Link className="yel-txt" to="/projects">
              Projects
            </Link>
            <Link className="yel-txt" to="/about">
              About
            </Link>
            <Link className="yel-txt" to="/contact">
              Contact
            </Link>
          </nav>
        )}
      </div>

      {/* DESKTOP NAVIGATION */}
      <nav className="desktop-nav hidden sm:flex justify-evenly p-1 px-96">
        <Link className="yel-txt" to="/">
          Home
        </Link>
        <Link className="yel-txt" to="/projects">
          Projects
        </Link>
        <Link className="yel-txt" to="/about">
          About
        </Link>
        <Link className="yel-txt" to="/contact">
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
