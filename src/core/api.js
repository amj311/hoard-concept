import { MONTHS } from "./constants";
import { Account, Category, OneTimeSchedule, TransactionSchedule, TransactionTemplate, TransactionType, XPerMonthSchedule } from "./models";

const apiURL = 'http://localhost:8080';

const api = {
  getUserID: async (username) => {
    return fetch(`${apiURL}/user/${username}/id`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET'
    })
      .then((response) => response.json())
      .then((resBody) => {
        console.log(JSON.stringify(resBody));
        if (resBody.error) {
          throw Error(resBody.error);
        }
        return resBody.id;
      })
      .catch(async () => {
        throw Error('Could not retrieve data');
      });
  },
  getAccounts: async (userID) => {
      return fetch(`${apiURL}/user/${userID}/account`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET'
      })
        .then((response) => response.json())
        .then((resBody) => {
          console.log(JSON.stringify(resBody));
          if (resBody.error) {
            throw Error(resBody.error);
          }
          return resBody.accounts;
        })
        .catch(async () => {
          throw Error('Could not retrieve data');
        });
  },
  getCategories: async (userID) => {
    return fetch(`${apiURL}/user/${userID}/category`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET'
    })
      .then((response) => response.json())
      .then((resBody) => {
        console.log(JSON.stringify(resBody));
        if (resBody.error) {
          throw Error(resBody.error);
        }
        return resBody.categories;
      })
      .catch(async () => {
        throw Error('Could not retrieve data');
      });
  },
  getTransactions: async (userID) => {
    return fetch(`${apiURL}/user/${userID}/category`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET'
    })
      .then((response) => response.json())
      .then((resBody) => {
        console.log(JSON.stringify(resBody));
        if (resBody.error) {
          throw Error(resBody.error);
        }
        return resBody.transactions;
      })
      .catch(async () => {
        throw Error('Could not retrieve data');
      });
  },
  addUser: async (username) => { 
    return fetch(`${apiURL}/user`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: {
        username
      }
    })
      .then((response) => response.json())
      .then((resBody) => {
        console.log(JSON.stringify(resBody));
        if (resBody.error) {
          throw Error(resBody.error);
        }
        return;
      })
      .catch(async () => {
        throw Error('Could not retrieve data');
      });
  },
  addAccount: async (userID, account) => {
    return fetch(`${apiURL}/user/${userID}/account`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: account
    })
      .then((response) => response.json())
      .then((resBody) => {
        console.log(JSON.stringify(resBody));
        if (resBody.error) {
          throw Error(resBody.error);
        }
        return;
      })
      .catch(async () => {
        throw Error('Could not retrieve data');
      });
  },
  addCategory: async (userID, category) => {
    return fetch(`${apiURL}/user/${userID}/category`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: category
    })
      .then((response) => response.json())
      .then((resBody) => {
        console.log(JSON.stringify(resBody));
        if (resBody.error) {
          throw Error(resBody.error);
        }
        return;
      })
      .catch(async () => {
        throw Error('Could not retrieve data');
      });
  },
  addTransaction: async (userID, transaction) => {
    return fetch(`${apiURL}/user/${userID}/transaction`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: transaction
    })
      .then((response) => response.json())
      .then((resBody) => {
        console.log(JSON.stringify(resBody));
        if (resBody.error) {
          throw Error(resBody.error);
        }
        return;
      })
      .catch(async () => {
        throw Error('Could not retrieve data');
      });
  },
  deleteUser: async (userID) => {
    return fetch(`${apiURL}/user/${userID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE'
    })
      .then((response) => response.status === 204 ? {} : response.json())
      .then((resBody) => {
        console.log(JSON.stringify(resBody));
        if (resBody.error) {
          throw Error(resBody.error);
        }
        return;
      })
      .catch(async () => {
        throw Error('Could not retrieve data');
      });
  },
  deleteAccount: async (accountID) => {
    return fetch(`${apiURL}/account/${accountID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE'
    })
      .then((response) => response.status === 204 ? {} : response.json())
      .then((resBody) => {
        console.log(JSON.stringify(resBody));
        if (resBody.error) {
          throw Error(resBody.error);
        }
        return;
      })
      .catch(async () => {
        throw Error('Could not retrieve data');
      });
  },
  deleteCategory: async (categoryID) => {
    return fetch(`${apiURL}/category/${categoryID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE'
    })
      .then((response) => response.status === 204 ? {} : response.json())
      .then((resBody) => {
        console.log(JSON.stringify(resBody));
        if (resBody.error) {
          throw Error(resBody.error);
        }
        return;
      })
      .catch(async () => {
        throw Error('Could not retrieve data');
      });
  },
  deleteTransaction: async (transactionID) => {
  return fetch(`${apiURL}/transaction/${transactionID}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE'
  })
    .then((response) => response.status === 204 ? {} : response.json())
    .then((resBody) => {
      console.log(JSON.stringify(resBody));
      if (resBody.error) {
        throw Error(resBody.error);
      }
      return;
    })
    .catch(async () => {
      throw Error('Could not retrieve data');
    });
  }
};

export default api;
