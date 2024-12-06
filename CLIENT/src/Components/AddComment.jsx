import { useSelector } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function AddComment({
  articleId,
  comments,
  onCommentAdded,
  toggleCommentsVisibility,
  isLoading,
}) {
  const [newComment, setNewComment] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const user = useSelector((state) => state.user);
  const { isLogged, id: userId } = user;

  function toggleComments() {
    setIsCommentsVisible(!isCommentsVisible);
    toggleCommentsVisibility(articleId);
  }

  function toggleAddCommentVisibility() {
    setIsFormVisible(!isFormVisible);
  }

  async function submitComment(e) {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:9000/api/v1/comment/create/${articleId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          articleId,
          content: newComment,
          user_id: userId,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setNewComment("");
      if (data.comment) {
        onCommentAdded(data.comment);
      }
    }
  }

  return (
    <aside>
      <button
        id="btn-display-comment"
        onClick={toggleComments}
        aria-label={
          isCommentsVisible
            ? "Masquer les commentaires"
            : "Afficher les commentaires"
        }
      >
        {isCommentsVisible ? "Masquer les commentaires" : "Commentaires"}
      </button>

      {isCommentsVisible && comments && comments.length > 0 && (
        <div className="comment" aria-label="Liste des commentaires">
          {comments.map((comment) => (
            <p
              key={comment.id}
              className="border-comment"
              aria-label={`Commentaire de ${comment.username}`}
            >
              <strong>{comment.username}</strong>: {comment.content}
            </p>
          ))}
        </div>
      )}

      <button
        id="btn-add-com"
        onClick={toggleAddCommentVisibility}
        aria-label={
          isFormVisible
            ? "Fermer le formulaire de commentaire"
            : "Ouvrir le formulaire de commentaire"
        }
      >
        {isFormVisible ? "Fermer" : "Commenter"}
      </button>

      {isFormVisible && (
        <form
          className="form-comment"
          onSubmit={submitComment}
          aria-label="Formulaire d'ajout de commentaire"
        >
          <textarea
            id="comment"
            name="content"
            placeholder="Commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            aria-label="Saisir votre commentaire"
          ></textarea>
          <button type="submit" aria-label="Envoyer le commentaire">
            Ajouter
          </button>
        </form>
      )}

      {!isLoading && !isLogged && (
        <p aria-label="Message pour les utilisateurs non connectés">
          Vous devez être connecté pour publier un commentaire{" "}
          <NavLink to="/Login" aria-label="Lien vers la page de connexion">
            Connexion
          </NavLink>{" "}
          <span>ou</span>{" "}
          <NavLink to="/Register" aria-label="Lien vers la page d'inscription">
            Créer un compte
          </NavLink>
        </p>
      )}
    </aside>
  );
}

export default AddComment;
