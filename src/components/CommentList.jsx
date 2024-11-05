import { fetchCommentsByArticle } from "../api";
import { useEffect, useState } from "react";
import { CommentCard } from "./CommentCard";

export function CommentList(props) {
  const { id } = props;
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchCommentsByArticle(id)
      .then((data) => {
        setComments(data);
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
    <section className="comment-container">
      {comments.map((comment) => {
      return <CommentCard key={comment.comment_id} comment={comment}/>
    })}
    </section>
  )
}
