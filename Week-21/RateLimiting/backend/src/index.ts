import express from "express";
import { rateLimit } from 'express-rate-limit';


const app = express();

app.use(express.json());

// Store OTPs in a simple in-memory object
const otpStore: Record<string, string> = {};

const otplimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: 'Too many OTP requests from this IP, please try again after 5 minutes',
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

const passwordResetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 3, // Limit each IP to 3 requests per `window` (here, per 15 minutes).
    message: 'Too many password reset attempts from this IP, please try again after 15 minutes',
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});

// Apply the rate limiting middleware to all requests.
// app.use(limiter)


app.post('/generate-otp', otplimiter, (req, res)=>{
    const email = req.body.email;
    if(!email){
        return res.status(400).json({
            message: "Email is required"
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    console.log(`OTP for ${email} is ${otp}`);
    res.status(200).json({
        message: "OTP generated and logged"
    });  
});

app.post('/reset-password', passwordResetLimiter, (req, res) => {
    const { email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.status(400).json({
            message: "Email, OTP and new Password are required"
        })
    }

    if(otpStore[email] === otp){
        console.log(`Password for ${email} has been reset to: ${newPassword}`);
        delete otpStore[email];
        res.status(200).json({
            message: "Password has been reset successfully"
        });
    }else{
        res.status(401).json({
            message: "Invalid Otp"
        });
    }
});

app.listen(3000, () =>{
    console.log("Server is running at Port 3000 ✅")
})
