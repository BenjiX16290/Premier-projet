import { Link } from "react-router-dom";
import closeMenu from "../../hook/closeMenu";
import { fetchUsers } from "../../fetch/user.js";
import { fetchCategories } from "../../fetch/category.js";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import UpdateUser from "./UpdateUser.jsx";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";

function Dashboard() {
  closeMenu();
  const [selected_user, setSelected_User] = useState(null);
  const [selected_category, setSelected_Category] = useState(null);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [updateUserOpen, setUpdateUserOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [updateCategoryOpen, setUpdateCategoryOpen] = useState(false);

  function updateUsers() {
    fetchUsers().then((data) => setUsers(data));
  }

  function updateCategories() {
    fetchCategories().then((data) => setCategories(data));
  }

  async function onClickDeleteUser(id) {
    const confirmDelete = window.confirm(
      "Êtes vous sûr de vouloir supprimer cet utilisateur ?"
    );
    if (confirmDelete) {
      const response = await fetch(
        "http://localhost:9000/api/v1/user/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        updateUsers();
      }
    }
  }

  async function onClickDeleteCategory(id) {
    const confirmDelete = window.confirm(
      "Êtes vous sûr de vouloir supprimer cette catégorie ?"
    );
    if (confirmDelete) {
      const response = await fetch(
        "http://localhost:9000/api/v1/category/delete/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        updateCategories();
      }
    }
  }

  useEffect(() => {
    updateUsers();
    updateCategories();
  }, []);

  return (
    <>
      <main>
        <div id="link-dashboard">
          <Link to="/AddUpdateArticle" aria-label="Page des articles">
            Articles
          </Link>
          <Link to="/Comment" aria-label="Page des commentaires">
            Commentaires
          </Link>
          <Link to="/Message" aria-label="Page des messages">
            Messages
          </Link>
        </div>
        <section className="section-dashboard">
          <article>
            <h2>Liste des utilisateurs </h2>
            <table aria-label="Liste des utilisateurs">
              <thead>
                <tr>
                  <th>Utilisateur</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} aria-label={`Utilisateur ${user.username}`}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className="contain-btn">
                      <button
                        className="btn-update"
                        onClick={() => {
                          setSelected_User({
                            id: user.id,
                            username: user.username,
                            email: user.email,
                          });
                          setUpdateUserOpen(!updateUserOpen);
                        }}
                        aria-label={`Modifier l'utilisateur ${user.username}`}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => onClickDeleteUser(user.id)}
                        aria-label={`Supprimer l'utilisateur ${user.username}`}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {updateUserOpen && (
              <UpdateUser
                user={selected_user}
                setUpdateUserOpen={setUpdateUserOpen}
                fetchUsers={updateUsers}
              />
            )}
          </article>

          <article id="categorie">
            <h2>Liste des catégories</h2>
            <table aria-label="Liste des catégories">
              <thead>
                <tr>
                  <th>Nom de la catégorie</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    aria-label={`Catégorie ${category.name}`}
                  >
                    <td>{category.name}</td>
                    <td className="contain-btn">
                      <button
                        className="btn-update"
                        onClick={() => {
                          setSelected_Category({
                            id: category.id,
                            name: category.name,
                          });
                          setUpdateCategoryOpen(!updateCategoryOpen);
                        }}
                        aria-label={`Modifier la catégorie ${category.name}`}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => onClickDeleteCategory(category.id)}
                        aria-label={`Supprimer la catégorie ${category.name}`}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              id="btn-add-category-open"
              onClick={() => setAddCategoryOpen(!addCategoryOpen)}
              aria-label="Ajouter une nouvelle catégorie"
            >
              <FontAwesomeIcon icon={faPlus} /> Catégorie
            </button>
          </article>

          {addCategoryOpen && (
            <AddCategory
              setAddCategoryOpen={setAddCategoryOpen}
              fetchCategories={fetchCategories}
              updateCategories={updateCategories}
            />
          )}
          {updateCategoryOpen && (
            <UpdateCategory
              category={selected_category}
              fetchCategories={fetchCategories}
              updateCategories={updateCategories}
              setUpdateCategoryOpen={setUpdateCategoryOpen}
            />
          )}
        </section>
      </main>
    </>
  );
}

export default Dashboard;
