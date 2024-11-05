import { useState, useEffect } from "react"
import { ArticleList } from "./ArticleList"
import { fetchArticles } from "../api"

export function Home() {
    const [articles, setArticles] = useState([])
    const [allArticlesClicked, setAllArticlesClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setAllArticlesClicked(false)
        setIsLoading(true)
        setIsError(false)
        fetchArticles()
            .then((data) => {
                setArticles(data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsError(true)
            })
    }, [])

    if (isError) {
        return <p>Something went wrong</p>;
      }
      if (isLoading) {
        return <p>Loading...</p>
      }

    function handleClick (event) {
        event.preventDefault()
        setAllArticlesClicked(true)
    }
    
    return (
        <>
            <h3><a onClick={handleClick}>All Articles</a></h3>
            {allArticlesClicked ? <ArticleList articles={articles}/> : null}
        </>
    )
}