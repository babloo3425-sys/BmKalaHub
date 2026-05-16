const express = require("express");

const router = express.Router();

const User =
require("../models/User");

/* SIGNUP */

router.post("/signup", async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        /* CHECK USER */

        const existingUser =
        await User.findOne({ email });

        if(existingUser){

            return res.json({

                success:false,

                message:
                "Email already exists"

            });

        }

        /* CREATE USER */

        const newUser = new User({

            name,
            email,
            password

        });

        await newUser.save();

        res.json({

            success:true,

            message:
            "Signup successful"

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

          /* LOGIN */

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
        await User.findOne({

            email,
            password

        });

        if(!user){

            return res.json({

                success:false,

                message:
                "Invalid email or password"

            });

        }

        res.json({

            success:true,

            message:
            "Login successful",

            user

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

module.exports = router;