import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-backend-37tu.onrender.com/api",
});

export function fetchArticles(topic) {
  let queryStr = `/articles`
  if (topic) {queryStr += `?topic=${topic}`}

  return api.get(queryStr).then(({ data }) => {
    return data.articles;
  });
}

export function fetchArticleById(id) {
  return api.get(`/articles/${id}`).then(({ data }) => {
    return data;
  });
}

export function fetchCommentsByArticle(id) {
  return api.get(`/articles/${id}/comments`).then(({ data }) => {
    return data.comments;
  });
}

export function incrementVotes(id, num) {
  const incData = { inc_votes: num };
  return api.patch(`/articles/${id}`, incData).then(({ data }) => {
    return data.article;
  });
}

export function addComment(id, comment) {
  return api.post(`/articles/${id}/comments`, comment).then(({ data }) => {
    return data.comment;
  });
}

export function fetchUser(username) {
  return api.get(`/users/${username}`).then(({data}) => {
    return data.user
  })
}

export function fetchUsers() {
  return api.get("/users").then(({data}) => {
    return data.users
  })
}

export function deleteComment(id) {
  return api.delete(`/comments/${id}`).then(({data}) => {
    return data
  })
}

export function fetchTopics() {
  return api.get(`/topics`).then(({data}) => {
    return data
  })
}

