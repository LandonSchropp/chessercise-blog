import chroma from "chroma-js";
import { Link } from "gatsby";
import React from "react";

import { Article } from "../types/article";

const CORNFLOWER_BLUE = "#627ff6";
const AMETHYST = "#955fc2";

type ArticleProps = {
  article: Article,
  index: number,
  numberOfArticles: number
};

export function ArticleSummary({ article, index, numberOfArticles }: ArticleProps) {
  const color = chroma.mix(CORNFLOWER_BLUE, AMETHYST, index / (numberOfArticles - 1));

  return <Link
    className={
      "block my-4 thick-left-border text-inherit hover:no-underline transition-all "
        + "hover:border-shadow focus-visible:border-shadow border-l-[color:var(--color)] "
        + "focus:outline-none"
    }
    to={ `/articles/${ article.slug }` }
    style={ { "--color": color } }
  >
    <h3 className="my-0">
      { article.title }
    </h3>
    <p className="my-0 italic">
      { article.description }
    </p>
  </Link>;
}
