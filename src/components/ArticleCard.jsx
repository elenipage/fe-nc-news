import { Link } from "react-router-dom"
import dateFormat, { masks } from "dateformat"

export function ArticleCard(props) {
    const { article } = props

    const date = dateFormat(article.created_at, "dddd, mmmm dS, yyyy, HH:MM")

    return (
        <Link className="item-card">
            <img src={article.article_img_url}></img>

            <section className="card-text">
                <h2>{article.title}</h2>
                <p>{date}</p>
                <p>Topic: {article.topic}</p>
                <p>Votes: {article.votes}</p>
                <p>Comments: {article.comment_count}</p>
            </section>
        </Link>
        
    )
}