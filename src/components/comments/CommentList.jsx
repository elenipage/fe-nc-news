import { fetchCommentsByArticle } from "../../api";
import { useEffect, useState } from "react";
import { CommentCard } from "./CommentCard";

export function CommentList(props) {
  const { id, newComment, setNewComment } = props;
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [noComments, setNoComments] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [newClass, setNewClass] = useState("comment-card");
  const [newMessageVisible, setNewMessageVisible] = useState(false);

  useEffect(() => {
    if (deleted) {
      setMessageVisible(true);
      setTimeout(() => setMessageVisible(false), 5000);
      setTimeout(() => setDeleted(false), 5000);
    }

    if (newComment) {
      setTimeout(() => setMessageVisible(false), 5000);
      setNewComment(false);
    }
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
  }, [deleted]);

  useEffect(() => {
    setNewClass("new-comment-card");
    setTimeout(() => setNewClass("comment-card"), 5000);
    if (newComment) {
      setNewMessageVisible(true);
      setTimeout(() => setNewMessageVisible(false), 5000);
    }
  }, [newComment]);

  if (isError) {
    return <p>Something went wrong</p>;
  }
  if (isLoading) {
    return (
      <section className="no-comment-msg">
        <h4>Loading Comments...</h4>
      </section>
    );
  }

  return (
    <>
      {messageVisible ? (
        <p className="delete-message">Comment Deleted</p>
      ) : null}
      {newMessageVisible ? (
        <p className="delete-message">Comment Posted</p>
      ) : null}
      <section className="comment-container">
        {newComment ? (
          <div className={newClass}>
            <CommentCard
              id="new-comment"
              key={newComment.comment_id}
              comment={newComment}
              deleted={deleted}
              setDeleted={setDeleted}
              newClass={newClass}
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
          return (
            <CommentCard
              key={comment.comment_id}
              newClass={newClass}
              comment={comment}
              deleted={deleted}
              setDeleted={setDeleted}
            />
          );
        })}
      </section>
    </>
  );
}
