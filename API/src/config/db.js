import mysql from "mysql2/promise";

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	connectionLimit: 10,
	queueLimit: 0,
	waitForConnections: true, 
});

export default pool;
