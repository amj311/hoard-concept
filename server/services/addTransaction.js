const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const idGenerator = require("../util/idGenerator");
const transactionDAO = require("../dao/transactionDAO");
const asyncHandler = require("../util/asyncHandler");

const ajv = new Ajv();
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        type: {
          enum: ['Income', 'Expense', 'Transfer']
        },
        amount: {
          type: "integer",
          minimum: 1
        },
        memo: {
          type: "string",
          maxLength: 100
        },
        frequencyType: {
          type: "string",
          maxLength: 50
        },
        frequencyPeriod: {
          type: "integer",
        },
        startDate: {
          type: "string",
          format: "date"
        },
        endDate: {
          type: "string",
          format: "date"
        },
        targetAccount: {
          type: "string"
        },
        originAccount: {
          type: "string"
        },
        categoryID: {
          type: "string"
        }
      },
      required: ["type", "amount", "frequencyType", "frequencyPeriod", "startDate", "targetAccount"],
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

const addTransaction = asyncHandler(async (req, res) => {
  const valid = validate(req);
  if (!valid) {
    console.error(validate.errors);
    res.status(400);
    res.send({error: "Invalid request"});
    return;
  }

  const id = idGenerator();
  const userID = req.params.id;
  const transaction = {
    id,
    ...req.body,
    userID,
  };

  const result = await transactionDAO.addTransaction(transaction);
  console.log(result);
  if (result) {
    res.status(201);
    res.send({transaction, status: 201});
  } else {
    res.status(500);
    res.send({status: 500, error: 'Something went wrong'});
  }
});

module.exports = addTransaction;
