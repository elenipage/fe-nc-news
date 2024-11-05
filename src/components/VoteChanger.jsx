import { incrementVotes } from "../api";

export function VoteChanger(props) {
  const { id, setVotes } = props;

  function handleChange(event) {
    event.preventDefault();
    const num = Number(event.target.value);
    incrementVotes(id, num).then(() => {
      setVotes((currentVotes) => {
        return currentVotes + num;
      });
    });
  }
  
  return (
    <p>
      <button value={1} onClick={handleChange}>
        👍
      </button> <button value={-1} onClick={handleChange}>
        👎
      </button>
    </p>
  );
}
