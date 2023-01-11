import React from "react";
import { Link, graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import Header from "../components/header";

const ProductsPage = ({ data }) => {
  const about = data.contentfulAboutPage;
  console.log("ABOUT", about);

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
      <main class="p-2 xs:pt-20 pt-16">
        <h1>{about.title}</h1>
        <div>{renderRichText(about.textField, options)}</div>
        <div>
          <h2>Education</h2>
          {about.education.map((hert) => (
            <>
              <p>
                <b>{hert.school}</b>
              </p>
              <p>
                {hert.startDate} - {hert.endDate}
              </p>
              <p>{hert.fieldOfStudy}</p>
              <div>{renderRichText(hert.description, options)}</div>
            </>
          ))}
        </div>
        <div>
          <h2>Experience</h2>
          {about.experience.map((hert) => (
            <>
              <p>
                <b>{hert.workplace}</b>
              </p>
              <p>
                {hert.startDate} - {hert.endDate}
              </p>
              <p>{hert.fieldOfWork}</p>
              <div>{renderRichText(hert.description, options)}</div>
            </>
          ))}
        </div>
      </main>
    </>
  );
};

export default ProductsPage;

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
