import dateFormat from "dateformat";

export function CommentCard(props) {
  const { comment } = props;

  const date = dateFormat(comment.created_at, "dddd, mmmm dS, yyyy, HH:MM");

  return (
    <section className="comment-card">
      <section className="comment-text">
        <p>{date}</p>
        <h3>{comment.author}</h3>
        <p>{comment.body}</p>
        <p>Votes: {comment.votes} <button>👍</button> <button>👎</button></p>
      </section>
    </section>
  );
}
