 let artist =
 JSON.parse(
 localStorage.getItem("artist")
 );

 const user =

 JSON.parse(

 localStorage.getItem(
 "user"
 )

);

 const dashboardArtist =
  document.getElementById(
  "dashboardArtist"
 );

 /* LOAD MY ARTIST */

async function loadMyArtist(){

    try {

        const res = await fetch(

        `https://bmkalahub-api.onrender.com/api/artist/my/${user._id}`

        );

        const data =
        await res.json();

        const artist =
        data.artist;
       
        if (artist) {

       const createBtn =
       document.getElementById(
       "createArtistBtn"
      );

     if (createBtn) {

        createBtn.style.display =
        "none";

      }

     }

        document.getElementById(
        "viewsCount"
        ).innerText =

        artist
        ? artist.views || 0
        : 0;

        document.getElementById(
        "followersCount"
        ).innerText =

        artist
        ? artist.followers || 0
        : 0;

        document.getElementById(
        "reviewsCount"
        ).innerText =

        artist
        ? artist.reviews || 0
        : 0;

        if(!artist){

            dashboardArtist.innerHTML =

            "<h2>No Artist Profile</h2>";

            return;

        }

        dashboardArtist.innerHTML = `

        <div class="dashboardCard">

            <img
            src="${
            artist.image

            ?
            
            artist.image

            :

            'https://via.placeholder.com/500x300?text=Artist'
            }">

            <div class="dashboardContent">

                <h2>
                  ${artist.name}
                </h2>

                <p>
                  ${artist.category}
                </p>

                <p>
                  ${artist.bio}
                </p>

            </div>

        </div>

        `;

    } catch(err){

        console.log(err);

    }

}

 loadMyArtist();

 /* LOGOUT */

  const dashboardLogout =
  document.getElementById(
  "dashboardLogout"
 );

 dashboardLogout.addEventListener(

 "click",

 () => {

    localStorage.clear();

    window.location.href =
    "index.html";

});

     /* VIEW PUBLIC PROFILE */

 const viewPublicBtn =
 document.getElementById(
 "viewPublicBtn"
 );

 viewPublicBtn.addEventListener(

 "click",

 () => {

    window.location.href =
    "profile.html";

});
    
      /* DELETE PROFILE */

const deleteProfileBtn =
document.getElementById(
"deleteProfileBtn"
);

deleteProfileBtn.addEventListener(

"click",

async () => {

    const confirmDelete =
    confirm(

    "Delete your artist profile?"

    );

    if(!confirmDelete) return;

    try {

        const res = await fetch(

        `https://bmkalahub-api.onrender.com/api/artist/delete/${user._id}`,

        {

            method:"DELETE"

        });

        const data =
await res.json();

alert(data.message);

window.location.href =
"index.html";

} catch(err){

    console.log(err);

}

});

/* EDIT PROFILE */

const editProfileBtn =
document.getElementById(
"editProfileBtn"
);

if (editProfileBtn) {

    editProfileBtn.addEventListener(

    "click",

    () => {

        window.location.href =
        "edit-artist.html";

    });

}

/* FEATURED */

const featuredBtn =
document.getElementById(
"featuredBtn"
);

if (featuredBtn) {

    featuredBtn.addEventListener(

    "click",

    async () => {

        try {

            const res = await fetch(

            `https://bmkalahub-api.onrender.com/api/artist/featured/${user._id}`,

            {

                method:"PUT"

            });

            const data =
            await res.json();

            if(data.featured){

                featuredBtn.innerText =
                "Featured ⭐";

            } else {

                featuredBtn.innerText =
                "Make Featured";

            }

        } catch(err){

            console.log(err);

        }

    });

 }
    /* LOAD BOOKINGS */

  async function loadBookings(){

    try {

        const res = await fetch(

        `https://bmkalahub-api.onrender.com/api/booking/my/${user._id}`

        );

        const data =
        await res.json();

        const bookingsList =
        document.getElementById(
        "bookingsList"
        );

        const bookingCount =
        document.getElementById(
        "bookingCount"
        );

        bookingsList.innerHTML = "";

        bookingCount.innerText =

        data.bookings
        ? data.bookings.length
        : 0;

        if(

        !data.bookings ||

        data.bookings.length === 0

        ){

            bookingsList.innerHTML =

            `

            <p class="noBookings">

              No booking requests yet

            </p>

            `;

            return;

        }

        data.bookings.forEach((booking) => {

        bookingsList.innerHTML += `

       <div class="bookingCard">

        <h3>
          ${booking.customerName}
        </h3>

        <p>
          ${booking.customerPhone}
        </p>

        <p>
          ${booking.eventType}
        </p>

        <p>
          ${booking.bookingDate}
        </p>

        <button
        class="deleteBookingBtn"
        data-id="${booking._id}">

          Delete

        </button>

    </div>

    `;

});

/* DELETE BOOKING */

    const deleteBookingBtns =

     document.querySelectorAll(
     ".deleteBookingBtn"
  );

     deleteBookingBtns.forEach((btn) => {

    btn.addEventListener(

    "click",

    async () => {

        const bookingId =
        btn.dataset.id;

        try {

            await fetch(

            `https://bmkalahub-api.onrender.com/api/booking/delete/${bookingId}`,

            {

                method:"DELETE"

            });

            loadBookings();

        } catch(err){

            console.log(err);

        }

    });

});

} catch(err){

    console.log(err);

}

}

loadBookings();

/* REFRESH DASHBOARD */

    async function refreshDashboard(){

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

            const followerCount =

document.getElementById(
"followerCount"
);

if(followerCount){

    followerCount.innerText =

    artist.followers || 0;

}

            const reviewCount =

document.getElementById(
"reviewCount"
);

if(reviewCount){

    reviewCount.innerText =

    artist.reviews || 0;

}
            const viewCount =

document.getElementById(
"viewCount"
);

if(viewCount){

    viewCount.innerText =

    artist.views || 0;

}
            loadBookings();

        }

    } catch(err){

        console.log(err);

    }

}

refreshDashboard();