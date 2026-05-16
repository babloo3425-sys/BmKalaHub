const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();

const authRoutes =

require("./routes/auth");

const artistRoutes =
require("./routes/artist");

const bookingRoutes =
require("./routes/booking");

const reviewRoutes =
require("./routes/review");

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

app.use(

"/uploads",

express.static("uploads")

);
app.use("/api/auth",
authRoutes);

app.use("/api/artist",
artistRoutes);

app.use(
"/api/booking",
bookingRoutes
);

app.use(
"/api/review",
reviewRoutes
);

/* DATABASE */

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((err) => {

    console.log(err);

});

/* TEST ROUTE */

app.get("/", (req, res) => {

    res.send("BmKalaHub Server Running");

});

/* PORT */

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
      `Server running on port ${PORT}`
    );

});