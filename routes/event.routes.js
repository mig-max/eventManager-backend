const express = require("express");
const router = express.Router();

const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { isEventOwner} = require("../middleware/isOwner.js");

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
        .then((event) => {
            res.status(200).json(event);
        })
        .catch((error) => {
            next(error);
        });
});

// PUT /events/:eventId // ADD: isEventOwner,

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

// DELETE /events/:eventId // ADD: isEventOwner,

router.delete("/events/:eventId", isAuthenticated,  (req, res, next) => {
    const { eventId } = req.params;

    Event.findByIdAndDelete(eventId)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            next(error);
        });
});

// Route to get events for a specific date
// GET /events/date/:date
router.get('/date/:date', async (req, res) => {
    try {
      const date = new Date(req.params.date);
      const events = await Event.find({ date: date.toISOString() });
      res.json(events);
    } catch (error) {
      console.error('Error fetching events for date:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


// GET /events/free
router.get("/events", (req, res, next) => {
    Event.find({ isFree: true }) // Filter events where isFree is true
        .populate("venue")
        .then((freeEvents) => {
            console.log("Retrieved free events ->", freeEvents); // Log the free events data to the server console
            res.status(200).json(freeEvents); // Send the free events data as JSON response
        })
        .catch((error) => {
            next(error);
        });
});


  

module.exports = router;