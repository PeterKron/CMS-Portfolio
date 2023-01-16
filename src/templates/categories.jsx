import React from "react";
import { graphql } from "gatsby";
import Header from "../components/header";
import CategoryNavigation from "../components/categoryNav";
import RenderProjects from "../components/renderProjects";

export const Head = ({ data }) => (
    <title>{data.contentfulCategory.categoryName} Projects</title>
  );

const CategoryPage = ({ data }) => {
  const projects = data.contentfulCategory.projects;
  const categories = data.allContentfulCategory;

  return (
    <>
      <Header />
      <main className="p-2 ap:px-18 2xl:px-26 3xl:px-28 flex flex-col xs:pt-20 pt-16">
        <section className="flex justify-between pb-10 xs:justify-around xs:py-6 sm:pb-16">
          <h1 className="xs:text-5xl">{data.contentfulCategory.categoryName}</h1>
          <CategoryNavigation data={categories}/>
        </section>

        <section className="flex flex-wrap justify-center">
          <RenderProjects data={projects} />
        </section>
      </main>
    </>
  );
};

export default CategoryPage;

export const query = graphql`
  query CategoryQuery($slug: String) {
    contentfulCategory(slug: { eq: $slug }) {
      categoryName
      projects {
        projectName
        slug
        projectLink {
          projectLink
        }
        projectDescription {
          raw
        }
        screenshots {
          resize(width: 1350, format: AUTO) {
            width
            height
            src
          }
        }
      }
    }
    allContentfulCategory(sort: { categoryName: ASC }) {
      nodes {
        categoryName
        slug
      }
    }
  }
`;
