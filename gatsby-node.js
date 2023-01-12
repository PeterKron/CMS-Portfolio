const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query getAllProjectsSlugs {
      allContentfulProjects {
        nodes {
          slug
        }
      }
    }
  `);
  data.allContentfulProjects.nodes.forEach((node) => {
    actions.createPage({
      //URL
      path: "/project/" + node.slug,
      //Template
      component: path.resolve("./src/templates/singleprojects.jsx"),
      context: { slug: node.slug },
    });
  });
};

