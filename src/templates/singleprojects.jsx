import React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";

export const Head = ({ data }) => (
  <>
  <title>{data.contentfulProjects.projectName}</title>
  <meta name="description" content={`Here you can check out my project called ${data.contentfulProjects.projectName}`}></meta>
</>
);

const SingleProjectPage = ({ data }) => {
  const project = data.contentfulProjects;

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <b classNameName="font-bold">{text}</b>,
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return (
          <a href={uri} classNameName="underline">
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
      <main className="p-3 xs:pt-20 pt-16 xs:px-10 sm:px-20 md:px-32 lg:px-44 xl:px-52 ap:px-60 2xl:px-80">
        <section className="flex flex-col-reverse items-start md:flex-row md:items-center justify-between">
          <h1 className="xs:text-5xl py-1">{project.projectName}</h1>
          <Link to="/projects">
            <h4 className="xs:text-lg pb-8 md:pb-0">Back to projects</h4>
          </Link>
        </section>

        <span className="text-sm xs:text-base pb-2 pt-2">
          {renderRichText(project.projectDescription, options)}
        </span>

        <section className="flex flex-col items-center">
          <figure className="py-2">
            {project.screenshots.map((image, index) => (
              <img className="w-full" src={image.resize.src} alt="" key={index}/>
            ))}
          </figure>
          <a href={project.projectLink.projectLink} target="_blank" rel="noopener noreferrer">
            <h2 className="py-3">Go to project website</h2>
          </a>
        </section>
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
