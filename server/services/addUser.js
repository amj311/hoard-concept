const addUser = async (req, res) => {
  res.status(500);
  res.send({error: "Not yet implemented"});
  /*const userID = idGenerator();
  const result = userDAO.addUser({userID, username});
  console.log(result);
  if (result) {
    return {id: userID, username, status: 201};
  } else {
    return {status: 409, error: 'Username unavailable'}
  }*/
};

module.exports = addUser;
