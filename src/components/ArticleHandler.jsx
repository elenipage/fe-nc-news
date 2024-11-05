import { useState, useEffect } from "react";
import { ArticleList } from "./ArticleList";
import { fetchArticles } from "../api";

export function ArticleHandler() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      setIsError(false);
      fetchArticles()
        .then((data) => {
          setArticles(data);
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

    return (
        <ArticleList articles={articles} />
    )
}