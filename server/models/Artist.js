     const mongoose = require("mongoose");

     const artistSchema =
     new mongoose.Schema({

     userId: {
     type: String,
     required: true,
     unique: true
    },

     name:String,

     category:String,

     bio:String,

     phone:String,

      rating:{
      type:Number,
      default:0
     },

      reviews:{
      type:Number,
      default:0
      },

      followers:{
      type:Number,
      default:0
     },

      views:{
      type:Number,
      default:0
     },

       featured:{
     
       type:Boolean,
    
       default:false
    },

      image:String,

        createdAt:{

        type:Date,

        default:Date.now

    }

 });

     module.exports =
     mongoose.model("Artist", artistSchema);