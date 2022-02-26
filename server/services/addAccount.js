const Ajv = require("ajv");
const idGenerator = require("../util/idGenerator");
const asyncHandler = require("../util/asyncHandler");
const accountDAO = require("../dao/accountDAO");

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

const addAccount = asyncHandler(async (req, res) => {
  const valid = validate(req);
  if (!valid) {
    console.error(validate.errors);
    res.status(400);
    res.send({error: "Invalid request"});
    return;
  }

  const id = idGenerator();
  const userID = req.params.id;
  const account = {
    id,
    ...req.body,
    userID,
  };

  const result = await accountDAO.addAccount(account);
  if (result) {
    res.status(201);
    res.send({account, status: 201});
  } else {
    res.status(500);
    res.send({status: 500, error: 'Something went wrong'});
  }
});

module.exports = addAccount;
