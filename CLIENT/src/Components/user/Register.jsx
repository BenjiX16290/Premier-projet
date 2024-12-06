import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailed, setMsg } from "../../Store/Slices/user";
import closeMenu from "../../hook/closeMenu";

function Register() {
  closeMenu();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmRegister, setConfirmRegister] = useState("");

  const dispatch = useDispatch();
  const msg = useSelector((state) => state.user.msg);

  const handleRegister = async (e) => {
    e.preventDefault();

    let isValid = true;

    setUsernameError("");
    setPasswordError("");
    setEmailError("");

    if (username.length < 3) {
      setUsernameError(
        "Le nom d'utilisateur doit contenir au moins 3 caractères."
      );
      isValid = false;
    }

    if (
      password.length < 12 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 12 caractères, une majuscule, un chiffre et un caractère spécial."
      );
      isValid = false;
    }

    if (!email.includes("@")) {
      setEmailError("Veuillez entrer un email valide au format @.");
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await fetch(
          "http://localhost:9000/api/v1/user/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, email }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setConfirmRegister(
            "Votre compte a été créé, vous allez être redirigé vers la page de connexion"
          );
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        } else {
          const errorData = await response.json();
          dispatch(loginFailed({ error: errorData.msg }));
        }
      } catch (error) {
        dispatch(setMsg("Erreur : veuillez remplir tous les champs."));
      }
    }
  };

  return (
    <>
      <section className="section-form">
        <form id="form-register" onSubmit={handleRegister}>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="Nom d'utilisateur"
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Adresse Email"
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Mot de passe"
          />

          <button type="submit" aria-label="Bouton d'inscription">
            Inscription
          </button>
        </form>
        <aside>
          {usernameError && (
            <p className="error-msg" aria-live="polite">
              {usernameError}
            </p>
          )}
          {emailError && (
            <p className="error-msg" aria-live="polite">
              {emailError}
            </p>
          )}
          {msg && (
            <p className="error-msg" aria-live="polite">
              {msg}
            </p>
          )}
          {passwordError && (
            <p className="error-msg" aria-live="polite">
              {passwordError}
            </p>
          )}
          {confirmRegister && (
            <p className="confirmation-message" aria-live="polite">
              {confirmRegister}
            </p>
          )}
        </aside>
      </section>
    </>
  );
}

export default Register;
