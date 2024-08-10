const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { userSignSchema } = require("../zod/userSign");
const { courseSchema } = require("../zod/courses");
const router = Router();
const { jwtPassword } = require("../secret");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  if (
    !userSignSchema.safeParse({
      username,
      password,
    }).success
  ) {
    res.json({
      msg: "Invalid Inputs",
    });
    return;
  }
  const user = await Admin.findOne({
    username,
    password,
  });
  if (user) {
    res.json({
      msg: "User already exists!",
    });
    return;
  }
  try {
    await Admin.create({
      username: username,
      password: password,
    });
    res.status(200).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Error",
    });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  if (
    !userSignSchema.safeParse({
      username,
      password,
    }).success
  ) {
    res.json({
      msg: "Invalid Inputs",
    });
    return;
  }
  const user = await Admin.findOne({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign({ username }, jwtPassword);
    res.status(200).json({
      token,
    });
  } else {
    res.json({
      msg: "No user present with given credentials",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  if (
    !courseSchema.safeParse({
      title,
      description,
      imageLink,
      price,
    }).success
  ) {
    res.json({
      msg: "Invalid Inputs",
    });
    return;
  }
  try {
    const course = await Course.create({
      title,
      description,
      imageLink,
      price,
    });
    res.status(200).json({
      msg: `Course created successfully', courseId: ${course._id}`,
    });
  } catch (e) {
    res.json({
      msg: "Internal Error",
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

module.exports = router;
