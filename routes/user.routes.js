const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// GET /users/:userId - Get user by id
router.get("/users/:userId", isAuthenticated, (req, res, next) => {
    const { userId } = req.params;
    User.findById(userId)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            next(error);
        });
});

// PUT /users/:userId - Update user by id
router.put("/users/:userId", isAuthenticated, (req, res, next) => {
    const { userId } = req.params;
    User.findByIdAndUpdate(userId, req.body, { new: true })
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((error) => {
            next(error);
        });
});

// DELETE /users/:userId - Delete user by id
router.delete("/users/:userId", isAuthenticated, (req, res, next) => {
    const { userId } = req.params;
    User.findByIdAndDelete(userId)
        .then((deletedUser) => {
            res.json(deletedUser);
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;

