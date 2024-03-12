const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: { type: String, required: true, unique: true },
    eventType: { 
        type: [String],
        enum: [
            "Concert",
            "Exhibition",
            "Market",
            "Party",
            "Theatre",
            "Other",
        ],
        required: true,
    },
    imageUrl: {
        type: String,
        default: "https://www.format.com/wp-content/uploads/celebrate-event-photography.jpg",
    },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    isEighteen: { type: Boolean},
    isFree: { type: Boolean},
    price: { type: Number}, 
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;