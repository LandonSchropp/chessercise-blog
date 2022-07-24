import { format } from "date-fns";
import { Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Helmet } from "react-helmet";

import { Article as ArticleType } from "../types";

type ArticleProps = {
  article: ArticleType,
  content: string
}

export function Article({ article, content }: ArticleProps) {
  return <article className="article">
    <Helmet>
      <meta name="Author" content="Landon Schropp" />
      <meta name="description" content={ article.description } />
    </Helmet>
    <header className="my-4 text-center text-scriptInk">
      <div className="italic">
        <Link className="text-inherit no-underline hover:underline" to="/">Chessercise</Link>
      </div>
      <h1 className="my-0 font-serif font-bold">{ article.title }</h1>
      <div className="block my-1 text-center italic">
        <span>Landon Schropp</span>
        { " " }
        <span>•</span>
        { " " }
        <time dateTime={ article.date }>
          { format(new Date(article.date), "PPP") }
        </time>
      </div>
      <hr className="w-20 mx-auto my-4" />
    </header>

    <MDXRenderer>
      { content }
    </MDXRenderer>
  </article>;
}
