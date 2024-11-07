import { useState, useEffect } from "react";
import { fetchArticles } from "../../api";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ArticleCard } from "./ArticleCard";
import { SortFilter } from "./SortFilter";
import { TopicNav } from "./TopicNav";

export function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortQuery, setSortQuery] = useState(searchParams.get("sort_by") || null)
  const [orderQuery, setOrderQuery] = useState(searchParams.get("order") || null)

  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    if(sortQuery) {}
    fetchArticles(topic, sortQuery, orderQuery)
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, [sortQuery, orderQuery]);

  if (isError) {
    return <p>Something went wrong</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="filter-bar">
        <TopicNav />
        <SortFilter setSearchParams={setSearchParams} sortQuery={sortQuery} orderQuery={orderQuery} setSortQuery={setSortQuery} setOrderQuery={setOrderQuery}/>
      </section>
      <section className="card-container">
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article={article}
            ></ArticleCard>
          );
        })}
      </section>
    </>
  );
}
