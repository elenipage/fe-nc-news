import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById } from "../api";
import dateFormat from "dateformat";
import { CommentList } from "./CommentList";

export function SingleArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const date = dateFormat(article.created_at, "dddd, mmmm dS, yyyy, HH:MM")

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    fetchArticleById(id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, []);

  if (isError) {
    return <p>Something went seriously wrong...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
  <>
    <section className="article-container">
        <h1>{article.title}</h1>
        <h2>{article.topic}</h2>
        <img className="article-img" src={article.article_img_url}></img>
        <p>{date}</p>
        <h3>Written by: {article.author}</h3>
        <br/>
        <p>{article.body}</p>
        <br/>
        <p>Votes: {article.votes} <button>👍</button> <button>👎</button></p>
        <p>Comments: {article.comment_count}</p>
        
    </section>
        <CommentList id={article.article_id}/>
  </>
    
  )

}