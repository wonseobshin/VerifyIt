import React from "react";
import { Link } from "react-router-dom";

const ArticlesList = ({ articles }) => (
  <>
    {articles.map((article, key) => (
      <Link key={key} to={"/searchresults"}>
        <h3>{article.title}</h3>
        <p>{article.created_at}</p>
        <p>{article.article_points}</p>
      </Link>
    ))}
  </>
);

export default ArticlesList;
