    const express =
     require("express");

    const router =
    express.Router();

    const Booking =
    require("../models/Booking");

   /* CREATE BOOKING */

    router.post(

    "/create",

  async (req, res) => {

    try {

        const booking =
        new Booking(req.body);

        await booking.save();

        res.json({

            success:true,

            message:
            "Booking request sent"

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

      /* MY BOOKINGS */

      router.get(

      "/my/:artistId",

     async (req, res) => {

    try {

        const bookings =
        await Booking.find({

            artistId:req.params.artistId

        })

        .sort({ createdAt:-1 });

        res.json({

            success:true,

            bookings

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

     /* DELETE BOOKING */

     router.delete(

     "/delete/:id",

     async (req, res) => {

    try {

        await Booking.findByIdAndDelete(
        req.params.id
        );

        res.json({

            success:true,

            message:
            "Booking deleted"

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }


});

module.exports =
router;              