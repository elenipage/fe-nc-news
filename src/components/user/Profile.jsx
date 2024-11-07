import { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { fetchUser } from "../../api";

export function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { username, setUsername } = useUser();
  const savedUsername = JSON.parse(localStorage.getItem("username"));

  useEffect(() => {
    setLoggedIn(false);
    setIsError(false);
    setIsLoading(true);
    setUser(null);
    if (savedUsername) {
      setLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      fetchUser(username)
        .then((userData) => {
          setUser(userData);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleClick(event) {
    event.preventDefault();
    setUsername(null);
    setUser(null);
    localStorage.removeItem("username");
    window.location.href = "/login";
  }

  if (isError) {
    return (
      <>
        <p>Something went seriously wrong...</p>
        <p>Try logging in:</p>
        <button onClick={handleClick}>Log in</button>
      </>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Profile</h1>
      <h2>{username}</h2>
      <h3>{user.name}</h3>
      <img src={user.avatar_url}></img>
      <button onClick={handleClick}>Log Out</button>
    </>
  );
}
