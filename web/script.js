 let allArtists = [];    

const viewBtns =
document.querySelectorAll(".viewBtn");

viewBtns.forEach((btn, index) => {

    btn.addEventListener("click", () => {

        localStorage.setItem(

        "artist",

        JSON.stringify(artists[index])

        );

        window.location.href =
        "profile.html";

    });

});

const artistsBtn =
document.getElementById("artistsBtn");

const exploreBtn =
document.getElementById("exploreBtn");

const loginBtn =
document.getElementById("loginBtn");

/* ARTISTS SCROLL */

artistsBtn.addEventListener("click", () => {

    document
    .getElementById("artistsSection")
    .scrollIntoView({

        behavior:"smooth"

    });

});

/* EXPLORE BUTTON */

exploreBtn.addEventListener("click", () => {

    document
    .getElementById("artistsSection")
    .scrollIntoView({

        behavior:"smooth"

    });

});

/* LOGIN PAGE */

loginBtn.addEventListener("click", () => {

    window.location.href =
    "login.html";

});

      /* USER */

const user =
JSON.parse(localStorage.getItem("user"));

const navbarUser =
document.getElementById("navbarUser");

if(user){

    navbarUser.innerText =
    user.name;

    loginBtn.style.display =
    "none";

}

     /* LOGOUT */

const logoutBtn =
document.getElementById("logoutBtn");

if(!user){

    logoutBtn.style.display =
    "none";

}

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href =
    "login.html";

});

    /* CREATE ARTIST */

const createArtistBtn =
document.getElementById(
"createArtistBtn"
);

if(!user){

    createArtistBtn.style.display =
    "none";

}

createArtistBtn.addEventListener("click", () => {

    window.location.href =
    "create-artist.html";

});

    /* LOAD ARTISTS */

async function loadArtists(){

    const artistsGrid =
    document.getElementById(
    "artistsGrid"
    );

    try {

        const res = await fetch(

        "https://bmkalahub-api.onrender.com/api/artist/all"

        );

        const data =
        await res.json();

        artistsGrid.innerHTML = "";
        
        allArtists = data.artists;

         const featuredArtists =

        data.artists.filter((artist) => {

        return artist.featured;

      });

        renderFeaturedArtists(
        featuredArtists
        );

        renderArtists(data.artists);

    } catch(err){

        console.log(err);

    }

}

loadArtists();

      function openProfile(artist){

    localStorage.setItem(

    "artist",

    JSON.stringify(artist)

    );

    window.location.href =
    "profile.html";

}

     /* HIDE ARTISTS */

    const artistsSection =
    document.getElementById(
    "artistsSection"
   );

  if(!user){

    artistsSection.style.display =
    "none";

 }

      /* DASHBOARD */

  const dashboardBtn =
  document.getElementById(
  "dashboardBtn"
 );

 if(!user){

    dashboardBtn.style.display =
    "none";

 }

  dashboardBtn.addEventListener(

  "click",

 () => {

    window.location.href =
    "dashboard.html";

 });

      /* SEARCH */

const searchInput =
document.getElementById(
"searchInput"
);

searchInput.addEventListener(

"input",

() => {

    const value =
    searchInput.value
    .toLowerCase();

    const filteredArtists =

    allArtists.filter((artist) => {

    return (

      artist.name
      .toLowerCase()
      .includes(value)

      ||

      artist.category
      .toLowerCase()
      .includes(value)

     );

    });

    renderArtists(filteredArtists);

});

    function renderArtists(artists){

    const artistsGrid =
    document.getElementById(
    "artistsGrid"
    );

    artistsGrid.innerHTML = "";

    const artistsTitle =
    document.getElementById(
    "artistsTitle"
   );
     if(artists.length === 0){

    artistsTitle.style.display =
    "none";

    artistsGrid.innerHTML =

    `

    <h2 class="emptyText">

      No artists found

    </h2>

    `;

    artistsTitle.innerText =
    "No Artists Found";

    return;

}

    artistsTitle.style.display =
    "block";

    artistsTitle.innerText =
    "Popular Artists";

    artists.forEach((artist) => {

        artistsGrid.innerHTML += `

        
        <div class="artistCard">

            <img
            src="${
            artist.image
            ? artist.image
            : 'https://via.placeholder.com/400x300?text=Artist'
            }"
            class="artistImg">

            <h3>

             ${artist.name}

             ${

            artist.featured

            ?

            `<span class="featuredBadge">

           ⭐ Featured

            </span>`

            :

            ""

          }

           </h3>

            <p>
              ${artist.category}
            </p>

            ${
            user
            ?

            `
            <button
            class="viewBtn"
            onclick='openProfile(${JSON.stringify(artist)})'>

            View Profile

            </button>
            `

            :

            ""

            }

        </div>

        `;

    });

}

          /* CATEGORY FILTER */

const categoryCards =
document.querySelectorAll(
".card"
);

categoryCards.forEach((card) => {

    card.addEventListener(

    "click",

    () => {

        const category =

        card.dataset.category
        .toLowerCase();

        const filteredArtists =

        allArtists.filter((artist) => {

            return artist.category
            .toLowerCase()
            .includes(category);

        });

        renderArtists(
        filteredArtists
        );

    });

});

    function renderFeaturedArtists(artists){

         const featuredGrid =
        document.getElementById(
        "featuredArtistsGrid"
       );

        featuredGrid.innerHTML = "";

        artists.forEach((artist) => {

        featuredGrid.innerHTML += `

        <div class="artistCard">

            <img
            src="${
            artist.image
            ? artist.image
            : 'https://via.placeholder.com/400x300?text=Artist'
            }"
            class="artistImg">

            <h3>

              ${artist.name}

              <span class="featuredBadge">

                ⭐ Featured

              </span>

            </h3>

            <p>
              ${artist.category}
            </p>

            <button
            class="viewBtn"
            onclick='openProfile(${JSON.stringify(artist)})'>

            View Profile

            </button>

        </div>

        `;

    });

}

 /* HIDE LOADER */

   window.addEventListener(

   "load",

 () => {

    document.getElementById(
    "loader"
    ).style.display = "none";

});

console.log("BmKalaHub Running");