import React from "react";
import { Link, graphql } from "gatsby";
import Header from "../components/header";

export const Head = () => <title>Contact Page</title>;

const ContactPage = ({ data }) => {
  const contact = data.contentfulContactPage;

  return (
    <>
      <Header />
      <main class="flex flex-col p-2 xs:pt-20 pt-16">
        <h1>{contact.title}</h1>
        <p>{contact.email}</p>
        <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">Linkedin</a>
        <img src={contact.portraitImage.resize.src} alt="" width={350} />
      </main>
    </>
  );
};

export default ContactPage;

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
