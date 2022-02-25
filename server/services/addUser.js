const Ajv = require("ajv");
const idGenerator = require("../util/idGenerator");
const userDAO = require("../dao/userDAO");
const asyncHandler = require("../util/asyncHandler");

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        username: {
          type: "string",
          minLength: 6,
          maxLength: 50,
          pattern: "^\\S*$"
        }
      },
      required: ["username"],
      additionalProperties: false
    },
  },
  required: ["body"],
  additionalProperties: true
}

const validate = ajv.compile(schema);

const addUser = asyncHandler(async (req, res) => {
  const valid = validate(req);
  if (!valid) {
    console.error(validate.errors);
    res.status(400);
    res.send({error: "Invalid request"});
    return;
  }

  const id = idGenerator();
  const user = {
    id,
    username: req.body.username
  };

  try {
    const userAdded = await userDAO.addUser(user);
    console.log(userAdded);
    if (userAdded) {
      res.status(201);
      res.send({user, status: 201});
    } else {
      res.status(500);
      res.send({status: 500, error: 'Something went wrong'});
    }
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409);
      res.send({status: 409, error: 'Username unavailable'});
    } else {
      res.status(500);
      res.send({status: 500, error: 'Something went wrong'});
    }
  }
  
});

module.exports = addUser;
