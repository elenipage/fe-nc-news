import { useState, useEffect } from "react";
import { fetchTopics } from "../api";
import { useParams } from "react-router-dom";

export function TopicNav() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filterButton, setFilterButton] = useState('topics');

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchTopics().then((data) => {
      setTopics(data);
      setIsLoading(false);
    })
    .catch((err) => {
        setIsError(true)
        console.log(err)
    })
  }, []);

  if (isError) {
    return <p>Something went wrong</p>;
  }

  function handleChange(event) {
    event.preventDefault()
    window.location.href = event.target.value;
  }

  return (
    <div>
      <select onChange={handleChange}>
        <option>{filterButton}</option>
        <option value={"/articles"}>all</option>
        {topics.map((topic) => {
          return (
            <option value={`/articles/${topic.slug}`} key={topic.slug}>
              {topic.slug}
            </option>
          );
        })}
      </select>
    </div>
  );
}
