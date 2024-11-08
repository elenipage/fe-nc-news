import {
  ExploreOff,
  ThumbDownAlt,
  SentimentVeryDissatisfied,
} from "@mui/icons-material";
import { useEffect } from "react";

export function ErrorPage(props) {
  const { error } = props;
  let msg = "something went wrong";
  let icon = null;
    if (error) {
        if (error.status === 404) {
            msg = "we couldn't find that";
            icon = <ExploreOff sx={{marginBottom: 3}} fontSize="large"/>;
          }
          if (error.status === 400) {
            msg = "bad request";
            icon = <ThumbDownAlt sx={{marginBottom: 2}} fontSize="large"/>;
          }
          if (error.status === 500) {
            msg = "something's wrong on our end";
            icon = <SentimentVeryDissatisfied sx={{marginBottom: 2}} fontSize="large"/>;
          }
    }
  
  useEffect(() => {
    localStorage.removeItem("error")
  }, [])

  return (
    <section className="error-container">
        {icon}
      <h2>oops! {error ? `${error.status}` : null}</h2>
      {msg}
      
    </section>
  );
}
