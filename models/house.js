const mongoose = require("mongoose")
const houseSchema = mongoose.Schema({
house_number: Number,
type_of_house: String,
location: String
})
module.exports = mongoose.model("house",
houseSchema)