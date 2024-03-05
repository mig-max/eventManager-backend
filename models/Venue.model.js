const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const venueSchema = new Schema({
    name: {type: String, required: true, unique: true},
    venueType: {
        type: String, 
        enum: ["outdoor", "indoor", "other"], required: true},
    capacity: {type: Number},
    isFoodAvaiable: {type: Boolean, required: true},
    isDrinksAvaiable: {type: Boolean, required: true},
    events: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Event"
    },
    imageUrl: {
        type: String,
        default: "https://picsum.photos/seed/picsum/200/300",
    },
    address: {type: String, required: true},
})



const Venue = model("Venue", venueSchema);

module.exports = Venue;



