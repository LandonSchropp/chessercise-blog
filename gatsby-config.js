const ARTICLES_DATABASE_ID = "1016394a8b7048148b942da2dc2abe55";

module.exports = {
  pathPrefix: "/chessercise-blog",
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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        "name": "pages",
        "path": "./src/pages/"
      }
    },
    "gatsby-plugin-mdx",
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-source-notion-api",
      options: {
        token: process.env.NOTION_API_TOKEN,
        databaseId: ARTICLES_DATABASE_ID,
        lowerTitleLevel: true
      }
    }
  ]
};
