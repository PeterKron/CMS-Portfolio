import * as React from "react";
import { graphql } from "gatsby";
import Header from "../components/header";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";

const IndexPage = ({ data }) => {
  const home = data.contentfulHomepage;
// console.log("DATA",data);
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
    <div class="h-screen bg-center flex flex-col"
      style={{ backgroundImage: `url(${home.presentationImage.resize.src})` }}
      >
      <Header />
      <main class="flex flex-col items-center m-auto text-center">
        <h1 class="hometextshadow xs:text-7xl text-4xl mb-6">{home.title}</h1>
        <p class="hometextshadow xs:text-2xl xs:mb-40 mb-32">{renderRichText(home.descriptionText, options)}</p>
      </main>
    </div>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;

export const query = graphql`
  query HomeQuery {
    contentfulHomepage {
      title
      descriptionText {
        raw
      }
      presentationImage {
        resize(width: 2000, fit: COVER) {
          width
          height
          src
        }
      }
    }
  }
`;
