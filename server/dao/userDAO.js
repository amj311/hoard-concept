const getPool = require("./dbConnection");
const sql = require("sql-template-strings");

const userDAO = {
  getUserID: async (username) => {
    const pool = await getPool();
    const query = pool.query(sql`SELECT id FROM users WHERE username = ${username}`);
    const result = await query;
    if (result[0].length) {
      return result[0][0].id;
    }
    return undefined;
  },
  addUser: async (user) => {
    const pool = await getPool();
    const query = pool.query(sql`INSERT INTO users (id, username) VALUES (${user.id}, ${user.username})`);
    const result = await query;
    return result[0].affectedRows;
  },
  deleteUser: async (userID) => {
    const pool = await getPool();
    const query = pool.query(sql`DELETE FROM users WHERE id = ${userID}`);
    const result = await query;
    return result[0].affectedRows;
  }
};

module.exports = userDAO;
