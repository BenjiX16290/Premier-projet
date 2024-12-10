import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function AddCategory({ setAddCategoryOpen, updateCategories }) {
  const [name, setName] = useState("");

  async function submitCategory(e) {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:9000/api/v1/category/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
        }),
      }
    );
    if (response.ok) {
      setName("");
      setAddCategoryOpen(false);
      updateCategories();
    }
  }

  return (
    <aside aria-label="Formulaire d'ajout de catégorie">
      <form className="form-add-update" onSubmit={submitCategory}>
        <label htmlFor="name" aria-label="Nom de la catégorie"></label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-required="true"
          required
        />
        <div className="contain-btn">
          <button
            className="add-update"
            type="submit"
            aria-label="Ajouter une nouvelle catégorie"
          >
            Ajouter
          </button>
          <button
            className="btn-close"
            onClick={() => setAddCategoryOpen(false)}
            aria-label="Fermer le formulaire d'ajout de catégorie"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </form>
    </aside>
  );
}

AddCategory.propTypes = {
  setAddCategoryOpen: PropTypes.func.isRequired,
  updateCategories: PropTypes.func.isRequired,
};

export default AddCategory;
