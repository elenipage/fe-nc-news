import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-backend-37tu.onrender.com/api",
});

export function fetchArticles() {
  return api.get("/articles").then(({ data }) => {
    return data.articles;
  });
}

export function fetchArticleById(id) {
  return api.get(`/articles/${id}`).then(({ data }) => {
    return data
  })
}

export function fetchCommentsByArticle(id) {
  return api.get(`/articles/${id}/comments`).then(({ data }) => {
    return data.comments
  })
}