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
        id: {
          type: "string"
        }
      },
      required: ["id"],
      additionalProperties: false
    }
  },
  required: ["params"],
  additionalProperties: true
};

const validate = ajv.compile(schema);

const deleteUser = asyncHandler(async (req, res) => {
  const valid = validate(req);
  if (!valid) {
    console.error(validate.errors);
    res.status(400);
    res.send({error: "Invalid request"});
    return;
  }

  const deleted = await userDAO.deleteUser(req.params.id);
  console.log(deleted);
  if (deleted) {
    res.status(204);
    res.send();
  } else {
    res.status(404);
    res.send({status: 404, error: 'User not found'});
  }
});


module.exports = deleteUser;
