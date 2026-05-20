let artist =
JSON.parse(localStorage.getItem("artist"));

document.getElementById(
"profileImg"
).src =

artist.image

?

artist.image

:

'https://via.placeholder.com/400x300?text=Artist';

document.getElementById("profileName")
.innerText = artist.name;

document.getElementById("profileCategory")
.innerText = artist.category;

document.getElementById("profileBio")
.innerText = artist.bio;

document.getElementById(
"profileFollowers"
).innerText =

artist.followers
? artist.followers
: 0;

document.getElementById(
"profileRating"
).innerText =

artist.rating
? artist.rating
: 0;

/* WHATSAPP */

const whatsappBtn =
document.getElementById(
"whatsappBtn"
);

whatsappBtn.addEventListener(

"click",

() => {

    const cleanPhone =

    artist.phone.replace(/\D/g,"");

    window.open(

    `https://wa.me/91${cleanPhone}`,

     "_blank"

    );

    });

    /* BOOKING FORM */

    const bookArtistBtn =
    document.getElementById(
     "bookArtistBtn"
   );

    const bookingForm =
    document.querySelector(
    ".bookingForm"
  );

     bookArtistBtn.addEventListener(

     "click",

   () => {

    bookingForm.style.display =
    "flex";

});

     /* SEND BOOKING */

   bookingForm.innerHTML += `

   <button id="sendBookingBtn">

    Send Booking Request

  </button>

 `;

   const sendBookingBtn =
   document.getElementById(
   "sendBookingBtn"
  );

   sendBookingBtn.addEventListener(

  "click",

  async () => {

    const customerName =
    document.getElementById(
    "customerName"
    ).value;

    const customerPhone =
    document.getElementById(
    "customerPhone"
    ).value;

    const eventType =
    document.getElementById(
    "eventType"
    ).value;

    const bookingDate =
    document.getElementById(
    "bookingDate"
    ).value;

    try {

        const res = await fetch(

        "https://bmkalahub-api.onrender.com/api/booking/create",

        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:JSON.stringify({

                artistId:artist.userId,

                customerName,
                customerPhone,
                eventType,
                bookingDate

            })

        });

        const data =
        await res.json();

        loadReviews();

       document.getElementById(
       "reviewName"
      ).value = "";

       document.getElementById(
       "reviewText"
      ).value = "";

    /* AUTO OPEN DASHBOARD */

      window.location.href =
      "dashboard.html";


    } catch(err){

        console.log(err);

    }

});

      /* PROFILE VIEW */

      async function increaseViews(){

     try {

        await fetch(

        `https://bmkalahub-api.onrender.com/api/artist/view/${artist._id}`,

        {

            method:"PUT"

        });

    } catch(err){

        console.log(err);

    }

}

 increaseViews();

     /* FOLLOW */

     const followedArtists =

      JSON.parse(

      localStorage.getItem(
      "followedArtists"
      )

      ) || [];


      const followBtn =
      document.getElementById(
     "followBtn"
     );

      if(

      followedArtists.includes(
      artist._id
     )

    ){

       followBtn.innerText =
       "Following";

       followBtn.disabled =
       true;

      }
    
      followBtn.addEventListener(

      "click",

     async () => {

     try {

        const res = await fetch(

        `https://bmkalahub-api.onrender.com/api/artist/follow/${artist._id}`,

        {

            method:"PUT"

        });

        const data =
        await res.json();

        followBtn.innerText =

        `Following (${data.followers})`;

         artist.followers =
         data.followers;

         localStorage.setItem(

         "artist",

         JSON.stringify(
         artist
        )

       );

        document.getElementById(
        "profileFollowers"
        ).innerText =

        data.followers;

        followedArtists.push(
        artist._id
       );

        localStorage.setItem(

        "followedArtists",

        JSON.stringify(
        followedArtists
      )

     );

       followBtn.disabled = true;

    } catch(err){

        console.log(err);

    }

});

       /* REVIEW */

     const reviewedArtists =

     JSON.parse(

     localStorage.getItem(
     "reviewedArtists"
     )

    ) || [];

     const reviewBtn =
     document.getElementById(
     "reviewBtn"
     );

      if(

       reviewedArtists.includes(
       artist._id
     )

     ){

      reviewBtn.innerText =
      "Reviewed";

      reviewBtn.disabled =
      true;

     }

     reviewBtn.addEventListener(

     "click",

     async () => {

     try {

        const res = await fetch(

        `https://bmkalahub-api.onrender.com/api/artist/review/${artist._id}`,

        {

            method:"PUT"

        });

        const data =
        await res.json();

        reviewBtn.innerText =

        `Reviewed (${data.reviews})`;

        reviewedArtists.push(
        artist._id
      );

         localStorage.setItem(

        "reviewedArtists",

        JSON.stringify(
        reviewedArtists
)

      );

       reviewBtn.disabled = true;

     } catch(err){

        console.log(err);

     }

 });

       /* PROFILE BOOKINGS */

       async function loadProfileBookings(){

    
        try {

        const res = await fetch(

        `https://bmkalahub-api.onrender.com/api/booking/my/${artist.userId}`

        );

        const data =
        await res.json();

        document.getElementById(
        "profileBookings"
        ).innerText =

        data.bookings
        ? data.bookings.length
        : 0;


    } catch(err){

        console.log(err);

    }

}

