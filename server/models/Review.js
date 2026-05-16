   const mongoose =
   require("mongoose");

   const reviewSchema =
    new mongoose.Schema({

    artistId:String,

    customerName:String,

    reviewText:String,

    createdAt:{

        type:Date,

        default:Date.now

    }

});

module.exports =
mongoose.model(
"Review",
reviewSchema
);