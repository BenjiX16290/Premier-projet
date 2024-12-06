import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchCommentArticleById } from "../fetch/comment";

function FormComment({ articleId, user }) {
  const [msg, setMsg] = useState("");
  const [comment, setComment] = useState("");

  function onChangeHandler(e) {
    setComment(e.target.value);
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    if (comment.length === 0) {
      setMsg("Il n'est pas possible d'envoyer un commentaire vide");
      return;
    }

    const data = {
      message: comment,
    };

    try {
      const response = await fetchCommentArticleById(
        `http://localhost:9000/api/v1/comment/create/${articleId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (response.status === 201) {
        setComment("");
        setMsg("Commentaire envoyé avec succès !");
      } else {
        setMsg("Erreur lors de l'envoi du commentaire.");
      }
    } catch (error) {
      setMsg("Erreur lors de l'envoi du commentaire. Veuillez réessayer.");
    }
  }

  return (
    <>
      {!user.isLogged ? (
        <p>
          Vous devez être connecté pour commenter
          <Link to="/login" aria-label="Se connecter pour commenter">
            Se connecter
          </Link>
        </p>
      ) : (
        <form onSubmit={onSubmitHandler} aria-label="Formulaire de commentaire">
          <label htmlFor="comment">Votre commentaire</label>
          <textarea
            id="comment"
            value={comment}
            onChange={onChangeHandler}
            placeholder="Écrivez votre commentaire ici..."
            aria-label="Zone de texte pour le commentaire"
          ></textarea>
          {msg && <p aria-live="polite">{msg}</p>}
          <button type="submit" aria-label="Envoyer le commentaire">
            Envoyer
          </button>
        </form>
      )}
    </>
  );
}

export default FormComment;
