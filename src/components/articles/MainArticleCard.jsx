import { Link } from "react-router-dom"
import dateFormat from "dateformat"

export function MainArticleCard(props) {
    const { article } = props

    const date = dateFormat(article.created_at, "dddd, mmmm dS, yyyy, HH:MM")

    return (
        <Link className="main-card" to={`articles/${article.article_id}`}>
            <img src={article.article_img_url}></img>

            <section className="main-card-text">
                <h2>{article.title}</h2>
                <p>{date}</p>
                <br/>
                <p>Topic: {article.topic}</p>
                <p>Votes: {article.votes} Comments: {article.comment_count}</p>
            </section>
        </Link>  
    )
}