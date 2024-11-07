import { addComment } from "../../api";
import { useState, useEffect } from "react";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";

export function PostComment(props) {
  const { setNewComment, id, setOpen } = props;
  const [currentInput, setCurrentInput] = useState("");
  const [responseBody, setResponseBody] = useState(null);
  const [commentDisabled, setCommentDisabled] = useState(false);
  const username = JSON.parse(localStorage.getItem("username"));

  function handleChange(event) {
    setCurrentInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const commentObj = {
      body: currentInput,
      author: username,
    };

    setResponseBody(commentObj);
    setOpen(false);
  }

  useEffect(() => {
    setCommentDisabled(false);
    if (!username) {
      setCommentDisabled(true);
    }
    if (!responseBody) {
      return;
    }
    addComment(id, responseBody)
      .then((comment) => {
        setNewComment(comment);
      })
      .catch((err) => console.log(err));
  }, [responseBody]);

  return (
    <form>
      <TextField
        required
        fullWidth
        multiline
        maxRows={5}
        minRows={5}
        id="comment-input"
        label={
          commentDisabled
            ? "Sorry, please log in before posting a comment"
            : `Comment as ${username}`
        }
        placeholder="Add a comment..."
        margin="normal"
        onChange={handleChange}
        disabled={commentDisabled}
      />
      <IconButton
        aria-label="post"
        htmlFor="comment-input"
        sx={{ left: "92%" }}
        size="large"
        type="submit"
        onClick={handleSubmit}
      >
        <Send fontSize="inherit" />
      </IconButton>
    </form>
  );
}
