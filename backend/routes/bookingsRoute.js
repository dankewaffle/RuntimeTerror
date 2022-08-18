const express = require("express");
const router = express.Router();
const Booking = require("../objects/booking");
const moment = require("moment");
const Room = require("../objects/room");
const stripe = require("stripe")(
  "sk_test_51LWnWELbmQqDgABXWmtRKxysW53TGqJZaJVeM8kJjNvfw5IA5h67nhctgEUXMXwfz47DXXmAkbZJsIEk3OhPh3gB00Su6f93m7"
);
const { v4: uuidv4 } = require("uuid");

router.post("/book", async (req, res) => {
  const { room, accountID, checkIn, checkOut, totalCost, duration, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalCost * 100,
        customer: customer.id,
        currency: "USD",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
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
    }

    res.send("Room booked successfully.  Payment received through Stripe gateway.");
  } catch (error) {
    return res.send({ error });
  }
});

module.exports = router;
