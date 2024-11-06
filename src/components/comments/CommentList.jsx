import { fetchCommentsByArticle } from "../../api";
import { useEffect, useState } from "react";
import { CommentCard } from "./CommentCard";

export function CommentList(props) {
  const { id, newComment } = props;
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [noComments, setNoComments] = useState(false);

  useEffect(() => {
    setNoComments(false);
    setIsLoading(true);
    setIsError(false);
    fetchCommentsByArticle(id)
      .then((data) => {
        if (data.length === 0) {
          setNoComments(true);
        }
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
      {newComment ? (
        <div className="new-comment-container">
          <h3>Comment Posted!</h3>
          <CommentCard
            id="new-comment"
            key={newComment.comment_id}
            comment={newComment}
          />
        </div>
      ) : null}
      {noComments ? (
        <section className="no-comment-msg">
          <h4>Sorry, no comments yet...</h4>
          <p>Why not have your say?</p>
        </section>
      ) : null}
      {comments.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </section>
  );
}
