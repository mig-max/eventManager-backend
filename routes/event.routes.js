const express = require("express");
const router = express.Router();

const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// POST /api/events
router.post("/api/events", isAuthenticated, (req, res, next) => {
    Event.create(req.body)
    .then((newEvent) => {
        res.status(201).json(newEvent);
    })
    .catch((error) => {
        next(error);
    });
});

// GET /api/events

router.get("/api/events", (req, res, next) => {
    Event.find({})
        .populate("venue")
        .then((events) => {
            console.log("Retrieved events ->", events);
            res.json(events);
        })
        .catch((error) => {
            next(error);
        });
});

// GET /api/events/:eventId

router.get("/api/events/:eventId", (req, res, next) => {
    const { eventId } = req.params;

    Event.findById(eventId)
        .populate("venue")
        .then((event) => {
            res.status(200).json(event);
        })
        .catch((error) => {
            next(error);
        });
});

// PUT /api/events/:eventId

router.get("/api/events/:eventId", isAuthenticated, (req, res, next) => {
    const { eventId } = req.params;

    Event.findByIdAndUpdate(eventId, req.body, { new: true })
        .then((updatedEvent) => {
            res.status(200).json(updatedEvent);
        })
        .catch((error) => {
            next(error);
        });
});

// DELETE /api/events/:eventId

router.get("/api/events/:eventId", isAuthenticated, (req, res, next) => {
    const { eventId } = req.params;

    Event.findByIdAndDelete(eventId)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            next(error);
        });
});


module.exports = router;