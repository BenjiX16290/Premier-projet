import { useNavigate } from "react-router-dom";
import { useState } from "react";
import closeMenu from "../hook/closeMenu";

function Contact() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const navigate = useNavigate("");

  closeMenu();

  async function submitMessage(e) {
    e.preventDefault();
    const publish_date = new Date().toISOString();
    const response = await fetch(
      "http://localhost:9000/api/v1/contact/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message,
          email,
          name,
          publish_date,
        }),
      }
    );
    if (response.ok) {
      setMessage("");
      setEmail("");
      setName("");
      setConfirmationMessage(
        "Votre message a été envoyé avec succès. Vous allez être redirigé vers la page d'accueil"
      );
      setTimeout(() => {
        navigate("/");
      }, 6000);
    } else {
      setConfirmationMessage(
        "Erreur lors de l'envoi de votre message. Vérifiez si vous êtes authentifié."
      );
    }
  }

  return (
    <section className="section-form">
      <form className="form-contact" onSubmit={submitMessage}>
        <label htmlFor="name">Nom d'utilisateur</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom d'utilisateur"
          aria-label="Nom d'utilisateur"
        />

        <label htmlFor="email">Adresse email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
          aria-label="Adresse email"
        />

        <label htmlFor="message">Votre message</label>
        <textarea
          id="message"
          rows="10"
          placeholder="Entrer votre message, 255 caractères maximum..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={255}
          aria-label="Entrez votre message"
        ></textarea>
        <p className="charactere-count">{255 - message.length}</p>

        <button type="submit">Envoyer</button>
      </form>
      {confirmationMessage && (
        <p className="confirmation-message">{confirmationMessage}</p>
      )}
    </section>
  );
}

export default Contact;
