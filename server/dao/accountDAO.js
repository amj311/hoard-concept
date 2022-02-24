const getPool = require("./dbConnection");
const sql = require("sql-template-strings");

const accountDAO = {
  getUserAccounts: async (userID) => {
    const pool = await getPool();
    const query = pool.query(sql`SELECT * FROM accounts WHERE userID = ${userID}`);
    const results = await query;
    return results[0];
  },
  addAccount: async (account) => {
    const pool = await getPool();
    const query = pool.query(sql`INSERT INTO accounts (id, name, currentBalance, userID)
      VALUES (${account.id}, ${account.name}, ${account.currentBalance}, ${account.userID})`);
    const result = await query;
    return result[0].insertId;
  },
  deleteAccount: async (accountID) => {
    const pool = await getPool();
    const query = pool.query(sql`DELETE FROM accounts WHERE id = ${accountID}`);
    const result = await query;
    return result[0].affectedRows;
  }
};

module.exports = accountDAO;
