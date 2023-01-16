import React from "react";
import { graphql } from "gatsby";
import Header from "../components/header";

export const Head = () => <title>Contact Page</title>;

const ContactPage = ({ data }) => {
  const contact = data.contentfulContactPage;

  return (
    <>
      <Header />
      <main className="flex flex-col items-center p-2 xs:pt-20 pt-16">
        <h1 className="pb-2">{contact.title}</h1>
        <p className="pb-2">{contact.email}</p>
        <img src={contact.portraitImage.resize.src} alt="" className="w-full rounded-full contactimage max-w-xl"/>
        <section className="flex">
          <a className="p-2 px-4 text-xl" href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="p-2 px-4 text-xl" href={contact.linkedin} target="_blank" rel="noopener noreferrer">Linkedin</a>
        </section>
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
        resize(width: 800, format: AVIF) {
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
