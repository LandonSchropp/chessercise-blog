import * as React from "react";

import { ArticleSummary } from "../components/article-summary";
import { Layout } from "../components/layout";
import { SimpleChessboard } from "../components/simple-chessboard";

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
        fen="2p5/2kp/1Q/P/8/8/8/8"
        highlights={
          [
            { color: "blue", square: "b2" },
            { color: "blue", square: "c2" },
            { color: "green", square: "b5" },
            { color: "green", square: "c5" },
            { color: "yellow", square: "f2" },
            { color: "yellow", square: "g2" },
            { color: "red", square: "f5" },
            { color: "red", square: "g5" }
          ]
        }
        arrows={
          [
            { color: "blue", from: "b2", to: "b4" },
            { color: "green", from: "b5", to: "e7" },
            { color: "yellow", from: "f2", to: "g4" },
            { color: "red", from: "f5", to: "h8" }
          ]
        }
      />
      <ArticleSummary article={ ARTICLE } />
      <ArticleSummary article={ ARTICLE } />
      <ArticleSummary article={ ARTICLE } />
      <ArticleSummary article={ ARTICLE } />
      <ArticleSummary article={ ARTICLE } />
    </section>
  </Layout>;
}
