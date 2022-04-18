import * as React from "react";

import { Layout } from "../components/layout";

export default function IndexPage() {
  return <Layout>
    <h1>
      Hello world!
    </h1>
    <p>Something else <a href="#">Hello</a></p>
    <blockquote>Hello there friend. <cite>John Denver</cite></blockquote>
    <hr />
    <img src="https://www.placecage.com/1000/800" />
    <ol>
      <li>One</li>
      <li>two</li>
      <li>three</li>
    </ol>
    <ul>
      <li>One</li>
      <li>two</li>
      <li>three</li>
    </ul>
  </Layout>;
}
