const userDAO = require("../dao/userDAO");
const idGenerator = require("../../util/idGenerator");

const addUser = async (username) => {
  const userID = idGenerator();
  const result = userDAO.addUser({userID, username});
  console.log(result);
  if (result) {
    return {id: userID, username, status: 201};
  } else {
    return {status: 409, error: 'Username unavailable'}
  }
};

module.exports = addUser;
