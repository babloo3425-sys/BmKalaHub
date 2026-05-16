   const mongoose =
   require("mongoose");

   const bookingSchema =
   new mongoose.Schema({

    artistId:String,

    customerName:String,

    customerPhone:String,

    eventType:String,

    bookingDate:String,

    createdAt:{

        type:Date,

        default:Date.now

    }

});

   module.exports =
   mongoose.model(
   "Booking",
    bookingSchema
);