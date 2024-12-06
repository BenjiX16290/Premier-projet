import pool from "../config/db.js";

class User {

	static async findAll () {
		const SELECT_ALL = "SELECT id, username , email from `user`"
		return await pool.execute (SELECT_ALL);
	}

	static async create(datas) {
		const INSERT = 
		"INSERT INTO user (username, password, email) VALUES (?, ?, ?)";
		return await pool.execute(INSERT, [ ...Object.values(datas)] );
	}

	static async findOneByUsername(username) {
		const SELECT =
		"SELECT id, username, password, email FROM `user` WHERE username = ?";
            return await pool.execute(SELECT, [username]);
	}

	static async findUserInfoById(id) {
		const SELECT = "SELECT username, role FROM user WHERE id = ?";
		return await pool.execute(SELECT, [id]);
	}
	static async updateUser(username, id, email) {
		const UPDATE_USER = "UPDATE user SET username = ?, email = ? WHERE id = ?";
		return await pool.execute(UPDATE_USER, [username, email, id]);
	}
    static async remove(id){
        const DELETE = "DELETE FROM user WHERE id = ?";
        return await pool.execute(DELETE, [id]);
    }
}




export default User;