const getPool = require("./dbConnection");
const sql = require("sql-template-strings");

const transactionDAO = {
  getUserTransactions: async (userID) => {
    const pool = await getPool();
    const query = pool.query(sql`SELECT * FROM transactions WHERE userID = ${userID}`);
    const results = await query;
    return results[0];
  },
  addTransaction: async (transaction) => {
    const pool = await getPool();
    const query = pool.query(sql`INSERT INTO transactions (id, type, amount, memo, frequencyType, frequencyPeriod, startDate, endDate, userID, targetAccount, originAccount, categoryID)
      VALUES (${transaction.id}, ${transaction.type}, ${transaction.amount}, ${transaction.memo}, ${transaction.frequencyType}, ${transaction.frequencyPeriod}, ${transaction.startDate}, ${transaction.endDate}, ${transaction.userID}, ${transaction.targetAccount}, ${transaction.originAccount}, ${transaction.categoryID})`);
    const result = await query;
    return result[0].insertId;
  },
  deleteTransaction: async (transactionID) => {
    const pool = await getPool();
    const query = pool.query(sql`DELETE FROM transactions WHERE id = ${transactionID}`);
    const result = await query;
    return result[0].affectedRows;
  }
};

module.exports = transactionDAO;
