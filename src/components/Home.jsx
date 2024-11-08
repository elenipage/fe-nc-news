import { useState, useEffect } from "react";
import { ArticleList } from "./articles/ArticleList";
import { fetchArticles } from "../api";
import { MainArticleCard } from "./articles/MainArticleCard";
import { TopicNav } from "./articles/TopicNav";
import { SortFilter } from "./articles/SortFilter";
import { DoubleArticleCard } from "./articles/DoubleArticleCard";
import Loading from "./Loading";

export function Home() {
  const [articles, setArticles] = useState([]);
  const [allArticlesClicked, setAllArticlesClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [latest, setLatest] = useState({});
  const [mostVotes, setMostVotes] = useState({});
  const [mostComments, setMostComments] = useState({});

  useEffect(() => {
    setLatest({});
    setAllArticlesClicked(false);
    setIsLoading(true);
    setIsError(false);
    fetchArticles()
      .then((data) => {
        setLatest(data[0]);
      })
      .then(() => {
        fetchArticles(null, 'votes')
        .then((data) => {
          setMostVotes(data[0])
        })
      })
      .then(() => {
        fetchArticles(null, 'comment_count')
        .then((data) => {
          setMostComments(data[0])
        })
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, []);

  if (isError) {
    window.location.href = `/error`;
  }
  if (isLoading) {
    return <Loading/>;
  }

  function handleClick(event) {
    event.preventDefault();
    setAllArticlesClicked(!allArticlesClicked);
  }

  return (
    <section className="home-container">
      <h2 className="home-heading">Featured Articles</h2>
      <section className="main-card-container">
        <MainArticleCard article={latest} />
      </section>
      <DoubleArticleCard mostVotes={mostVotes} mostComments={mostComments}/>
      <a onClick={handleClick}>
        {allArticlesClicked ? <h3 className="toggle-all">▼ All Articles</h3> : <h3 className="toggle-all">► All Articles</h3>}
      </a>
      {allArticlesClicked ? <ArticleList articles={articles} /> : null}
    </section>
  );
}
