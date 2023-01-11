import React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";

const SingleProjectPage = ({ data }) => {
  const project = data.contentfulProjects;
  // console.log("PROJECT", project);

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
      <main class="p-2 xs:px-56 xs:pt-20 pt-16">
        <div class="flex items-center justify-between">
          <h2>{project.projectName}</h2>
          <Link to="/projects">
            <h4 class="xs:text-lg">Back to projects</h4>
          </Link>
        </div>
        <p class="text-sm xs:text-base">
          {renderRichText(project.projectDescription, options)}
        </p>

        <div class="xs:hidden flex justify-start items-start">
          <div>
            {project.screenshots.map((image) => (
              <img src={image.resize.src} alt="" width={300} />
            ))}
          </div>
          <Link to={project.projectLink.projectLink}>
            <h4 class="projectlink">Go to project website</h4>
          </Link>
        </div>

        <div class="hidden xs:flex xs:flex-col">
          <div>
            {project.screenshots.map((image) => (
              <img src={image.resize.src} alt="" width={300} />
            ))}
          </div>
          <Link to={project.projectLink.projectLink}>
            <h2>Go to project website</h2>
          </Link>
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
        resize(width: 300, format: JPG) {
          width
          height
          src
        }
      }
    }
  }
`;
