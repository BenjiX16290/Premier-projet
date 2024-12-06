import pool from "../config/db.js";

class Category {
	static async findAll() {
		const SELECT_ALL = "SELECT * FROM category ORDER BY id ASC";
		return await pool.query(SELECT_ALL); 
	}


	static async findById(id) {
		const SELECT_ONE = "SELECT * FROM category WHERE id = ?";
		return await pool.execute(SELECT_ONE, [id]);
	}

    // Recherche si une catégorie existe en fonction de son nom (pour éviter les doublons, retourne 1 si elle existe ou 0 dans un tableau)
    static async findByName(name) {
        const SEARCH_NAME = "SELECT COUNT(*) AS result FROM category WHERE name = ?";
        return await pool.execute(SEARCH_NAME, [name]); 
       // const SEARCH_NAME2 = "SELECT * FROM category WHERE name = ?";
        //return await pool.execute(SEARCH_NAME2, [name]); 
    }

    static async create(name){
        const INSERT = "INSERT INTO category (name) VALUES (?)";
        return await pool.execute(INSERT, [name]);
    }

    static async update(name, id){
        const UPDATE = "UPDATE category SET name = ? WHERE id = ?";
        return await pool.execute(UPDATE, [name, id]);
    }

    static async remove(id){
        const DELETE = "DELETE FROM category WHERE id = ?";
        return await pool.execute(DELETE, [id]);
    }
}

export default Category;
