import { useState, useEffect } from "react";
import { ArticleList } from "./articles/ArticleList";
import { fetchArticles } from "../api";
import { MainArticleCard } from "./articles/MainArticleCard";
import { TopicNav } from "./TopicNav";

export function Home() {
  const [articles, setArticles] = useState([]);
  const [allArticlesClicked, setAllArticlesClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [latest, setLatest] = useState({});

  useEffect(() => {
    setLatest({});
    setAllArticlesClicked(false);
    setIsLoading(true);
    setIsError(false);
    fetchArticles()
      .then((data) => {
        setArticles(data);
        const latestDate = new Date(
          Math.max.apply(
            null,
            data.map((article) => {
              return new Date(article.created_at);
            })
          )
        );
        return Promise.all([latestDate, data]);
      })
      .then(([latestDate, data]) => {
        data.forEach((article) => {
          const articleDate = new Date(article.created_at);
          if (articleDate.getTime() === latestDate.getTime()) {
            setLatest(article);
          }
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, []);

  if (isError) {
    return <p>Something went wrong</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  function handleClick(event) {
    event.preventDefault();
    setAllArticlesClicked(!allArticlesClicked);
  }

  return (
    <>
    <TopicNav />
      <h2>Featured</h2>
      <section className="main-card-container">
        <MainArticleCard article={latest} />
      </section>
      <a onClick={handleClick}>
        {allArticlesClicked ? <h3>▼ All Articles</h3> : <h3>► All Articles</h3>}
      </a>
      {allArticlesClicked ? <ArticleList articles={articles} /> : null}
    </>
  );
}
