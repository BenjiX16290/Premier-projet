import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchContact } from "../../fetch/contact";
import closeMenu from "../../hook/closeMenu";
import { useEffect, useState } from "react";
import { faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Message() {
  closeMenu();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  function listMessage() {
    fetchContact().then((data) => setMessages(data));
  }

  function openMessageDetails(message) {
    setSelectedMessage(message);
  }

  function closeMessageDetails() {
    setSelectedMessage(null);
  }

  useEffect(() => {
    listMessage();
  }, []);

  async function onClickDeleteMessage(id) {
    const confirmDelete = window.confirm(
      "Etes vous sûr de vouloir supprimer le message ?"
    );
    if (confirmDelete) {
      const response = await fetch(
        "http://localhost:9000/api/v1/contact/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        listMessage();
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
            <h2>Gérer les messages reçu</h2>
            <table aria-label="Liste des messages reçus">
              <thead>
                <tr>
                  <th scope="col">Utilisateur</th>
                  <th scope="col">Message</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td>{message.name}</td>
                    <td
                      className="display-modal"
                      onClick={() => openMessageDetails(message)}
                    >
                      {message.message.substring(0, 50)}...
                    </td>
                    <td>
                      <time dateTime={message.publish_date}>
                        {new Date(message.publish_date).toLocaleDateString()}
                      </time>
                    </td>
                    <td className="contain-btn">
                      <button
                        className="btn-delete"
                        onClick={() => {
                          onClickDeleteMessage(message.id);
                        }}
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

        {selectedMessage && (
          <div className="modal">
            <div className="modal-content">
              <h3>
                Message de {selectedMessage.name} du{" "}
                <time dateTime={selectedMessage.publish_date}>
                  {new Date(selectedMessage.publish_date).toLocaleDateString()}
                </time>
              </h3>
              <div className="modal-text">
                <p>{selectedMessage.message}</p>
              </div>
              <button className="btn-close" onClick={closeMessageDetails}>
                Fermer
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Message;
