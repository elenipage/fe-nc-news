import { IconButton } from "@mui/material";
import { AccountCircle, Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";
import { useState, useEffect } from "react";

export function Header(props) {
  const { username } = props;
  const [path, setPath] = useState(null);

  useEffect(() => {
    if (username) {
      setPath(`/users/${username}`);
    } else {
      setPath("/login");
    }
  }, [])

  function handleClick(event) {
    window.location.href=`${path}`
  }

  function handleChange(event) {
    window.location.href=event.target.value
  }

  return (
    <>
      <header>
        <Link to={"/"}>
          <IconButton className="header-button">
            <Home fontSize="large" sx={{ color: "#ef1c1c" }} />
          </IconButton>
        </Link>
        <Link to="/">
          <h1>NC News</h1>
        </Link>
        <IconButton
          className="header-button"
          onClick={handleClick}
        >
          <AccountCircle fontSize="large" sx={{ color: "#ef1c1c" }} />
        </IconButton>
      </header>
      <select onChange={handleChange}>
        <option>Topics</option>
        <option value="/articles">All</option>
      </select>
    </>
  );
}
