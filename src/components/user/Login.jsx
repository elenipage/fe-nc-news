import { useState, useEffect } from "react";
import { fetchUsers } from "../../api";
import { UserCard } from "./UserCard";

export function Login() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchUsers()
      .then((users) => {
        setUserList(users);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      });
  }, []);

  if (isError) {
    return <p>Something went wrong</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="login-container">
      <h2 className="login-heading">Select a user to log-in:</h2>
      <section className="user-container">
        {userList.map((user) => {
          return <UserCard key={user.username} user={user} />;
        })}
      </section>
    </section>
  );
}
