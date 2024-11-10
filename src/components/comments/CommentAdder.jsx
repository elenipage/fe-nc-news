import { SwipeableDrawer, Box, Paper, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { PostComment } from "./PostComment";
import { Link } from "react-router-dom";

export function CommentAdder(props) {
  const { id, setNewComment } = props;
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [commentDisabled, setCommentDisabled] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [open]);

  const toggleDrawer = (newOpen) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(newOpen);
  };

  const commentDrawer = (
    <Box
      sx={{
        height: 260,
        margin: 2,
        marginRight: 3,
      }}
      role="presentation"
    >
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ left: "95%", padding: 0 }}
      >
        <Close />
      </IconButton>
      {isError && !commentDisabled ? (
        <p className="comment-error">please enter your comment</p>
      ) : null}
      {commentDisabled ? (
        <Link to="/login">
          <button className="login-button">log in</button>
        </Link>
      ) : null}
      <PostComment
        setCommentDisabled={setCommentDisabled}
        commentDisabled={commentDisabled}
        setIsError={setIsError}
        isError={isError}
        setOpen={setOpen}
        id={id}
        setNewComment={setNewComment}
      />
    </Box>
  );

  return (
    <div>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
        elevation={20}
        onClick={toggleDrawer(true)}
      >
        <button id="add-comment-button" onClick={toggleDrawer(true)}>
          Add a comment...
        </button>
      </Paper>
      <SwipeableDrawer
        anchor={"bottom"}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {commentDrawer}
      </SwipeableDrawer>
    </div>
  );
}
