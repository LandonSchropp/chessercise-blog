import { graphql } from "gatsby";
import * as React from "react";

import { ArticleSummary } from "../components/article-summary";
import { Layout } from "../components/layout";
import { Article } from "../types";

export const query = graphql`
  query {
    articles {
      title
      slug
      date
      description
    }
  }
`;

function Header() {
  return <header className="my-8 text-emperor text-center">
    <h1 className="my-1">
      Chessercise
    </h1>
    <p className="my-0 italic">
      A chess blog by
      { " " }
      <a className="text-inherit underline" href="https://landonschropp.co">Landon&nbsp;Schropp</a>
    </p>
    <p className="my-0 italic" />
  </header>;
}

type IndexPageProps = {
  data: {
    articles: Article[]
  }
}

export default function IndexPage({ data: { articles } }: IndexPageProps) {
  // FIX: This is a temporary hack to be able to design the layout since I don't have very many
  // articles at the moment.
  articles = new Array(10).fill(articles[0]);

  return <Layout>
    <Header />
    <section className="my-8">
      {
        articles.map(article => <ArticleSummary key={ article.slug } article={ article } />)
      }
    </section>
  </Layout>;
}
