const mongoose = require("mongoose");

// eventually put in process.env
var mongoURL =
  "mongodb+srv://admin:admin@cluster0.7ngjt0e.mongodb.net/hotel-rooms";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log(`Mongo Database connection failed`);
});

connection.on("connected", () => {
  console.log(`Mongo Database connection successful`);
});

module.exports = mongoose;