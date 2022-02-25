const Ajv = require("ajv");
const accountDAO = require("../dao/accountDAO");
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

const getAccounts = asyncHandler(async (req, res) => {
  const valid = validate(req);
  if (!valid) {
    console.error(validate.errors);
    res.status(400);
    res.send({error: "Invalid request"});
    return;
  }

  const accounts = await accountDAO.getUserAccounts(req.params.id);
  console.log(accounts);
  if (accounts) {
    res.status(200);
    res.send({accounts, status: 200});
  } else {
    res.status(500);
    res.send({status: 500, error: 'Something went wrong'});
  }
});

module.exports = getAccounts;
