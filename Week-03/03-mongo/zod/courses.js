const zod = require("zod");

const coursesSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  price: zod.number(),
  imageLink: zod.string(),
});

module.exports = {
  coursesSchema,
};
