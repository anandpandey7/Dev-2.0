const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const { JWT_SECRET } = require("../config");
const zod = require("zod");

const userSignupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try{
        const result = userSignupSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                msg: "Invalid request",
                errors: result.error.format()
            });
        }
        const {username, password} = req.body;
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({
                msg: "User already exists"
            });
        }
        const newUser = new User({username, password});
        await newUser.save();
        res.status(201).json({
            msg: "User created successfully"
        });
    }
    catch(err){
        res.status(500).json({
            msg: "Error creating user",
            error: err.message
        });
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const result = userSignupSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            msg: "Invalid request",
            errors: result.error.format()
        });
    }
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username, password});
        if(!user){
            return res.status(401).json({
                msg: "Invalid username or password"
            });
        }
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({username: user.username}, JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({
            message: "User signed in successfully",
            token: token
        });
    }
    catch(err){
        res.status(500).json({
            msg: "Error signing in",
            error: err.message
        });
    }
});

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    try{
        const courses = await Course.find({});
        res.status(200).json({
            courses: courses
        });
    }
    catch(err){
        res.status(500).json({
            msg: "Error fetching courses",
            error: err.message
        });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try {
    const { courseId } = req.params;
    const username = req.username;

    // Validate course existence
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Validate user existence
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(403).json({ msg: "User does not exist" });
    }

    // Check if user already purchased this course
    if (user.purchaseCourses.includes(courseId)) {
      return res.status(400).json({ msg: "Course already purchased" });
    }

    // Add course to user's purchaseCourses array
    await User.updateOne(
      { username },
      { $push: { purchaseCourses: courseId } }
    );

    return res.status(200).json({
      msg: "Course purchased successfully",
      course: {
        id: course._id,
        title: course.title,
        price: course.price
      }
    });
  } catch (err) {
    console.error("❌ Error purchasing course:", err.message);
    return res.status(500).json({
      msg: "Error purchasing course",
      error: err.message
    });
  }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    try{
        const username = req.username;
        const user = await User.findOne({username}).populate('purchaseCourses');
        if(!user){
            return res.status(403).json({
                msg: "User does not exist"
            });
        }
        const courses = user.purchaseCourses;
        res.status(200).json({
            purchasedCourses: courses
        });
    }
    catch(err){
        res.status(500).json({
            msg: "Error fetching purchased courses",
            error: err.message
        });
    }
});

module.exports = router