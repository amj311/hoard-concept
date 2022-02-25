const Ajv = require("ajv");
const categoryDAO = require("../dao/categoryDAO");
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

const deleteCategory = asyncHandler(async (req, res) => {
  const valid = validate(req);
  if (!valid) {
    console.error(validate.errors);
    res.status(400);
    res.send({error: "Invalid request"});
    return;
  }

  const deleted = await categoryDAO.deleteCategory(req.params.id);
  console.log(deleted);
  if (deleted) {
    res.status(204);
    res.send();
  } else {
    res.status(500);
    res.send({status: 500, error: 'Something went wrong'}); 
  }
});

module.exports = deleteCategory;
