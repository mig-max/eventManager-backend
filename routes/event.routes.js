const express = require("express");
const router = express.Router();

const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { isOwner } = require("../middleware/isOwner");

// POST /events
router.post("/events", isAuthenticated, (req, res, next) => {
    Event.create(req.body)
    .then((newEvent) => {
        res.status(201).json(newEvent);
    })
    .catch((error) => {
        next(error);
    });
});

// GET /events

router.get("/events", (req, res, next) => {
    Event.find({})
        .populate("venue")
        .populate("author")
        .then((events) => {
            console.log("Retrieved events ->", events);
            res.json(events);
        })
        .catch((error) => {
            next(error);
        });
});

// GET /events/:eventId

router.get("/events/:eventId", (req, res, next) => {
    const { eventId } = req.params;

    Event.findById(eventId)
        .populate("venue")
        .populate("author")
        .then((event) => {
            res.status(200).json(event);
        })
        .catch((error) => {
            next(error);
        });
});

// PUT /events/:eventId // ADD: isOwner,

router.put("/events/:eventId", isAuthenticated,  (req, res, next) => {
    const { eventId } = req.params;

    Event.findByIdAndUpdate(eventId, req.body, { new: true })
        .then((updatedEvent) => {
            res.status(200).json(updatedEvent);
        })
        .catch((error) => {
            next(error);
        });
});

// DELETE /events/:eventId // ADD: isOwner,

router.delete("/events/:eventId", isAuthenticated, (req, res, next) => {
    const { eventId } = req.params;

    Event.findByIdAndDelete(eventId)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            next(error);
        });
});



// GET /events/free
router.get('/free', async (req, res) => {
    try {
        // Find events where isFree is true
        const events = await Event.find({ isFree: true });

        res.json(events);
    } catch (error) {
        console.error('Error fetching free events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get events for a specific date
///GET /events/date/:date
router.get('/date/:date', async (req, res) => {
    try {
        const date = new Date(req.params.date);
        // Find events whose time field matches the given date
        const events = await Event.find({ time: { $gte: date, $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000) } }); // This will find events for the given date

        res.json(events);
    } catch (error) {
        console.error('Error fetching events for date:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;