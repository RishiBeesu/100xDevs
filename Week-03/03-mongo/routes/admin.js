const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const { userSignupSchema } = require("../zod/userSignup");
const { coursesSchema } = require("../zod/courses");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  if (
    userSignupSchema.safeParse({
      username,
      password,
    }).success
  ) {
    const user = await Admin.findOne({
      username: username,
      password: password,
    });
    if (user) {
      res.json({
        message: "User Already Exists",
      });
    } else {
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
    }
  } else {
    res.json({
      msg: "Invalid Inputs",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = parseInt(req.body.price);
  const imageLink = req.body.imageLink;
  if (
    coursesSchema.safeParse({
      title,
      description,
      price,
      imageLink,
    }).success
  ) {
    const newCourse = await Course.create({
      title,
      description,
      price,
      imageLink,
    });
    res.status(200).json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } else {
    res.json({
      msg: "Invalid Inputs",
    });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

module.exports = router;
