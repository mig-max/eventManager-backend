const Event = require("../models/Event.model");
const Venue = require("../models/Venue.model");


const isOwner = async (req, res, next) => {
    const userId = req.payload._id; 

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const eventId = req.params.eventId; 
    const venueId = req.params.venueId; 

   
    console.log("User ID:", userId);
    console.log("Event ID:", eventId);
    console.log("Venue ID:", venueId);

    try {
        if (eventId) {
            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }
            if (event.author.toString() !== userId) { 
                return res.status(403).json({ message: "Forbidden" });
            }
        } else if (venueId) {
            const venue = await Venue.findById(venueId);
            if (!venue) {
                return res.status(404).json({ message: "Venue not found" });
            }
            if (venue.author.toString() !== userId) { 
                return res.status(403).json({ message: "Forbidden" });
            }
        }

        next(); 
    } catch (error) {
        console.error("Error in isOwner middleware:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { isOwner };
