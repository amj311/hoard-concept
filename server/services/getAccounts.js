const Ajv = require("ajv");
const accountDAO = require("../dao/accountDAO");

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

const getAccounts = async (req, res) => {
  const valid = validate(req);
  if (!valid) {
    console.error(validate.errors);
    res.status(400);
    res.send({error: "Invalid request"});
    return;
  }

  const accounts = accountDAO.getUserAccounts(req.params.id);
  console.log(accounts);
  if (accounts) {
    return {accounts, status: 200};
  } else {
    return {status: 500, error: 'Something went wrong'}
  }
};

module.exports = getAccounts;
