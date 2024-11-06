import { incrementVotes } from "../../api";
import { useState, useEffect } from "react";

export function VoteChanger(props) {
  const { id, setVotes } = props;
  const [upVoted, setUpvoted] = useState(false);
  const [downVoted, setDownvoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    setUpvoted(JSON.parse(localStorage.getItem("upVoted") || "false"));
    setDownvoted(JSON.parse(localStorage.getItem("downVoted") || "false"));
  }, []);

  function handleVoteChange(event) {
    event.preventDefault();
    if (isVoting) return;

    setIsVoting(true);
    const num = Number(event.target.value);

    if (num > 0 && !upVoted) {
      const voteChange = downVoted ? 2 : 1;
      incrementVotes(id, voteChange).then(() => {
        setUpvoted(true);
        setDownvoted(false);
        localStorage.setItem("upVoted", JSON.stringify(true));
        localStorage.setItem("downVoted", JSON.stringify(false));
        setVotes((currentVotes) => currentVotes + voteChange);
        setMessageVisible(true);
        setTimeout(() => setMessageVisible(false), 3000);
        setIsVoting(false);
      });
    } else if (num < 0 && !downVoted) {
      const voteChange = upVoted ? -2 : -1;
      incrementVotes(id, voteChange).then(() => {
        setDownvoted(true);
        setUpvoted(false);
        localStorage.setItem("downVoted", JSON.stringify(true));
        localStorage.setItem("upVoted", JSON.stringify(false));
        setVotes((currentVotes) => currentVotes + voteChange);
        setMessageVisible(true);
        setTimeout(() => setMessageVisible(false), 3000);
        setIsVoting(false);
      });
    } else {
      const reverseVote = num > 0 ? -1 : 1;
      incrementVotes(id, reverseVote).then(() => {
        setUpvoted(false);
        setDownvoted(false);
        localStorage.setItem("upVoted", JSON.stringify(false));
        localStorage.setItem("downVoted", JSON.stringify(false));
        setVotes((currentVotes) => currentVotes + reverseVote);
        setIsVoting(false);
      });
    }
  }

  return (
    <>
      <p>
        <button
          className={upVoted ? "pressed-vote-button" : null}
          value={1}
          disabled={isVoting || downVoted}
          onClick={handleVoteChange}
        >
          👍
        </button>{" "}
        <button
          className={downVoted ? "pressed-vote-button" : null}
          value={-1}
          disabled={isVoting || upVoted}
          onClick={handleVoteChange}
        >
          👎
        </button>
      </p>
      {messageVisible && <p>Thanks for voting!</p>}
    </>
  );
}
