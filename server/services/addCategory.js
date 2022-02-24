const Ajv = require("ajv");
const idGenerator = require("../../src/util/idGenerator");
const categoryDAO = require("../dao/categoryDAO");

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        name: {
          type: "string",
          minLength: 1,
          maxLength: 50
        },
        currentBalance: {
          type: "integer",
          minimum: 0
        }
      },
      required: ["name"],
      additionalProperties: false
    },
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
  required: ["body", "params"],
  additionalProperties: true
};

const validate = ajv.compile(schema);

const addCategory = async (req, res) => {
  const valid = validate(req);
  if (!valid) {
    console.error(validate.errors);
    res.status(400);
    res.send({error: "Invalid request"});
    return;
  }

  const id = idGenerator();
  const userID = req.params.id;
  const category = {
    id,
    ...req.body,
    userID,
  };

  const result = categoryDAO.addCategory(category);
  console.log(result);
  if (result) {
    return {category, status: 201};
  } else {
    return {status: 500, error: 'Something went wrong'}
  }
};

module.exports = addCategory;
