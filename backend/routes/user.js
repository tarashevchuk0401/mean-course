const express = require("express");
const bcrypt = require('bcrypt')

const User = require("../models/user.model");

const router = express.Router();

router.post("/signup", (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10 )
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
        })
        user.save()
        .then(result => {
            res.status(200).json({
                message: 'User created ',
                result: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
    })
})


module.exports = router;
