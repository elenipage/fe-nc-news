import { addComment } from "../../api";
import { useState, useEffect } from "react";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";

export function PostComment(props) {
  const { setNewComment, id, setOpen, setIsError, isError, commentDisabled, setCommentDisabled} = props;
  const [currentInput, setCurrentInput] = useState(null);
  const [responseBody, setResponseBody] = useState(null);
  commentDisabled, setCommentDisabled
  const [isLoading, setIsLoading] = useState(true)
  const username = JSON.parse(localStorage.getItem("username"));

  function handleChange(event) {
    setIsError(false)
    if (!event.target.value) {setIsError(true)}
    setCurrentInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isError) {return}

    else {
      const commentObj = {
        body: currentInput,
        author: username,
      };
  
      setResponseBody(commentObj);
      setOpen(false);
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    setCommentDisabled(false);
    if (!username) {
      setCommentDisabled(true);
    }
    if (!responseBody) {
      setIsError(true)
      setIsLoading(false)
      return
    }
    addComment(id, responseBody)
      .then((comment) => {
        setNewComment(comment);
        {isError ? "please enter your comment" : null}
      })
      .catch((err) => {
        localStorage.setItem("error", JSON.stringify(err))
        setIsError(true)}
    );
  }, [responseBody]);

  if (isLoading) {return <p>loading...</p>}

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
