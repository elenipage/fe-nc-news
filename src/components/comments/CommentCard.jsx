import dateFormat from "dateformat";
import { fetchUser } from "../../api";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

export function CommentCard(props) {
  const { comment } = props;
  const [avatarUrl, setAvatarUrl] = useState("");
  const date = dateFormat(comment.created_at, "dddd, mmmm dS, yyyy, HH:MM");

  useEffect(() => {
    const commentAuth = `${comment.author}`;
    fetchUser(commentAuth).then((user) => {
      setAvatarUrl(user.avatar_url);
    });
  }, []);

  console.log(avatarUrl);

  return (
    <>
      <section className="comment-card">
      <div className="comment-header">
      <img className="avatar"
            alt={`${comment.author}'s avatar`}
            src={avatarUrl}
          />
      <p className="comment-date">{date}</p>
      </div>
        <section className="comment-text">
          <h3>{comment.author}</h3>
          <p>{comment.body}</p>
          <p>
            Votes: {comment.votes} <button>👍</button> <button>👎</button>
          </p>
        </section>
      </section>
    </>
  );
}
