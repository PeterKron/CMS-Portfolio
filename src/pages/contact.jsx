import React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";

const ProductsPage = ({ data }) => {
  const contact = data.contentfulContactPage;

  return (
    <>
      <Header />
      <main class="flex flex-col p-2 xs:pt-20 pt-16">
        <h1>{contact.title}</h1>
        <p>{contact.email}</p>
        <Link to={contact.github}>GitHub</Link>
        <Link to={contact.linkedin}>Linkedin</Link>
        {/* <p>{contact.github}</p>
        <p>{contact.linkedin}</p> */}
        <img src={contact.portraitImage.resize.src} alt="" width={350} />
      </main>
    </>
  );
};

export default ProductsPage;

export const query = graphql`
  query ContactQuery {
    contentfulContactPage {
      title
      portraitImage {
        resize(width: 350, format: JPG) {
          width
          height
          src
        }
      }
      email
      github
      linkedin
    }
  }
`;
