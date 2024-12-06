async function fetchArticlesByCategory(categoryId) {
    const response = await fetch(`http://localhost:9000/api/v1/article/list/${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  
    const data = await response.json();
    return data;
  }
  
  export {fetchArticlesByCategory};