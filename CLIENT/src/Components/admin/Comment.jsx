import { fetchComment } from "../../fetch/comment";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Comment() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComment().then((data) => setComments(data));
  }, []);

  async function onClickDeleteComment(id) {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce commentaire ?"
    );
    if (confirmDelete) {
      const response = await fetch(
        "http://localhost:9000/api/v1/comment/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        fetchComment().then((data) => setComments(data));
      }
    }
  }

  return (
    <>
      <main>
      <Link
          id="return-dashboard"
          to="/dashboard"
          aria-label="Retour à la page principal du dashboard"
        >
          <FontAwesomeIcon id="return-dashboard" icon={faArrowLeft} />
        </Link>
        <section className="section-dashboard">
          <article>
            <h2>Liste des commentaires</h2>
            <table role="table" aria-label="Tableau des commentaires">
              <thead>
                <tr>
                  <th scope="col">Utilisateur</th>
                  <th scope="col">Commentaire</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment.id}>
                    <td>{comment.username}</td>
                    <td>{comment.content}</td>
                    <td className="contain-btn">
                      <button
                        className="btn-delete"
                        onClick={() => onClickDeleteComment(comment.id)}
                        aria-label={`Supprimer le commentaire de ${comment.username}`}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </section>
      </main>
    </>
  );
}

export default Comment;
