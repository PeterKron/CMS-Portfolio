import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";

const ProjectsPage = ({ data }) => {
  const projects = data.allContentfulProjects;
  const categories = data.allContentfulCategory;
  console.log("PROJEKTEN", projects);

  const [currentCategory, setCurrentCategory] = useState("");
  const [toggle, setToggle] = useState(false);

  const renderProjects = () => {
    if (currentCategory !== "") {
      return projects.nodes.map((project) => {
        if (project.category[0].categoryName === currentCategory) {
          return (
            <article class="flex flex-col items-center justify-between border-solid border border-white bg-black rounded w-96 lg:m-4  mb-2 md:m-2 p-3">
            <div>
              <section class="flex items-center justify-between xs:self-stretch">
                <h3 class="py-1 text-2xl xs:text-3xl">{project.projectName}</h3>
                <Link to={project.projectLink.projectLink}>
                  <h4 class="xs:text-lg">Go to project website</h4>
                </Link>
              </section>
              <section class="flex flex-col items-center justify-between mt-3">
                <img
                  class="w-full"
                  src={project.screenshots[0].resize.src}
                  alt=""
                />
                <p class="text-sm xs:text-base text-center mt-3">
                  {renderRichText(project.projectDescription, options)}
                </p>
              </section>
            </div>
            <Link to={`/project/${project.slug}`}>
              <h4 class="xs:text-xl">Read more</h4>
            </Link>
          </article>
          );
        }
      });
    } else {
      return projects.nodes.map((project) => (
        <article class="flex flex-col items-center justify-between border-solid border border-white bg-black rounded w-96 lg:m-4  mb-2 md:m-2 p-3">
          <div>
            <section class="flex items-center justify-between xs:self-stretch">
              <h3 class="py-1 text-2xl xs:text-3xl">{project.projectName}</h3>
              <Link to={project.projectLink.projectLink}>
                <h4 class="xs:text-lg">Go to project website</h4>
              </Link>
            </section>
            <section class="flex flex-col items-center justify-between mt-3">
              <img
                class="w-full"
                src={project.screenshots[0].resize.src}
                alt=""
              />
              <p class="text-sm xs:text-base text-center mt-3">
                {renderRichText(project.projectDescription, options)}
              </p>
            </section>
          </div>
          <Link to={`/project/${project.slug}`}>
            <h4 class="xs:text-xl">Read more</h4>
          </Link>
        </article>
      ));
    }
  };

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <b className="font-bold">{text}</b>,
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return (
          <a href={uri} className="underline">
            {children}
          </a>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return <h2>{children}</h2>;
      },
    },
  };

  return (
    <>
      <Header />
      <main class="p-2 ap:px-18 2xl:px-26 3xl:px-28 flex flex-col xs:pt-20 pt-16">
        <div class="flex justify-between pb-10 xs:justify-around xs:py-6 sm:pb-16">
          <h1 class="xs:text-5xl">My Projects</h1>
          <nav class="bg-black border-solid border border-white rounded flex flex-col self-end">
            <div class="flex items-center p-1">
              <label>Select Categories</label>
              {toggle ? (
                <span
                  onClick={() => setToggle(!toggle)}
                  class="material-icons pointer-cursor"
                >
                  expand_less
                </span>
              ) : (
                <span
                  onClick={() => setToggle(!toggle)}
                  class="material-icons pointer-cursor"
                >
                  expand_more
                </span>
              )}
            </div>
            {toggle && (
              <ul>
                {categories.nodes.map((category) => (
                  // skapa en lista med alla unika kategorier
                  <li
                    class="categoryli p-1 hover:bg-slate-500 bg-slate-700 pointer-cursor"
                    onClick={() => (
                      setCurrentCategory(category.categoryName),
                      setToggle(!toggle)
                    )}
                  >
                    {category.categoryName}
                  </li>
                ))}
                <li
                  class="categoryli p-1 hover:bg-slate-600 bg-slate-800 pointer-cursor"
                  onClick={() => (setCurrentCategory(""), setToggle(!toggle))}
                >
                  Show all projects
                </li>
              </ul>
            )}
          </nav>
        </div>
        <div class="flex flex-wrap justify-center">{renderProjects()}</div>
      </main>
    </>
  );
};

export default ProjectsPage;

export const query = graphql`
  query AllProjectsQuery {
    allContentfulProjects {
      nodes {
        projectName
        slug
        category {
          categoryName
        }
        projectLink {
          projectLink
        }
        projectDescription {
          raw
        }
        screenshots {
          resize(width: 1350, format: JPG) {
            width
            height
            src
          }
        }
      }
    }
    allContentfulCategory {
      nodes {
        categoryName
      }
    }
  }
`;
