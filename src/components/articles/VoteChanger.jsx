import { incrementVotes } from "../../api";
import { useState, useEffect } from "react";

export function VoteChanger(props) {
  const { id, setVotes } = props;
  const [upVoted, setUpvoted] = useState(false);
  const [downVoted, setDownvoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const user = localStorage.getItem("username")

  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem("votes") || "{}");
    const userVotes = savedVotes[user] || {};
    const articleVotes = userVotes[id] || { upVoted: false, downVoted: false };
    setUpvoted(articleVotes.upVoted);
    setDownvoted(articleVotes.downVoted);
    setIsError(false);
  }, []);

  function updateLocalStorage(newUpVoted, newDownVoted) {
    const savedVotes = JSON.parse(localStorage.getItem("votes") || "{}");
    const userVotes = savedVotes[user] || {};
    userVotes[id] = { upVoted: newUpVoted, downVoted: newDownVoted };
    savedVotes[user] = userVotes;
    localStorage.setItem("votes", JSON.stringify(savedVotes));
  }

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
        updateLocalStorage(true, false);
        setVotes((currentVotes) => currentVotes + voteChange);
        setMessageVisible(true);
        setTimeout(() => setMessageVisible(false), 3000);
        setIsVoting(false);
      });
    } else if (num < 0 && !downVoted) {
      const voteChange = upVoted ? -2 : -1;
      incrementVotes(id, voteChange)
        .then(() => {
          setDownvoted(true);
          setUpvoted(false);
          updateLocalStorage(false, true);
          setVotes((currentVotes) => currentVotes + voteChange);
          setMessageVisible(true);
          setTimeout(() => setMessageVisible(false), 3000);
          setIsVoting(false);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        });
    } else {
      const reverseVote = num > 0 ? -1 : 1;
      incrementVotes(id, reverseVote)
        .then(() => {
          setUpvoted(false);
          setDownvoted(false);
          updateLocalStorage(false, false);
          setVotes((currentVotes) => currentVotes + reverseVote);
          setIsVoting(false);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        });
    }
  }

  return (
    <>
      <p>
        <button
          className={upVoted ? "pressed-vote-button" : null}
          value={1}
          disabled={isVoting || isError}
          onClick={handleVoteChange}
        >
          👍
        </button>{" "}
        <button
          className={downVoted ? "pressed-vote-button" : null}
          value={-1}
          disabled={isVoting || isError}
          onClick={handleVoteChange}
        >
          👎
        </button>
      </p>
      {messageVisible && <p>Thanks for voting!</p>}
      {isError && (
        <>
          <p>Sorry, something went wrong.</p>
          <p>Please try again later.</p>
        </>
      )}
    </>
  );
}
