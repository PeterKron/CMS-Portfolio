/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `portfolio-website`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        // accessToken: "oOMF1C4kbVNyzM_vj1v6A_F1B4WNgLzZA_AIeN-yNKc",
        // spaceId: "3pz0cpuqhtg1"
        accessToken: `${process.env.CONTENTFUL_API_ACCESSTOKEN}`,
        spaceId: `${process.env.CONTENTFUL_API_SPACEID}`,
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
};
