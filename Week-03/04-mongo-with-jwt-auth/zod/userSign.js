const zod = require("zod");

const userSignSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

module.exports = {
  userSignSchema,
};
