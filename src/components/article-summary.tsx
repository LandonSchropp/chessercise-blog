import { Link } from "gatsby";
import React from "react";

import { Article } from "../types";

type ArticleProps = {
  article: Article
};

export function ArticleSummary({ article }: ArticleProps) {
  return <Link
    className={
      "block my-4 thick-left-border text-inherit hover:no-underline transition-all "
        + "hover:border-shadow focus-visible:border-shadow border-l-mediumPurple "
        + "focus:outline-none no-underline"
    }
    to={ `/${ article.slug }` }
  >
    <h3 className="my-0">
      { article.title }
    </h3>
    <p className="my-0 italic">
      { article.description }
    </p>
  </Link>;
}
