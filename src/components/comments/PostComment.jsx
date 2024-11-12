import { addComment } from "../../api";
import { useState, useEffect } from "react";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { red } from "@mui/material/colors";

export function PostComment(props) {
  const {
    setNewComment,
    id,
    setOpen,
    setIsError,
    commentDisabled,
    setCommentDisabled,
  } = props;
  const [currentInput, setCurrentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const username = JSON.parse(localStorage.getItem("username"));

  useEffect(() => {
    setCommentDisabled(!username);
  }, [username]);

  function handleChange(event) {
    setIsError(false);
    setInputError(false);
    setCurrentInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!currentInput.trim()) {
      setInputError(true);
      return;
    }

    setIsLoading(true);

    const commentObj = {
      body: currentInput.trim(),
      author: username,
    };

    addComment(id, commentObj)
      .then((comment) => {
        setNewComment(comment);
        setCurrentInput("");
        setOpen(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error posting comment:", err);
        setIsError(true);
        setIsLoading(false);
      });
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        required
        fullWidth
        multiline
        maxRows={5}
        minRows={5}
        id="comment-input"
        label={
          commentDisabled
            ? "Please log in before posting comments"
            : `Comment as ${username}`
        }
        placeholder="Add a comment..."
        margin="normal"
        onChange={handleChange}
        value={currentInput}
        disabled={commentDisabled}
        error={currentInput ? false : true}
        helperText={currentInput || commentDisabled ? "" : "Please enter your comment"}
        color="error"
      />
      <IconButton
        aria-label="post"
        htmlFor="comment-input"
        sx={{
          position: "absolute", 
          right: "10px", 
          top: "88%", 
          transform: "translateY(-50%)",
        }}
        size="large"
        type="submit"
        disabled={commentDisabled || isLoading}
      >
        <Send fontSize="inherit" />
      </IconButton>
    </form>
  );
}
