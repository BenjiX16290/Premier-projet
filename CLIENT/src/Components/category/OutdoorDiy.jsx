import { useEffect, useState } from "react";
import { fetchArticlesByCategory } from "../../fetch/articleByCategory";
import { fetchCommentByArticle } from "../../fetch/commentByArticle";
import AddComment from "../AddComment";
import userCheckAuth from "../../hook/UserCheckAuth";
import closeMenu from "../../hook/closeMenu";
import DOMPurify from "dompurify";

function OutdoorDiy() {
  const [articles, setArticles] = useState([]);
  const [commentsByArticle, setCommentsByArticle] = useState({});
  const [displayAddCommentOpen, setDisplayAddCommentOpen] = useState({});
  const [user, isLoading] = userCheckAuth();
  const categoryId = 19;

  closeMenu();

  function updateArticles() {
    fetchArticlesByCategory(categoryId).then((data) => {
      setArticles(data);
    });
  }

  function updateComments(articleId) {
    fetchCommentByArticle(articleId).then((data) => {
      setCommentsByArticle((prevComments) => ({
        ...prevComments,
        [articleId]: data,
      }));
    });
  }

  function toggleCommentsVisibility(articleId) {
    setDisplayAddCommentOpen((prev) => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        isCommentsVisible: !prev[articleId]?.isCommentsVisible,
      },
    }));
  }

  function handleCommentAdded(articleId, newComment) {
    setCommentsByArticle((prevComments) => ({
      ...prevComments,
      [articleId]: [...(prevComments[articleId] || []), newComment],
    }));
    updateComments(articleId);
  }

  useEffect(() => {
    updateArticles();
  }, [categoryId]);

  useEffect(() => {
    if (articles.length > 0) {
      articles.forEach((article) => {
        updateComments(article.id);
      });
    }
  }, [articles]);

  return (
    <main>
      <section className="section-details-category">
        <h2>Les articles autour de l'extérieur de la maison</h2>
        {articles.map((article) => (
          <article key={article.id}>
            <h3>{article.title}</h3>
            <div className="contain-content-img">
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(article.content),
                }}
              ></p>
              <img
                src={`http://localhost:9000/img/${article.img}`}
                alt={`Image de l'article : ${article.alt}`}
              />
            </div>
            <hr />
            <AddComment
              articleId={article.id}
              comments={commentsByArticle[article.id]}
              onCommentAdded={(newComment) =>
                handleCommentAdded(article.id, newComment)
              }
              toggleCommentsVisibility={toggleCommentsVisibility}
              isLoading={isLoading}
              user={user}
            />
          </article>
        ))}
      </section>
    </main>
  );
}

export default OutdoorDiy;
