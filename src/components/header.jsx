import React, { useState } from "react";
import { Link } from "gatsby";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header class="bg-black sm:pb-3 fixed w-full z-20">
      <div class="p-2 sm:hidden">
        <div class="flex items-center justify-between xs:p-3">
          <Link to="/">
            <span class="sm:hidden material-icons xs:text-3xl">home</span>
          </Link>
          <h3 class="text-xl">Portfolio</h3>
          {toggle ? (
            <span
              onClick={() => setToggle(!toggle)}
              class="sm:hidden material-icons xs:text-3xl"
            >
              close
            </span>
          ) : (
            <span
              onClick={() => setToggle(!toggle)}
              class="sm:hidden material-icons self-end xs:text-3xl"
            >
              menu
            </span>
          )}
        </div>
        {toggle && (
          <nav class="flex flex-col">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        )}
      </div>

      {/* DESKTOP NAVIGATION */}
      <nav class="desktop-nav hidden sm:flex justify-evenly p-1 px-96">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;

{/* <span class="material-icons">home</span> homeicon */}
{/* <span class="material-icons">location_city</span> projecticon */}
{/* <span class="material-icons">savings</span> abouticon */}
{/* <span class="material-icons">contacts</span> contacticon */}