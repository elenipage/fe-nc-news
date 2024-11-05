import { Link } from "react-router-dom";

export function Header() {
    function handleChange(event) {
        window.location.href=event.target.value
      }
  return (
    <>
      <header>
        <Link to="/">
          <h1>NC News</h1>
        </Link>
        <br />
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/users/:id">
          <button>Profile</button>
        </Link>
      </header>
      <select onChange={handleChange}>
        <option value="/">Topics</option>
        <option value="/articles">All</option>
      </select>
    </>
  );
}
