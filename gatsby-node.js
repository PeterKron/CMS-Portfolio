const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query getAllSlugs {
      allContentfulProjects {
        nodes {
          slug
        }
      }
      allContentfulCategory {
        nodes {
          slug
        }
      }
    }
  `);

  data.allContentfulProjects.nodes.forEach((node) => {
    actions.createPage({
      //URL
      path: "/projects/" + node.slug,
      //Template
      component: path.resolve("./src/templates/singleprojects.jsx"),
      context: { slug: node.slug },
    });
  });

  data.allContentfulCategory.nodes.forEach((node) => {
    actions.createPage({
      //URL
      path: "/projects/" + node.slug,
      //Template
      component: path.resolve("./src/templates/categories.jsx"),
      context: { slug: node.slug },
    });
  });
};

