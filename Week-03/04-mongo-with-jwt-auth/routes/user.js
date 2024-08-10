const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { userSignSchema } = require("../zod/userSign");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../secret");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
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
  const user = await User.findOne({
    username,
    password,
  });
  if (user) {
    res.json({
      msg: "User already exists",
    });
    return;
  }
  try {
    await User.create({
      username,
      password,
    });
    res.status(200).json({
      msg: "User created successfully!",
    });
  } catch (e) {
    res.json({
      msg: "Internal error!",
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
  const user = await User.findOne({
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

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.status(200).json({
    courses,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.username;
  try {
    const user = await User.findOne({
      username,
    });
    const currentCourses = user.purchasedCourses.map((course) =>
      course.toString()
    );
    if (currentCourses.includes(courseId)) {
      res.json({
        msg: "Course already purchased",
      });
      return;
    }
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
      msg: "Course purchased successfully!",
    });
  } catch (e) {
    res.json({
      msg: "Internal error",
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.username;
  try {
    const user = await User.findOne({
      username,
    });
    if (user.purchasedCourses.length === 0) {
      res.json({
        courses: [],
      });
      return;
    }
    const courses = await Course.find({
      _id: {
        $in: user.purchasedCourses,
      },
    });
    res.status(200).json({
      courses,
    });
  } catch (e) {
    console.log(e);
    res.json({
      msg: "Internal Error",
    });
  }
});

module.exports = router;
