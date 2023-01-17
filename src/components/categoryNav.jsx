import React, { useState } from "react";
import { Link } from "gatsby";

const CategoryNavigation = ({ data }) => {
  const [toggle, setToggle] = useState(false);
  // TAR EMOT NERPROPPAD DATA GÖR LAGRAR DATAN I EN NY VARIABEL SOM SEDAN MAPPAS UT OCH LEVERAR 
  // DATA SOM RENDERAR CONTENT
  const categories = data;
  
  return (
    <nav
      className={
        // OM TOGGLE ÄR TRUE SÅ SÄTTS FÖRSTA RADEN SOM KLASSNAMN
        toggle
          ? "bottom-br-none w-b-white bg-black flex flex-col self-end relative"
          // OM DEN ÄR FALSK SÅ SÄTTS RADEN NEDANFÖR SOM KLASSNAMN
          : "rounded w-b-white bg-black flex flex-col self-end relative"
      }
    >
      <aside
        className="flex items-center p-1 pointer-cursor"
        // HÄR BESTÄMS VÄRDET PÅ "toggle" OM VI KLICKAR SÅ SÄTTER DEN TVÄRTEMOT DET TIDIGARE VÄRDET
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
          {/* HÄR MAPPAR/LOOPAR VI UT DATAN SOM VI LAGT I DEN NY VARIABELN */}
          {categories.nodes.map((category, index) => (
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
