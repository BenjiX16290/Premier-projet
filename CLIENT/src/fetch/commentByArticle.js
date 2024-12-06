async function fetchCommentByArticle(articleId) {
  const response = await fetch(`http://localhost:9000/api/v1/comment/all-from-article/${articleId}`, {
      headers: {
          "Content-Type": "application/json",
      },
      credentials: "include",
  });

  const data = await response.json();
  return data;
}

export { fetchCommentByArticle };
