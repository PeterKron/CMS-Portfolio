import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";

export const Head = ({ data }) => (
    <title>{data.contentfulCategory.categoryName} Projects</title>
  );

const CategoryPage = ({ data }) => {
  const projects = data.contentfulCategory.projects;
  const categories = data.allContentfulCategory;

  const [toggle, setToggle] = useState(false);

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

  const renderProjects = () => {
    return projects.map((project) => (
      <article class="projectcard flex flex-col items-center justify-between border-solid border border-white bg-black rounded w-96 lg:m-4 mb-2 md:m-2 p-3">
        <div>
          <section class="flex items-center justify-between xs:self-stretch">
            <h3 class="py-1 text-2xl xs:text-3xl">{project.projectName}</h3>
            <a
              href={project.projectLink.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4 class="xs:text-lg">Visit site</h4>
            </a>
          </section>
          <section class="flex flex-col items-center justify-between mt-3">
            <Link to={`/projects/${project.slug}`}>
              <img
                class="w-full"
                src={project.screenshots[0].resize.src}
                alt=""
              />
            </Link>
            <p class="text-sm xs:text-base text-center mt-3">
              {renderRichText(project.projectDescription, options)}
            </p>
          </section>
        </div>
        <Link to={`/projects/${project.slug}`}>
          <h4 class="xs:text-xl">Read more</h4>
        </Link>
      </article>
    ));
  };

  return (
    <>
      <Header />
      <main class="p-2 ap:px-18 2xl:px-26 3xl:px-28 flex flex-col xs:pt-20 pt-16">
        <div class="flex justify-between pb-10 xs:justify-around xs:py-6 sm:pb-16">
          <h1 class="xs:text-5xl">{data.contentfulCategory.categoryName}</h1>
          <nav
            class={
              toggle
                ? "bottom-br-none w-b-white bg-black flex flex-col self-end relative"
                : "rounded w-b-white bg-black flex flex-col self-end relative"
            }
          >
            <div
              class="flex items-center p-1 pointer-cursor"
              onClick={() => setToggle(!toggle)}
            >
              <label class="pointer-cursor">Select Categories</label>
              {toggle ? (
                <span class="material-icons">expand_less</span>
              ) : (
                <span class="material-icons">expand_more</span>
              )}
            </div>
            {toggle && (
              <ul class="proj-ul absolute mt-8 z-10">
                {categories.nodes.map((category) => (
                  // skapa en lista med alla unika kategorier
                  <Link to={`/projects/${category.slug}`}>
                    <li
                      class="categoryli p-2 hover:bg-slate-500 bg-slate-700 pointer-cursor"
                      onClick={() => setToggle(!toggle)}
                    >
                      {category.categoryName}
                    </li>
                  </Link>
                ))}
                <Link to={`/projects`}>
                  <li
                    class="categoryli p-2 hover:bg-slate-600 bg-slate-800 pointer-cursor"
                    onClick={() => setToggle(!toggle)}
                  >
                    Show all projects
                  </li>
                </Link>
              </ul>
            )}
          </nav>
        </div>

        <div class="flex flex-wrap justify-center">{renderProjects()}</div>
      </main>
    </>
  );
};

export default CategoryPage;

export const query = graphql`
  query CategoryQuery($slug: String) {
    contentfulCategory(slug: { eq: $slug }) {
      categoryName
      projects {
        projectName
        slug
        projectLink {
          projectLink
        }
        projectDescription {
          raw
        }
        screenshots {
          resize(width: 1350, format: AUTO) {
            width
            height
            src
          }
        }
      }
    }
    allContentfulCategory(sort: { categoryName: ASC }) {
      nodes {
        categoryName
        slug
      }
    }
    #   projectName
    #   projectLink {
    #     projectLink
    #   }
    #   projectDescription {
    #     raw
    #   }
    #   screenshots {
    #     resize(width: 1350, format: JPG) {
    #       width
    #       height
    #       src
    #     }
    #   }
  }
`;
