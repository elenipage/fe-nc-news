import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import { ArticleCard } from "./ArticleCard";

export function ArticleList(props) {
  const { articles } = props;

  return (
    <section className="card-container">
      {articles.map((article) => {
        return (
          <ArticleCard key={article.article_id} article={article}></ArticleCard>
        );
      })}
    </section>
  );
}
