const Ajv = require("ajv")
const idGenerator = require("../../src/util/idGenerator")
const userDAO = require("../dao/userDAO")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        username: {
          type: "string",
          minLength: 6,
          maxLength: 50
        }
      },
      required: ["username"],
      additionalProperties: false
    },
  },
  required: ["body"],
  additionalProperties: true
}

const validate = ajv.compile(schema)


const valid = validate(data)
if (!valid) console.log(validate.errors)

const addUser = async (req, res) => {
  const valid = validate(req);
  if (!valid) {
    res.status(400);
    res.send({error: "Invalid request"});
    return;
  }

  const userID = idGenerator();
  const user = {
    userID,
    username: req.username
  };

  const result = userDAO.addUser(user);
  console.log(result);
  if (result) {
    return {...user, status: 201};
  } else {
    return {status: 409, error: 'Username unavailable'}
  }
};

module.exports = addUser;
