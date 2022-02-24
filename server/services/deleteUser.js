const Ajv = require("ajv");
const userDAO = require("../dao/userDAO");

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

const deleteUser = async (req, res) => {
  const valid = validate(req);
  if (!valid) {
    console.error(validate.errors);
    res.status(400);
    res.send({error: "Invalid request"});
    return;
  }

  const deleted = userDAO.deleteUser(req.params.id);
  console.log(deleted);
  if (deleted) {
    return {deleted, status: 204};
  } else {
    return {status: 500, error: 'Something went wrong'}
  }
};


module.exports = deleteUser;
