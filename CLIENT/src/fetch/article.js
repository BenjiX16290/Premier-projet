
async function fetchArticle () {
   const response = await fetch ("http://localhost:9000/api/v1/article/list", {
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
});

const data = await response.json();
return data;
   }

   export {fetchArticle};