loadProfileBookings();

/* STAR RATING */

const ratedArtists =

JSON.parse(

localStorage.getItem(
"ratedArtists"
)

) || [];

const starBtns =
document.querySelectorAll(
".starBtn"
);

if(

ratedArtists.includes(
artist._id
)

){

    starBtns.forEach((btn) => {

        btn.disabled = true;

    });

}

starBtns.forEach((btn) => {

    btn.addEventListener(

    "click",

    async () => {

        if(

        ratedArtists.includes(
        artist._id
        )

        ){

            return;

        }

        const rating =
        Number(
        btn.dataset.rating
        );

        try {

            const res = await fetch(

            `https://bmkalahub-api.onrender.com/api/artist/rate/${artist._id}`,

            {

                method:"PUT",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:JSON.stringify({

                    rating:rating

                })

            });

            const data =
            await res.json();

            if(data.success){

                document.getElementById(
                "profileRating"
                ).innerText =

                data.rating;

                ratedArtists.push(
                artist._id
                );

                localStorage.setItem(

                "ratedArtists",

                JSON.stringify(
                ratedArtists
                )

                );

                starBtns.forEach((btn) => {

                    btn.disabled = true;

                });

            }

        } catch(err){

            console.log(err);

        }

    });

});
      /* SEND REVIEW */

     const sendReviewBtn =
     document.getElementById(
     "sendReviewBtn"
    );

    sendReviewBtn.addEventListener(

    "click",

   async () => {

    const customerName =

    document.getElementById(
    "reviewName"
    ).value;

    const reviewText =

    document.getElementById(
    "reviewText"
    ).value;

    if(

    !customerName ||

    !reviewText

    ){

        return alert(
        "Fill all fields"
        );

    }

    try {

        const res = await fetch(

        "https://bmkalahub-api.onrender.com/api/review/add",

        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:JSON.stringify({

                artistId:
                artist._id,

                customerName,

                reviewText

            })

        });

        const data =
        await res.json();

        loadReviews();

      document.getElementById(
      "reviewName"
     ).value = "";

     document.getElementById(
     "reviewText"
     ).value = "";

    } catch(err){

        console.log(err);

    }

});

   /* LOAD REVIEWS */

   async function loadReviews(){

    try {

        const res = await fetch(

        `https://bmkalahub-api.onrender.com/api/review/${artist._id}`

        );

        const data =
        await res.json();

        const reviewsList =
        document.getElementById(
        "reviewsList"
        );

        reviewsList.innerHTML = "";

        data.reviews.forEach((review) => {

            reviewsList.innerHTML += `

            <div class="reviewCard">

                <h3>
                  ${review.customerName}
                </h3>

                <p>
                  ${review.reviewText}
                </p>

                <button
                class="deleteReviewBtn"
                data-id="${review._id}">

                  Delete

                </button>

            </div>

            `;

        });

        const deleteBtns =

        document.querySelectorAll(
        ".deleteReviewBtn"
        );

        deleteBtns.forEach((btn) => {

            btn.addEventListener(

            "click",

            async () => {

                const reviewId =
                btn.dataset.id;

                try {

                    await fetch(

                    `https://bmkalahub-api.onrender.com/api/review/delete/${reviewId}`,

                    {

                        method:"DELETE"

                    });

                    loadReviews();

                } catch(err){

                    console.log(err);

                }

            });

        });

    } catch(err){

        console.log(err);

    }

}

loadReviews();

      /* REFRESH ARTIST */

     async function refreshArtist(){

      try {

        const res = await fetch(

        `https://bmkalahub-api.onrender.com/api/artist/single/${artist._id}`

        );

        const data =
        await res.json();

        if(data.success){

            artist = data.artist;

            localStorage.setItem(

            "artist",

            JSON.stringify(
            artist
            )

            );

            document.getElementById(
            "profileFollowers"
            ).innerText =

            artist.followers || 0;

            document.getElementById(
            "profileRating"
            ).innerText =

            artist.rating || 0;

        }

    } catch(err){

        console.log(err);

    }

}

refreshArtist();

    