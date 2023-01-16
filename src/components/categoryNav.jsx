import React, { useState } from "react";
import { Link } from "gatsby";

const CategoryNavigation = ({ data }) => {
  const [toggle, setToggle] = useState(false);
  const categories = data;

  return (
    <nav
      className={
        toggle
          ? "bottom-br-none w-b-white bg-black flex flex-col self-end relative"
          : "rounded w-b-white bg-black flex flex-col self-end relative"
      }
    >
      <aside
        className="flex items-center p-1 pointer-cursor"
        onClick={() => setToggle(!toggle)}
        onKeyDown={() => setToggle(!toggle)}
      >
        <h4 className="yel-txt pointer-cursor">Select Categories</h4>
        {toggle ? (
          <span className="material-icons">expand_less</span>
        ) : (
          <span className="material-icons">expand_more</span>
        )}
      </aside>
      {toggle && (
        <ul className="proj-ul absolute mt-8 z-10">
          {categories.nodes.map((category, index) => (
            // skapa en lista med alla unika kategorier
            <Link to={`/projects/${category.slug}`} key={index}>
              <li
                className="categoryli p-2 hover:bg-slate-500 bg-slate-700 pointer-cursor"
                onClick={() => setToggle(!toggle)}
                onKeyDown={() => setToggle(!toggle)}
              >
                {category.categoryName}
              </li>
            </Link>
          ))}
          <Link to={`/projects`}>
            <li
              className="categoryli p-2 hover:bg-slate-600 bg-slate-800 pointer-cursor"
              onClick={() => setToggle(!toggle)}
              onKeyDown={() => setToggle(!toggle)}
            >
              Show all projects
            </li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default CategoryNavigation;
