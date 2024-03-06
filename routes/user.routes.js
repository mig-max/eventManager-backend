const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// GET /api/users/:userId - Get user by id
router.get("/api/users/:userId", isAuthenticated, (req, res, next) => {
    const { userId } = req.params;
    User.findById(userId)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            next(error);
        });
});

// PUT /api/users/:userId - Update user by id
router.put("/api/users/:userId", isAuthenticated, (req, res, next) => {
    const { userId } = req.params;
    User.findByIdAndUpdate(userId, req.body, { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;

