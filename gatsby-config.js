module.exports = {
  siteMetadata: {
    title: `Chessercise Blog`,
    siteUrl: `https://blog.chessercise.xyz`
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        "trackingId": "XXX"
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        "icon": "src/images/icon.png"
      }
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        "name": "pages",
        "path": "./src/pages/"
      }
    },
    `gatsby-plugin-postcss`
  ]
};
