const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: { type: String, required: true, unique: true },
    eventType: { 
        type: [String],
        enum: [
            "concert",
            "exhibition",
            "market",
            "party",
            "theatre",
            "other",
        ],
        required: true,
    },
    description: { type: String, required: true },
    time: { type: Date, required: true, default: Date.now },
    isEighteen: { type: Boolean},
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
    },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;