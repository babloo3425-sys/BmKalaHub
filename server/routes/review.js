   const express =
   require("express");

   const router =
   express.Router();

   const Review =
   require("../models/Review");

   /* ADD REVIEW */

   router.post(

   "/add",

   async (req, res) => {

    try {

        const review =
        new Review(req.body);

        await review.save();

        res.json({

            success:true,

            message:
            "Review added"

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

     /* GET REVIEWS */

    router.get(

    "/:artistId",

    async (req, res) => {

    try {

        const reviews =
        await Review.find({

            artistId:req.params.artistId

        })

        .sort({ createdAt:-1 });

        res.json({

            success:true,

            reviews

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

   /* DELETE REVIEW */

      router.delete(

      "/delete/:id",

    async (req, res) => {

      try {

        await Review.findByIdAndDelete(
        req.params.id
        );

        res.json({

            success:true,

            message:
            "Review deleted"

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