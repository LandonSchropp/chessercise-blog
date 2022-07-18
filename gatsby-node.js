/* eslint-disable @typescript-eslint/no-var-requires */

const { createContentDigest } = require("gatsby-core-utils");
const path = require(`path`);

const ARTICLE_TYPE = "Article";

function transformNotionNodeToArticle(notionNode) {

  // Build the data for the node.
  let data = {
    id: `${ notionNode.id } >>> ${ ARTICLE_TYPE }`,
    title: notionNode.title,
    slug: notionNode.properties["Slug"].value,
    date: notionNode.properties["Date"].value.start,
    description: notionNode.properties["Description"].value,
    published: notionNode.properties["Published"].value
  };

  // Create the Gatsby Node structure using the data.
  return {
    parent: null,
    children: [],
    internal: {
      type: ARTICLE_TYPE,
      contentDigest: createContentDigest(data)
    },
    ...data
  };
}

async function resolveArticle(source, args, context) {
  const notionNode = await context.nodeModel.findOne({
    query: {
      filter: {
        properties: {
          Slug: { value: { eq: args.slug.eq } }
        }
      }
    },
    type: "Notion"
  });

  return transformNotionNodeToArticle(notionNode);
}

async function resolveArticles(source, args, context) {
  const { entries } = await context.nodeModel.findAll({
    query: {
      filter: {
        properties: {
          Published: { value: { eq: true } }
        }
      },
      sort: {
        fields: [ "properties.Date.value.start" ],
        order: [ "DESC" ]
      }
    },
    type: "Notion"
  });

  return entries.map(transformNotionNodeToArticle);
}

// Add the Article GraphQL type.
exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type ${ ARTICLE_TYPE } implements Node {
      id: ID!
      parent: Node!
      children: [Node!]!
      internal: Internal!

      title: String!
      slug: String!
      date: Date!
      description: String!
      published: Boolean!
    }
  `);
};

// Create the customer resolvers.
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Query: {
      article: {
        type: "Article",
        resolve: resolveArticle
      },
      articles: {
        type: "[Article]",
        resolve: resolveArticles
      }
    }
  });
};

// Create the dynamic pages.
exports.createPages = async ({ graphql, actions: { createPage } }) => {

  // Query the data used to generate the page.
  let result = await graphql(`
     query ArticlePublications {
       articles {
         slug
         published
       }
     }
  `);

  // Throw any generated errors.
  if (result.errors) {
    throw result.errors;
  }

  // Filter out the unpublished articles and create pages for each.
  result.data.articles.filter(({ published }) => published).forEach(({ slug }) => {
    createPage({
      path: `${ slug }`,
      component: path.resolve(`src/templates/article-template.tsx`),
      context: { slug }
    });
  });
};
