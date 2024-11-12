import dateFormat from "dateformat";
import { fetchUser } from "../../api";
import { useEffect, useState } from "react";
import { DeleteComment } from "./DeleteComment";

export function CommentCard(props) {
  const { comment, deleted, setDeleted, newClass } = props;
  const username = JSON.parse(localStorage.getItem("username"));
  const loadingAvatar =
    "https://static.vecteezy.com/system/resources/previews/036/280/650/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg";
  const [avatarUrl, setAvatarUrl] = useState(loadingAvatar);

  const date = dateFormat(comment.created_at, "dddd, mmmm dS, yyyy, HH:MM");

  useEffect(() => {
    setAvatarUrl(loadingAvatar);
    setDeleted(false);
    const commentAuth = `${comment.author}`;
    fetchUser(commentAuth).then((user) => {
      setAvatarUrl(user.avatar_url);
    });
  }, [deleted, newClass]);

  return (
    <section className={"comment-card"}>
      <div className="comment-header">
        <img
          className="avatar"
          alt={`${comment.author}'s avatar`}
          src={avatarUrl}
        />
        <p className="comment-date">{date}</p>
      </div>
      <div className="comment-text">
        <h3>{comment.author}</h3>
        <p>{comment.body}</p>
      </div>
      <div className="comment-buttons">
        <div className="vote-button-container">
          <p>
            Votes: {comment.votes}
          </p>
        </div>
        {comment.author === username ? (
          <DeleteComment
            setDeleted={setDeleted}
            commentId={comment.comment_id}
          />
        ) : null}
      </div>
    </section>
  );
}
