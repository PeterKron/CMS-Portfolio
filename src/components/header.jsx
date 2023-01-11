import React, { useState } from "react";
import { Link } from "gatsby";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header class="bg-black xs:pb-3 fixed w-full">
      <div class="p-2 xs:hidden">
        <div class="flex items-center justify-between">
          <Link to="/">
            <span class="xs:hidden material-icons">home</span>
          </Link>
          <h3 class="text-xl">Portfolio</h3>
          {toggle ? (
            <span
              onClick={() => setToggle(!toggle)}
              class="xs:hidden material-icons"
            >
              close
            </span>
          ) : (
            <span
              onClick={() => setToggle(!toggle)}
              class="xs:hidden material-icons self-end"
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
      <nav class="desktop-nav hidden xs:flex justify-evenly p-1 px-96">
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