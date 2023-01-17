import React from "react";
import { Link } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";


const RenderProjects = ({data}) => {
    // TAR EMOT NERPROPPAD DATA GÖR LAGRAR DATAN I EN NY VARIABEL SOM SEDAN MAPPAS UT OCH LEVERAR 
    // DATA SOM RENDERAR CONTENT
    const projects = data
    
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

    return projects.map((project, index) => (
      <article key={index} className="projectcard flex flex-col items-center justify-between border-solid border border-white bg-black rounded w-96 lg:m-4 mb-2 md:m-2 p-3">
        <div>
          <section className="flex items-center justify-between xs:self-stretch">
            <h3 className="py-1 text-2xl xs:text-3xl">{project.projectName}</h3>
            <a
              href={project.projectLink.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4 className="xs:text-lg">Visit site</h4>
            </a>
          </section>
          <section className="flex flex-col items-center justify-between mt-3">
            <Link to={`/projects/${project.slug}`}>
              <img
                className="w-full"
                src={project.screenshots[0].resize.src}
                alt=""
              />
            </Link>
            <span className="text-sm xs:text-base text-center mt-3">
              {renderRichText(project.projectDescription, options)}
            </span>
          </section>
        </div>
        <Link to={`/projects/${project.slug}`}>
          <h4 className="xs:text-xl">Read more</h4>
        </Link>
      </article>
    ));
  };

  export default RenderProjects;