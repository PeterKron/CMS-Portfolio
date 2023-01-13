import * as React from "react";
import { graphql } from "gatsby";
import Header from "../components/header";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";

export const Head = () => <title>Home Page</title>;

const IndexPage = ({ data }) => {
  const home = data.contentfulHomepage;
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
    <div class="h-screen bg-[top_left_-75rem] md:bg-[top_left_-40rem] xl:bg-[top_left_-20rem] 2xl:bg-[top] flex flex-col"
      style={{ backgroundImage: `url(${home.presentationImage.resize.src})` }}
      >
      <Header />
      <main class="flex flex-col items-center m-auto text-center">
        <h1 class="hometextshadow text-3xl xs:text-5xl sm:text-6xl xl:text-7xl mb-6 px-2">{home.title}</h1>
        <p class="hometextshadow text-sm xs:text-base sm:text-lg xl:text-xl ap:text-2xl xs:mb-40 mb-32 px-4">{renderRichText(home.descriptionText, options)}</p>
      </main>
    </div>
  );
};

export default IndexPage;

export const query = graphql`
  query HomeQuery {
    contentfulHomepage {
      title
      descriptionText {
        raw
      }
      presentationImage {
        resize(width: 2000, fit: FILL) {
          width
          height
          src
        }
      }
    }
  }
`;
