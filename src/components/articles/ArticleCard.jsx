import { Link } from "react-router-dom";
import dateFormat from "dateformat";

export function ArticleCard(props) {
  const { article } = props;

  const date = dateFormat(article.created_at, "dddd, mmmm dS, yyyy");

  return (
    <Link className="item-card" to={`/articles/${article.article_id}`}>
      <img src={article.article_img_url}></img>

      <section className="card-text">
        <p>{date}</p>
        <h2>{article.title}</h2>
        <p>Topic: {article.topic}</p>
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.comment_count}</p>
      </section>
    </Link>
  );
}
