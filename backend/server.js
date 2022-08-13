const express = require("express");

const app = express();

const dbConfig = require("./database");
const roomsRoute = require("./routes/roomsRoute");
const accountsRoute = require("./routes/accountsRoute");

app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/accounts", accountsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node Server Started using nodemon`));
