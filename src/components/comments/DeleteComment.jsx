import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { deleteComment } from "../../api";

export function DeleteComment(props) {
  const username = JSON.parse(localStorage.getItem("username"));
  const [isLoading, setIsLoading] = useState()
  const [isError, setIsError] = useState(false);
  const { commentId, setDeleted } = props;

  function handleClick(event) {
    event.preventDefault();
    setIsLoading(true)
    setIsError(false)
    deleteComment(commentId).then(()=> {
        setDeleted(true)
    })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong...</p>
  }

  return (
    <button className="delete-button" onClick={handleClick}>
      <DeleteOutline color="error" fontSize="small" />
    </button>
  );
}
