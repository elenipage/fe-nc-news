import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function Header(props) {
  const { username } = props;
  const [path, setPath] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (username) {
      setPath(`/users/${username}`);
    } else {
      setPath("/login");
    }
  }, []);

  function handleClick() {
    window.location.href = `${path}`;
  }

  return (
    <section className="header-container">
      <header>
        <IconButton
          className="header-button"
          id="basic-button"
          onClick={handleOpen}
          color="error"
        >
          <MenuIcon fontSize="large"/>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link to="/">
          <MenuItem onClick={handleClose}>Home</MenuItem>
          </Link>
          <Link to="/articles">
          <MenuItem onClick={handleClose}>All Articles</MenuItem>
          </Link>
          <Link to="/articles/coding">
          <MenuItem onClick={handleClose}>Coding</MenuItem>
          </Link>
          <Link to="/articles/cooking">
          <MenuItem onClick={handleClose}>Cooking</MenuItem>
          </Link>
          <Link to="/articles/football">
          <MenuItem onClick={handleClose}>Football</MenuItem>
          </Link>
        </Menu>
        <Link to="/">
          <h1 className="header-text">NC News</h1>
        </Link>
        <IconButton className="header-button" onClick={handleClick}>
          <AccountCircle fontSize="large" sx={{ color: "#ef1c1c" }} />
        </IconButton>
      </header>
    </section>
  );
}
