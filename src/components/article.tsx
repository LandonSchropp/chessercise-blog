import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";

import { Article } from "../types";

type ArticleProps = {
  article: Article,
  content: string
}

export function Article({ article, content }: ArticleProps) {
  return <article className="article">
    <h1>{ article.title }</h1>

    <MDXRenderer>
      { content }
    </MDXRenderer>
  </article>;
}
