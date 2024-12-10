import pool from "../config/db.js";

class Contact {

    static async findAll () {
        const SELECT_ALL = "SELECT * FROM contact order BY id DESC"
        return await pool.query(SELECT_ALL);
    }

    static async findById (id) {
        const SELECT_ONE = "SELECT * FROM contact WHERE id = ?";
        return await pool.execute(SELECT_ONE, [id]);
    }

    static async create (datas) {
        const INSERT = "INSERT INTO contact (name, message, email, publish_date) VALUES (?,?,?,?)";
        return await pool.execute (INSERT, [...Object.values(datas)]);
    }

    static async remove (id) {
        const DELETE = "DELETE FROM contact WHERE id = ?";
        return await pool.execute(DELETE, [id]);
    }
}

export default Contact;