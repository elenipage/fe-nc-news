import "./index.css";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { Profile } from "./components/user/Profile";
import { Home } from "./components/Home";
import { ArticleList } from "./components/articles/ArticleList";
import { SingleArticle } from "./components/articles/SingleArticle";
import { Login } from "./components/user/Login";
import { ErrorPage } from "./components/ErrorPage";
import { Container } from "@mui/material";

function App() {
  const username = JSON.parse(localStorage.getItem("username"));
  const error = JSON.parse(localStorage.getItem("error"))

  return (
    <Container maxWidth="xl" sx={{paddingLeft: 1, paddingRight: 1}}>
      <Header username={username} />
      <Routes>
        <Route path="*" element={<ErrorPage error={error}/>} />
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:topic" element={<ArticleList />} />
        <Route path="/article/:id" element={<SingleArticle />} />
        <Route
          path="/users/:username"
          element={<Profile username={username} />}
        />
        <Route path="/login" element={<Login username={username} />} />
      </Routes>
    </Container>
  );
}

export default App;
