const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const venueSchema = new Schema({
    name: {type: String, required: true, unique: true},
    venueType: {
        type: String, 
        enum: ["Outdoor", "Indoor", "Other"], required: true},
    capacity: {type: Number},
    isFoodAvailable: {type: Boolean},
    isDrinksAvailable: {type: Boolean},
    event: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Event"
    },
    imageUrl: {
        type: String,
        default: "https://memo.thevendry.com/wp-content/uploads/2022/06/iStock-13447299461.jpg",
    },
    address: {
        type: String, 
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }

})



const Venue = model("Venue", venueSchema);

module.exports = Venue;



