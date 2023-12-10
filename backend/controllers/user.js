const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const User = require("../models/user.model");


exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
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
                        message: "Invalid auth credentials"
                    })
                })
        })
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "auth failed"
                })
            }
            const token = jwt.sign({
                email: fetchedUser.email,
                userId: fetchedUser._id
            }, 'secret_this_should_be_longer', { expiresIn: "1h" });
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id,
            })
        })
        .catch(err => {
           return  res.status(500).json({
                message: "Invalid auth credentials"
            })
        })
}