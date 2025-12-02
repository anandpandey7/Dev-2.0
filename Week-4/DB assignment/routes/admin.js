const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();

const zod = require("zod");
const courseSchema = zod.object({
    title: zod.string(),
    description: zod.string().min(10),
    price: zod.number().min(0),
    imageLink: zod.string().url()
});
const adminSignupSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(5)
});

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const result = adminSignupSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            msg: "Invalid request",
            errors: result.error.format()
        });
    }
    // hi
    const username = req.body.username;
    const password = req.body.password;

    // Implement admin signup logic
    // You can use the Admin model from db/index.js to save the admin details to the database

    const newAdmin = new Admin({
        username,
        password
    });

    // check if admin already exists
    Admin.findOne({ username })
        .then((admin) => {
            if (admin) {
                return res.status(400).json({
                    msg: "Admin already exists"
                });
            }
        });
    newAdmin.save()
        .then(() => {
            res.status(201).json({
                msg: "Admin created successfully"
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: "Error creating admin",
                error: err.message
            });
        });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const result = courseSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            msg: "Invalid request",
            errors: result.error.format()
        });
    }

    const { title, description, price, imageLink } = result.data;

    try {
        const existingCourse = await Course.findOne({ title });
        if (existingCourse) {
            return res.status(400).json({
                msg: "Course with this title already exists"
            });
        }

        const newCourse = new Course({ title, description, price, imageLink });
        await newCourse.save();

        res.status(201).json({
            msg: "Course created successfully",
            courseId: newCourse._id
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error creating course",
            error: err.message
        });
    }
});


router.get('/courses', adminMiddleware, async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({
            msg: "Courses fetched successfully",
            courses
        });
    } 
    catch (err) {
        res.status(500).json({
            msg: "Error fetching courses",
            error: err.message
        });
    }
});

module.exports = router;