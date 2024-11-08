import { Link } from "react-router-dom";
import dateFormat from "dateformat";

export function DoubleArticleCard(props) {
  const { mostVotes, mostComments } = props;

  const votedDate = dateFormat(
    mostVotes.created_at,
    "dddd, mmmm dS, yyyy, HH:MM"
  );
  const commentsDate = dateFormat(
    mostComments.created_at,
    "dddd, mmmm dS, yyyy, HH:MM"
  );

  return (
    <section className="double-article-container">
      <section className="most-voted-container">
        <Link className="double-card" to={`article/${mostVotes.article_id}`}>
          <img className="double-article-img" src={mostVotes.article_img_url}></img>
          <section className="main-card-text">
            <h2>{mostVotes.title}</h2>
            <p>{votedDate}</p>
            <p>Topic: {mostVotes.topic}</p>
            <p>
              Votes: {mostVotes.votes} Comments: {mostVotes.comment_count}
            </p>
          </section>
        </Link>
      </section>
      <section className="most-commented-container">
        <Link className="double-card" to={`article/${mostComments.article_id}`}>
          <img src={mostComments.article_img_url} className="double-article-img"></img>

          <section className="main-card-text">
            <h2>{mostComments.title}</h2>
            <p>{commentsDate}</p>
            <p>Topic: {mostComments.topic}</p>
            <p>
              Votes: {mostComments.votes} Comments: {mostComments.comment_count}
            </p>
          </section>
        </Link>
      </section>
    </section>
  );
}
