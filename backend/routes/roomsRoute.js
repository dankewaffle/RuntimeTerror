const express = require("express");
const router = express.Router();

const Room = require("../objects/room");

router.get("/allrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ messsage: error });
  }
});

router.post("/roomid", async (req, res) => {
  const roomid = req.body.roomid;

  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ messsage: error });
  }
});

router.post("/addroom", async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();

    res.send("Added New Room Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
