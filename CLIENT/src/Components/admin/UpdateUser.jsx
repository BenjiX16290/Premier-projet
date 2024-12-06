import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function UpdateUser({ user, fetchUsers, setUpdateUserOpen }) {
  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");

  async function submitHandler(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:9000/api/v1/user/update/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          email,
        }),
      }
    );

    if (response.ok) {
      setUsername("");
      setEmail("");
      setUpdateUserOpen(false);
      fetchUsers();
    }
  }

  useEffect(() => {
    setUsername(user?.username || "");
    setEmail(user?.email || "");
  }, [user]);

  return (
    <aside className="modal-form">
      <button
        onClick={() => setUpdateUserOpen(true)}
        aria-label="Fermer la fenêtre de mise à jour de l'utilisateur"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Modifier le nom d'utilisateur</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Nom d'utilisateur"
        />
        <label htmlFor="email">Modifier l'email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
        />

        <button
          type="submit"
          aria-label="Soumettre la mise à jour de l'utilisateur"
        >
          Modifier
        </button>
      </form>
    </aside>
  );
}

UpdateUser.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  setUpdateUserOpen: PropTypes.func.isRequired,
};

export default UpdateUser;
