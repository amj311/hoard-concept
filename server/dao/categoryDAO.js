const getPool = require("./dbConnection");
const sql = require("sql-template-strings");

const categoryDAO = {
  getUserCategories: async (userID) => {
    const pool = await getPool();
    const query = pool.query(sql`SELECT * FROM categories WHERE userID = ${userID}`);
    const results = await query;
    return results[0];
  },
  addCategory: async (category) => {
    const pool = await getPool();
    const query = pool.query(sql`INSERT INTO categories (id, name, currentBalance, userID)
      VALUES (${category.id}, ${category.name}, ${category.currentBalance}, ${category.userID})`);
    const result = await query;
    return result[0].affectedRows;
  },
  deleteCategory: async (categoryID) => {
    const pool = await getPool();
    const query = pool.query(sql`DELETE FROM categories WHERE id = ${categoryID}`);
    const result = await query;
    return result[0].affectedRows;
  }
};

module.exports = categoryDAO;
