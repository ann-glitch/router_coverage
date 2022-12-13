const mongoose = require("mongoose");

const CoverageSchema = new mongoose.Schema({
  router_number: {
    type: String,
    unique: true,
    minLength: [4, "Router number should atleast be more than 4 characters"],
    required: [true, "Please add a router number"],
  },

  latitude: {
    type: String,
    required: [true, "Please add a latitude"],
  },

  longitude: {
    type: String,
    required: [true, "Please add a longitude"],
  },

  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Coverage", CoverageSchema);
