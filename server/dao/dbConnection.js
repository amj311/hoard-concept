const config = require("../config");

let currentPool = undefined;

const getPool = async () => {
  /*
  if (currentPool === undefined) {
    const connectionParams =
      config.db.connection.path ?
        {socketPath: config.db.connection.path} :
        {
          host: config.db.connection.host,
          port: config.db.connection.port,
        };
    const newPool = await mysql.createPool({
      user: "root",
      password: config.db.password,
      database: "hoard",
      ...connectionParams,
      connectionLimit: 1,
      connectTimeout: 10000,
    });
    currentPool = newPool;
  }
  return currentPool;
  */
};

module.exports = getPool;