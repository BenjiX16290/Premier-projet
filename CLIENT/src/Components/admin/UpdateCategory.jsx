import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function UpdateCategory({ category, updateCategories, setUpdateCategoryOpen }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name || "");
    }
  }, [category]);

  async function submitHandler(e) {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:9000/api/v1/category/update/${category.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      }
    );

    if (response.ok) {
      setName("");
      setUpdateCategoryOpen(false);
      updateCategories();
    } else {
      const errorData = await response.json();
      console.error("Erreur de mise à jour:", errorData);
    }
  }

  return (
    <aside className="form-add-category">
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Modifier le nom de la catégorie :</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div>
          <button type="submit">Modifier</button>
          <button onClick={() => setUpdateCategoryOpen(false)}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      </form>
    </aside>
  );
}

UpdateCategory.propTypes = {
  category: PropTypes.object.isRequired,
  updateCategories: PropTypes.func.isRequired,
  setUpdateCategoryOpen: PropTypes.func.isRequired,
};

export default UpdateCategory;
