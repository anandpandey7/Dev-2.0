const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const jwt = require('jsonwebtoken');
// const JWT_SECRET = require('../index');
// const { JWT_SECRET } = require("../index");
const { JWT_SECRET } = require("../config");
const router = Router();


// problem faced -> circular dependency
// solution -> export as an object & destructure where needed created config.js to remove circular dependency issues


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
router.post('/signup', async(req, res) => {
    // // Implement admin signup logic
    // const result = adminSignupSchema.safeParse(req.body);
    // if (!result.success) {
    //     return res.status(400).json({
    //         msg: "Invalid request",
    //         errors: result.error.format()
    //     });
    // }
    // // hi
    // const username = req.body.username;
    // const password = req.body.password;

    // Admin.findOne({username})
    //     .then((admin)=>{
    //         if(admin){
    //             return res.status(400).json({
    //                 msg: "Admin already exists"
    //             });
    //         }
    //     });


    // const newAdmin = new Admin({
    //     username,
    //     password
    // });

    // newAdmin.save()
    //     .then(() => {
    //         res.status(201).json({
    //             msg: "Admin created successfully"
    //         });
    //     })
    //     .catch((err) => {
    //         res.status(500).json({
    //             msg: "Error creating admin",
    //             error: err.message
    //         });
    //     });

    try {
        // Zod validation
        const result = adminSignupSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                msg: "Invalid request",
                errors: result.error.format()
            });
        }

        const { username, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            return res.status(400).json({
                msg: "Admin already exists"
            });
        }

        // Create new admin
        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        return res.status(201).json({
            msg: "Admin created successfully"
        });

    } catch (err) {
        return res.status(500).json({
            msg: "Error creating admin",
            error: err.message
        });
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    try{
        const result = adminSignupSchema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                msg: "Invalid request",
                errors: result.error.format()
            });
        }

        const {username, password} = result.data;

        const admin = await Admin.findOne({username, password});

        if(!admin){
            return res.status(401).json({
                msg: "Invalid username or password"
            });
        }
        const token = jwt.sign({username: admin.username}, JWT_SECRET, {expiresIn: '1h'});

        return res.status(200).json({
            msg: "Signin successful",
            token
        });
    } catch (err) {
        return res.status(500).json({
            msg: "Error signing in",
            error: err.message
        });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
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
    // Implement fetching all courses logic
    try {
        const courses = await Course.find();
        res.status(200).json({ courses });
    } catch (err) {
        res.status(500).json({
            msg: "Error fetching courses",
            error: err.message
        });
    }
});

module.exports = router;
