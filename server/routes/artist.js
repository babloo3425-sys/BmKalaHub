        const express =
        require("express");

        const router =
        express.Router();

        const Artist =
        require("../models/Artist");

        const multer =
        require("multer");

       const cloudinary =
       require("../config/cloudinary");

       const {

       CloudinaryStorage

      } = require(
       "multer-storage-cloudinary"
     );

       const storage =
       new CloudinaryStorage({

       cloudinary,

        params:{

        folder:
        "BmKalaHub"

      }

     });

       const upload =
       multer({ storage });

       /* CREATE ARTIST */

        router.post(

       "/create",

      upload.single("image"),

      async (req, res) => {
 
     try {

        const {

            userId,
            name,
            category,
            bio,
            phone

        } = req.body;
        
        const existingArtist = await Artist.findOne({
        userId
    });

        if (existingArtist) {

    return res.json({

        success:true,

        message:
        "Artist profile already exists",

        artist:existingArtist

    });

}

        const image =

        req.file

        ? req.file.path

        : "";

        const newArtist =
        new Artist({

            userId,
            name,
            category,
            bio,
            phone,
            image

        });

        await newArtist.save();

        res.json({

            success:true,

            artist:newArtist

        });

    } catch(err){

        console.log(err);

        res.json({

            success:false,
            message:err.message

        });

    }

});

         /* GET ALL ARTISTS */

router.get("/all",

async (req, res) => {

    try {

        const artists =
        await Artist.find()
        .sort({ createdAt:-1 });

        res.json({

            success:true,

            artists

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

       /* MY ARTIST */

router.get("/my/:userId",

async (req, res) => {

    try {

        const artist =
        await Artist.findOne({

            userId:req.params.userId

        });

        res.json({

            success:true,

            artist

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

       /* DELETE ARTIST */

router.delete("/delete/:userId",

async (req, res) => {

    try {

        await Artist.findOneAndDelete({

            userId:req.params.userId

        });

        res.json({

            success:true,

            message:
            "Artist deleted"

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

/* UPDATE ARTIST */

router.put(

"/update/:userId",

upload.single("image"),

async (req, res) => {

    try {

        const {

            name,
            category,
            bio,
            phone

        } = req.body;

        const updateData = {

            name,
            category,
            bio,
            phone

        };

        /* IMAGE */

        if(req.file){

            updateData.image =
            req.file.path;

        }

        const updatedArtist =

        await Artist.findOneAndUpdate(

        {

            userId:req.params.userId

        },

        updateData,

        {

            new:true

        }

        );

        res.json({

            success:true,

            message:
            "Artist updated",

            artist:updatedArtist

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});
           /* FEATURED TOGGLE */

        router.put(

        "/featured/:userId",

       async (req, res) => {

      try {

        const artist =
        await Artist.findOne({

            userId:req.params.userId

        });

        if(!artist){

            return res.json({

                success:false,

                message:
                "Artist not found"

            });

        }

        artist.featured =
        !artist.featured;

        await artist.save();

        res.json({

            success:true,

            featured:
            artist.featured

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

     /* PROFILE VIEW */

       router.put(

       "/view/:id",

     async (req, res) => {

     try {

        const artist =
        await Artist.findByIdAndUpdate(

            req.params.id,

            {

                $inc:{
                    views:1
                }

            },

            { new:true }

        );

        res.json({

            success:true,

            views:artist.views

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

      /* FOLLOW ARTIST */

     router.put(

     "/follow/:id",

    async (req, res) => {

    try {

        const artist =
        await Artist.findByIdAndUpdate(

            req.params.id,

            {

                $inc:{
                    followers:1
                }

            },

            { new:true }

        );

        res.json({

            success:true,

            followers:
            artist.followers

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

      /* ADD REVIEW */

       router.put(

      "/review/:id",

      async (req, res) => {

     try {

        const artist =
        await Artist.findByIdAndUpdate(

            req.params.id,

            {

                $inc:{
                    reviews:1
                }

            },

            { new:true }

        );

        res.json({

            success:true,

            reviews:
            artist.reviews

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

      /* RATE ARTIST */

    router.put(

     "/rate/:id",

     async (req, res) => {

    try {

        const rating =
        Number(req.body.rating);

        const artist =
        await Artist.findById(
        req.params.id
        );

        artist.rating =
        rating;

        await artist.save();

        res.json({

            success:true,

            rating:
            artist.rating

        });

    } catch(err){

        res.json({

            success:false,

            message:err.message

        });

    }

});

  /* GET SINGLE ARTIST */

      router.get(

      "/single/:id",

      async (req, res) => {

    try {

        const artist =
        await Artist.findById(
        req.params.id
        );

        res.json({

            success:true,
            artist

        });

    } catch(err){

        res.json({

            success:false,
            message:err.message

        });

    }

});

module.exports = router;