const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    roomID: {
      type: String,
      required: true,
    },
    accountID: {
      type: String,
      required: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    transactionID: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "booked",
    },
  },
  {
    timestamps: true,
  }
);

const bookingObject = mongoose.model("bookings", bookingSchema);

module.exports = bookingObject;
