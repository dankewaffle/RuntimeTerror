const express = require("express");
const router = express.Router();
const Booking = require("../objects/booking");
const moment = require("moment");
const Room = require("../objects/room");

router.post("/book", async (req, res) => {
  const { room, accountID, checkIn, checkOut, totalCost, duration } = req.body;

  try {
    const newBooking = new Booking({
      room: room.name,
      roomID: room._id,
      accountID,
      checkIn: moment(checkIn).format("MM-DD-YYYY"),
      checkOut: moment(checkOut).format("MM-DD-YYYY"),
      totalCost,
      duration,
      transactionID: "1234",
    });

    const booking = await newBooking.save();

    const tempRoom = await Room.findOne({ _id: room._id });

    tempRoom.bookedrooms.push({
      bookingID: booking._id,
      checkIn: moment(checkIn).format("MM-DD-YYYY"),
      checkOut: moment(checkOut).format("MM-DD-YYYY"),
      accountID: accountID,
      status: booking.status,
    });

    await tempRoom.save();

    res.send("Room Booked Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
