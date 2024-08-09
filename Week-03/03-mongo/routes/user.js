const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { userSignupSchema } = require("../zod/userSignup");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  if (
    userSignupSchema.safeParse({
      username,
      password,
    }).success
  ) {
    const user = await User.findOne({
      username: username,
      password: password,
    });
    if (user) {
      res.json({
        message: "User Already Exists",
      });
    } else {
      try {
        await User.create({
          username: username,
          password: password,
        });
        res.status(200).json({
          message: "User created successfully",
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

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  const user = await User.findOne({
    username,
  });
  const currentCourses = user.purchasedCourses.map((id) => id.toString());
  if (!currentCourses.includes(courseId)) {
    await User.updateOne(
      {
        username,
      },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
    res.status(200).json({
      msg: "Course purchases successfully!",
    });
  } else {
    res.json({
      msg: "You already bought the course",
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  const user = await User.findOne({
    username,
  });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.status(200).json({
    courses,
  });
});

module.exports = router;
