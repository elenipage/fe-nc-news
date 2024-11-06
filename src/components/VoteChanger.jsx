import { incrementVotes } from "../api";
import { useState, useEffect } from "react";

export function VoteChanger(props) {
  const { id, setVotes } = props;
  const [upVoted, setUpvoted] = useState(false);
  const [downVoted, setDownvoted] = useState(false);

  useEffect(() => {
    setUpvoted(JSON.parse(localStorage.getItem("upVoted") || "false"));
    setDownvoted(JSON.parse(localStorage.getItem("downVoted") || "false"));
  }, []);

  function handleChange(event) {
    event.preventDefault();
    const num = Number(event.target.value);

    if (num > 0) {
      if (upVoted) {
        incrementVotes(id, -1).then(() => {
          setUpvoted(false);
          localStorage.setItem("upVoted", JSON.stringify(false));
          setVotes((currentVotes) => currentVotes - 1);
        });
      } else {
        incrementVotes(id, 1).then(() => {
          setUpvoted(true);
          localStorage.setItem("upVoted", JSON.stringify(true));
          localStorage.setItem("downVoted", JSON.stringify(false));
          setVotes((currentVotes) => currentVotes + 1);
        });
      }
    }
  
    else {
      if (downVoted) {
        incrementVotes(id, 1).then(() => {
          setDownvoted(false);
          localStorage.setItem("downVoted", JSON.stringify(false));
          setVotes((currentVotes) => currentVotes + 1);
        });
      } else {
        incrementVotes(id, -1).then(() => {
          setDownvoted(true);
          localStorage.setItem("downVoted", JSON.stringify(true));
          localStorage.setItem("upVoted", JSON.stringify(false));
          setVotes((currentVotes) => currentVotes - 1);
        });
      }
    }
  }

  return (
    <>
      <p>
        <button value={1} disabled={downVoted} onClick={handleChange}>
          👍
        </button>{" "}
        <button value={-1} disabled={upVoted} onClick={handleChange}>
          👎
        </button>
      </p>
      {upVoted || downVoted ? <p>Thanks for voting!</p> : null}
    </>
  );
}
