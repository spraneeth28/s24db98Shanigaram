const mongoose = require("mongoose")

const houseSchema = mongoose.Schema({
    house_number: {
      type: Number,
      required: true,
      min: 10,
      max: 2999,
    },
    type_of_house: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    location: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 100,
    },

  });

module.exports = mongoose.model("house",
houseSchema)