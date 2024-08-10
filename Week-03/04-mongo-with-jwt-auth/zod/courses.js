const zod = require("zod");

const courseSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  imageLink: zod.string(),
  price: zod.number(),
});

module.exports = {
  courseSchema,
};
