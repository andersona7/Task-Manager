const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const transporter = require("../config/email");

router.use(express.json());
//dir to login
router.get("/login", (req, res) => {
    if (req.session.userId) {
        return res.redirect("/");
    }
    res.render("auth/login", { title: "Login" })
});

//dir to register
router.get("/register", (req, res) => {
    if (req.session.userId) {
        return res.redirect("/");
    }
    res.render("auth/register", { title: "Register" })
});



//register auth
router.post("/registerCheck", async (req, res) => {
    const { name, username, email, password, repassword } = req.body;

    try {
        const emailExists = await User.findOne({ email: email });
        const userExists = await User.findOne({ username: username });

        if (userExists) {
            return res.status(400).json({ msg: "Username already taken." });
        }

        if (emailExists) {
            return res.status(400).json({ msg: "Entered email is already in use." });
        }
        if (password !== repassword) {
            return res.status(400).json({ msg: "Passwords do not match!" });
        }
        const hassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000);


        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Email Verification Security Code",
            html: `<h2>Your Security code is: ${otp} </h2><p>Valid for 5 minutes.</p>`
        });
        req.session.userDetails = {
            name: name,
            username: username,
            email: email,
            password: hassword,
            otp: otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        };

        return res.status(201).json({ msg: "Security code Sent Sucessfully" });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server error" })
    }
});

router.post("/verify-otp", async (req, res) => {
    try {
        const { otp } = req.body;
        if (!req.session.userDetails || !req.session) {
            return res.status(401).json({ msg: "Timeout!" });
        }
        else if (otp != req.session.userDetails.otp) {
            return res.status(400).json({ msg: "Invalid Security code!" });
        }

        else if (Date.now() > req.session.userDetails.expiresAt) {
            return res.status(401).json({ msg: "Timeout!" });
        }
        else if (Number(otp) == req.session.userDetails.otp) {

            const user = await User.create({
                name: req.session.userDetails.name,
                username: req.session.userDetails.username,
                email: req.session.userDetails.email,
                password: req.session.userDetails.password,
            });
            delete req.session.userDetails;
            return res.status(200).json({ msg: "Registered Sucessfully!" });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error!" });
    }


});

// router.post("/resend-otp", async (req, res) => {
//     if (!req.session.userDetails) {
//         return res.status(401).json({ msg: "Timeout!" });
//     } else {
//         try {
//             const otp = Math.floor(100000 + Math.random() * 900000);


//             await transporter.sendMail({
//                 from: process.env.EMAIL_USER,
//                 to: email,
//                 subject: "Email Verification Security Code",
//                 html: `<h2>Your Security code is: ${otp} </h2><p>Valid for 5 minutes.</p>`
//             });
//             req.session.userDetails.otp=otp;
//             req.session.userDetails.expiresAt = Date.now() + 5 * 60 * 1000;
//             return res.status(201).json({ msg: "Security code Sent Sucessfully" });
//         }
//         catch(e){
//             return res.status(500).json({ msg: "Server Error!" })
//         }
//     }
// })

//login auth
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        res.status(409).json({ msg: "User not Found!" });
        return
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(401).json({ msg: "Password mismatched" });
        return;
    }

    req.session.userId = user._id;
    res.status(200).json({ msg: "Sucessfully Logged In" });

});

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
});

module.exports = router;