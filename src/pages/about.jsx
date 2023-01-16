import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import Header from "../components/header";

export const Head = () => (
  <>
  <title>About Page</title>
  <meta name="description" content="Here is information about my work experiences and educations, but also a little about me"></meta>
  </>
);

const AboutPage = ({ data }) => {
  const about = data.contentfulAboutPage;

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
      [BLOCKS.HEADING_2]: ( children) => {
        return <h2>{children}</h2>;
      },
      [BLOCKS.LIST_ITEM]: ( children) => {
        const listtext = children.content[0].content[0].value
        return <li className="aboutli ml-4 py-2">{listtext}</li>;
      },
    },
  };
  return (
    <>
      <Header />
      <main className="p-2 xs:pt-20 pt-16 flex flex-col items-center">
        <h1 className="text-5xl">{about.title}</h1>
        <span className="py-4 text-center lg:px-20 xl:px-32 2xl:px-72 ">{renderRichText(about.textField, options)}</span>

        <article className="lg:flex lg:px-12">

          <section className="p-3 bg-fuchsia-900 rounded lg:mr-4 lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl lg:pb-4">Education</h2>
            {about.education.map((education, index) => (
              <section className="my-2 p-2 xl:mb-4 border border-solid bg-black rounded" key={index}>
                <h2><b>{education.school}</b></h2>
                <p className="yel-txt">{education.fieldOfStudy}</p>
                <p className="text-sm pb-4 p-date">{education.startDate} - {education.endDate}</p>
                <span>{renderRichText(education.description, options)}</span>
              </section>
            ))}
          </section>

          <section className="my-2 p-3 bg-purple-900 rounded lg:ml-4 lg:my-0 lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl lg:pb-4">Experience</h2>
            {about.experience.map((experience, index) => (
              <section className="my-2 p-2 lg:mb-4 border border-solid bg-black rounded" key={index}>
                <h2><b>{experience.workplace}</b></h2>
                <p className="yel-txt">{experience.fieldOfWork}</p>
                <p className="text-sm pb-4 p-date">{experience.startDate} - {experience.endDate}</p>
                <span>{renderRichText(experience.description, options)}</span>
              </section>
            ))}
          </section>
        </article>

      </main>
    </>
  );
};

export default AboutPage;

export const query = graphql`
  query AboutQuery {
    contentfulAboutPage {
      title
      textField {
        raw
      }
      education {
        school
        fieldOfStudy
        description {
          raw
        }
        startDate(formatString: "MMM Y")
        endDate(formatString: "MMM Y")
      }
      experience {
        workplace
        fieldOfWork
        description {
          raw
        }
        startDate(formatString: "MMM Y")
        endDate(formatString: "MMM Y")
      }
    }
  }
`;
