import * as React from "react";

import { ArticleSummary } from "../components/article-summary";
import { Layout } from "../components/layout";

const ARTICLE = {
  title: "Awesome Git Aliases",
  slug: "awesome-git-aliases",
  date: new Date("1988-10-05"),
  description: `Wouldn't it be awesome if Git could do more? What if you could customize it with
    your own commands, making it do anything you can imagine?`,
  published: true
};

export default function IndexPage() {
  return <Layout>
    <section className="my-8">
      <ArticleSummary article={ ARTICLE } index={ 0 } numberOfArticles={ 5 } />
      <ArticleSummary article={ ARTICLE } index={ 1 } numberOfArticles={ 5 } />
      <ArticleSummary article={ ARTICLE } index={ 2 } numberOfArticles={ 5 } />
      <ArticleSummary article={ ARTICLE } index={ 3 } numberOfArticles={ 5 } />
      <ArticleSummary article={ ARTICLE } index={ 4 } numberOfArticles={ 5 } />
    </section>
  </Layout>;
}
