import React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";

export const Head = ({ data }) => (
  <title>{data.contentfulProjects.projectName}</title>
);

const SingleProjectPage = ({ data }) => {
  const project = data.contentfulProjects;

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
      <main class="p-3 xs:pt-20 pt-16 xs:px-10 sm:px-20 md:px-32 lg:px-44 xl:px-52 ap:px-60 2xl:px-80">
        <div class="flex flex-col-reverse items-start md:flex-row md:items-center justify-between">
          <h1 class="xs:text-5xl py-1">{project.projectName}</h1>
          <Link to="/projects">
            <h4 class="xs:text-lg pb-8 md:pb-0">Back to projects</h4>
          </Link>
        </div>

        <p class="text-sm xs:text-base pb-2 pt-2">
          {renderRichText(project.projectDescription, options)}
        </p>

        <div class="flex flex-col items-center">
          <div class="py-2">
            {project.screenshots.map((image) => (
              <img class="w-full" src={image.resize.src} alt="" />
            ))}
          </div>
          <a href={project.projectLink.projectLink} target="_blank" rel="noopener noreferrer">
            <h2 class="py-3">Go to project website</h2>
          </a>
        </div>
      </main>
    </>
  );
};

export default SingleProjectPage;

export const query = graphql`
  query SingleProjectQuery($slug: String) {
    contentfulProjects(slug: { eq: $slug }) {
      projectName
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
`;
