const express = require("express");
const router = express.Router();

const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { isOwner } = require("../middleware/isOwner");

// POST /events
router.post("/events", isAuthenticated, (req, res, next) => {
   
    const userId = req.payload._id;
    req.body.author = userId; 
    console.log("Author:", userId);

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

// PUT /events/:eventId 
router.put("/events/:eventId", isAuthenticated, isOwner, (req, res, next) => {
    const { eventId } = req.params;

    Event.findByIdAndUpdate(eventId, req.body, { new: true })
        .then((updatedEvent) => {
            res.status(200).json(updatedEvent);
        })
        .catch((error) => {
            next(error);
        });
});

// DELETE /events/:eventId 

router.delete("/events/:eventId", isAuthenticated, isOwner, (req, res, next) => {
   
    const { eventId } = req.params;
    const userId = req.payload._id;
    req.body.author = userId;  
    
    console.log("Author:", userId);
    console.log("Event ID to delete:", eventId);
    

    Event.findByIdAndDelete(eventId)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            next(error);
        });
});


// GET /events/free
router.get('/events/free', async (req, res) => {
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
router.get('/events/date/:date', async (req, res) => {
    try {
        const date = new Date(req.params.date);
        console.log(req.params.date);
        // Find events whose time field matches the given date
       // const events = await Event.find({ date: { $gte: date, $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000) } }); // This will find events for the given date

       const events = await Event.find({date:req.params.date})
       console.log("event:", events)

        res.json(events);
    } catch (error) {
        console.log('Error fetching events for date:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /users/events/:userid
router.get("/users/events/:userId", isAuthenticated, async (req, res, next) => {
    try {
      const { userId } = req.params;
      if (userId !== req.payload._id) {
        return res.status(403).json({ error: "Unauthorized to access events" });
      }
  
      const events = await Event.find({ author: userId })
        .populate("venue")
        .select("title description date eventType imageUrl"); 
  
      res.json(events);
    } catch (error) {
      next(error);
    }
  });
  

module.exports = router;