const express = require("express");
const router = express.Router();

const Room = require('../rooms/room')



router.get("/allrooms", async(req, res) => {

    try {
        const rooms = await Room.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ messsage : error })
    }

});

module.exports = router;