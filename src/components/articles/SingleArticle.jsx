import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticleById } from "../../api";
import dateFormat from "dateformat";
import { CommentList } from "../comments/CommentList";
import { VoteChanger } from "./VoteChanger";
import { CommentAdder } from "../comments/CommentAdder";

export function SingleArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [votes, setVotes] = useState(0);
  const [newComment, setNewComment] = useState(null);

  const date = dateFormat(article.created_at, "dddd, mmmm dS, yyyy, HH:MM");

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    setNewComment(null);
    fetchArticleById(id)
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
        setVotes(data.votes);
      })
      .catch((err) => {
        localStorage.setItem("error", JSON.stringify(err));
        setIsError(true);
      });
  }, []);

  if (isError) {
    window.location.href = `/error`;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="single-article">
      <section className="article-container">
        <h1>{article.title}</h1>
        <h2 className="subheader">{article.topic}</h2>
        <p>{date}</p>
        <img className="article-img" src={article.article_img_url}></img>
        <section className="article-body">
          <p>{article.body}</p>
        </section>
          <h3>Written by: {article.author}</h3>
          <p>Votes: {votes}</p>
          <VoteChanger id={id} setVotes={setVotes} setArticle={setArticle} />
          <p>Comments: {article.comment_count}</p>
      </section>
      <CommentAdder setNewComment={setNewComment} id={article.article_id} />
      <CommentList
        newComment={newComment}
        setNewComment={setNewComment}
        id={article.article_id}
      />
    </section>
  );
}
