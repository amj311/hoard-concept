const getPool = require("./dbConnection");
const sql = require("sql-template-strings");

const userDAO = {
  getUserID: async (username) => {

  },
  addUser: async (user) => {
    const pool = await getPool();
    const query = pool.query(sql`INSERT INTO users (id, username) VALUES (${user.id}, ${user.username})`);
    const result = await query;
    return result[0].insertId;
  }
};

module.exports = userDAO;
