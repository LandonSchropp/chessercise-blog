import * as React from "react";

import { ArticleSummary } from "../components/article-summary";
import { Layout } from "../components/layout";
import { SimpleChessboard } from "../components/simple-chessboard/simple-chessboard";

const ARTICLE = {
  title: "Awesome Git Aliases",
  slug: "awesome-git-aliases",
  date: new Date("1988-10-05"),
  description: `Wouldn't it be awesome if Git could do more? What if you could customize it with
    your own commands, making it do anything you can imagine?`,
  published: true
};

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

export default function IndexPage() {
  return <Layout>
    <Header />
    <section className="my-8">
      <SimpleChessboard
        coordinates="inside"
        fen="2p/2kp/1Q/P"
      />
      <ArticleSummary article={ ARTICLE } index={ 0 } numberOfArticles={ 5 } />
      <ArticleSummary article={ ARTICLE } index={ 1 } numberOfArticles={ 5 } />
      <ArticleSummary article={ ARTICLE } index={ 2 } numberOfArticles={ 5 } />
      <ArticleSummary article={ ARTICLE } index={ 3 } numberOfArticles={ 5 } />
      <ArticleSummary article={ ARTICLE } index={ 4 } numberOfArticles={ 5 } />
    </section>
  </Layout>;
}
