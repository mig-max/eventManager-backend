const router = require("express").Router();
const mongoose = require("mongoose");

const Venue = require("../models/Venue.model");
const {isAuthenticated} = require("../middleware/jwt.middleware");
const { isVenueOwner} = require("../middleware/isOwner.js");

// POST/venues

router.post("/venues", isAuthenticated, (req, res, next) => {

    Venue.create(req.body)
    .then((createdVenue) => {
        console.log(createdVenue)
        // Sending back the created venue
        res.status(201).json(createdVenue)
    })
    .catch((error) => {
        next(error)
    });

});


// GET /venues

router.get("/venues",  (req, res, next) => {
    Venue.find()
    .populate("event")
    .then((venues) => {
        console.log(venues)
        res.status(200).json(venues)
    })
    .catch((error) => {
        next(error)
    });
});

// GET /venues/:venueId
router.get("/venues/:venueId", (req, res, next) => {
    const { venueId } = req.params;
    Venue.findById(venueId)
    .populate("event")
    .then((venue) => {
        console.log(venue)
        res.status(200).json(venue)
    })
    .catch((error) => {
        next(error)
    });
});


// PUT /venues/:venueId

router.put("/venues/:venueId", isAuthenticated, isVenueOwner, (req, res, next) => {
    const { venueId } = req.params;
    Venue.findByIdAndUpdate(venueId, req.body, {new: true})
    .then((updatedVenue) => {
        console.log(updatedVenue)
        res.status(200).json(updatedVenue)
    })
    .catch((error) => {
        next(error)
    });
});

// DELETE /venues/:venueId
router.delete("/venues/:venueId", isAuthenticated, isVenueOwner, (req, res, next) => {
    const { venueId } = req.params;
    Venue.findByIdAndDelete(venueId)
    .then((deletedVenue) => {
        console.log(deletedVenue)
        res.status(200).json(deletedVenue)
    })
    .catch((error) => {
        next(error)
    });
});


module.exports = router;
