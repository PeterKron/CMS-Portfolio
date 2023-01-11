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
    //   component: path.resolve("./src/templates/singleproject.jsx"),
      component: path.resolve("./src/templates/singleprojects.jsx"),
      context: { slug: node.slug },
    });
  });
};

// const path = require(`path`)
// // Log out information after a build is done
// // exports.onPostBuild = ({ reporter }) => {
// //   reporter.info(`Your Gatsby site has been built!`)
// // }
// // Create blog pages dynamically
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
//   const result = await graphql(`
//     query {
//       allSamplePages {
//         edges {
//           node {
//             slug
//             title
//           }
//         }
//       }
//     }
//   `)
//   result.data.allSamplePages.edges.forEach(edge => {
//     createPage({
//       path: `${edge.node.slug}`,
//       component: blogPostTemplate,
//       context: {
//         title: edge.node.title,
//       },
//     })
//   })
// }