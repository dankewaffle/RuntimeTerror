const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    costpernight: {
      type: Number,
      required: true,
    },
    imageurls: [],
    bookedrooms: [],
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const roomObject = mongoose.model("rooms" , roomSchema);

module.exports = roomObject;
