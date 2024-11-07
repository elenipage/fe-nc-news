import { useEffect } from "react";
import { useUser } from "./UserContext";

export function UserCard(props) {
  const { user } = props;
  const { username, setUsername } = useUser();

  function handleClick() {
    setUsername(user.username);
    localStorage.setItem("username", JSON.stringify(user.username))
  }

  useEffect(() => {
    if (username) {
      window.location.href = `/users/${username}`;
    }
  }, [username]);

  return (
    <button className="user-card" onClick={handleClick}>
      <img className="login-avatar" src={user.avatar_url}></img>

      <section className="card-text">
        <h2>{user.username}</h2>
        <p>{user.name}</p>
      </section>
    </button>
  );
}
