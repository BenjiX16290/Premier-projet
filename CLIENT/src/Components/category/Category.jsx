import { Link } from "react-router-dom";
import { fetchCategories } from "../../fetch/category";
import { useState, useEffect } from "react";
import closeMenu from "../../hook/closeMenu";

function Category() {
  const [listCategories, setCategories] = useState([]);

  closeMenu();

  useEffect(() => {
    fetchListCategories();
  }, []);

  function fetchListCategories() {
    fetchCategories().then((data) => setCategories(data));
  }

  return (
    <>
      <main>
        <section id="section-category">
          <article id="contain-link-category">
            <Link
              to="/IndoorDiy"
              id="link-left"
              aria-label="Page de bricolage intérieur"
            >
              Bricolage intérieur
            </Link>
            <Link to="/Pool" className="link-top" aria-label="Page de piscine">
              Piscine
            </Link>
            <Link
              to="/Mecanic"
              className="link-top"
              aria-label="Page de mécanique"
            >
              Mécanique
            </Link>
            <Link
              to="/OutdoorDiy"
              id="link-right"
              aria-label="Page de bricolage extérieur"
            >
              Bricolage extérieur
            </Link>
          </article>
          <section className="logo-brico">
            <img
              src="src/assets/img/bricoleurClé.png"
              alt="Logo représentant un bricoleur avec une clé"
              aria-label="Logo bricoleur"
            />
          </section>
        </section>
      </main>
    </>
  );
}

export default Category;
