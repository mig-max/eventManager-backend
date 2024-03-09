const Event = require("../models/Event.model");
const Venue = require("../models/Venue.model");

const isEventOwner = async (req, res, next) => {

    try {
        const event = await Event.findById(req.params.eventId);

        if (!event) {
            return res.status(404).json({message: "Event not found"});
        }

        if (event.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Forbidden"});
        }

        next();

    } catch (error) {
        next(error);    
    }    
};

const isVenueOwner = async (req, res, next) => {
    try {
        const venue = await Venue.findById(req.params.venueId);

        if (!venue) {
            return res.status(404).json({message: "Venue not found"});
        }

        if (venue.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Forbidden"});
        }

        next();

    } catch (error) {
        next(error);    
    }
};

   
 
module.exports = { isEventOwner, isVenueOwner }