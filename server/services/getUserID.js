const Ajv = require("ajv");
const userDAO = require("../dao/userDAO");
const asyncHandler = require("../util/asyncHandler");

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    params: {
      type: "object",
      properties: {
        username: {
          type: "string"
        }
      },
      required: ["username"],
      additionalProperties: false
    }
  },
  required: ["params"],
  additionalProperties: true
};

const validate = ajv.compile(schema);

const getUserID = asyncHandler(async (req, res) => {
  const valid = validate(req);
  if (!valid) {
    console.error(validate.errors);
    res.status(400);
    res.send({error: "Invalid request"});
    return;
  }

  const id = await userDAO.getUserID(req.params.username);
  console.log(id);
  if (id) {
    res.status(200);
    res.send({userID: id, status: 200});
  } else {
    res.status(404);
    res.send({status: 404, error: 'User not found'});
  }
});

module.exports = getUserID;
