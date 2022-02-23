const addUser = require("../backend/services/addUser");

const api = {
  getUserID: (username) => {},
  getAccounts: (userID) => {},
  getCategories: (userID) => {},
  getTransactions: (userID) => {},
  addUser: async (username) => {
    return await addUser(username);
  },
  addAccount: (userID, account) => {},
  addCategory: (userID, category) => {},
  addTransaction: (userID, transaction) => {},
  deleteUser: (userID) => {},
  deleteAccount: (accountID) => {},
  deleteCategory: (categoryID) => {},
  deleteTransaction: (transactionID) => {},
  updateAccount: (accountID, account) => {},
  updateCategory: (categoryID, category) => {},
  updateTransaction: (transactionID, transaction) => {}
};

module.exports = api;
