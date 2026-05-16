   const user =
JSON.parse(
localStorage.getItem("user")
);

/* INPUTS */

const editArtistName =
document.getElementById(
"editArtistName"
);

const editArtistCategory =
document.getElementById(
"editArtistCategory"
);

const editArtistBio =
document.getElementById(
"editArtistBio"
);

const editArtistPhone =
document.getElementById(
"editArtistPhone"
);

/* LOAD ARTIST */

async function loadArtist(){

    try {

        const res = await fetch(

        `http://localhost:5000/api/artist/my/${user._id}`

        );

        const data =
        await res.json();

        const artist =
        data.artist;

        if(!artist) return;

        editArtistName.value =
        artist.name;

        editArtistCategory.value =
        artist.category;

        editArtistBio.value =
        artist.bio;

        editArtistPhone.value =
        artist.phone || "";

    } catch(err){

        console.log(err);

    }

}

loadArtist();

       /* UPDATE ARTIST */

const updateArtistBtn =
document.getElementById(
"updateArtistBtn"
);

updateArtistBtn.addEventListener(

"click",

async () => {

    const name =
    editArtistName.value;

    const category =
    editArtistCategory.value;

    const bio =
    editArtistBio.value;

    const phone =
    editArtistPhone.value;

    const image =
    document.getElementById(
    "editArtistImage"
    ).files[0];

    const formData =
    new FormData();

    formData.append(
    "name",
    name
    );

    formData.append(
    "category",
    category
    );

    formData.append(
    "bio",
    bio
    );

    formData.append(
    "phone",
    phone
   );

    if(image){

        formData.append(
        "image",
        image
        );

    }

    try {

        const res = await fetch(

        `http://localhost:5000/api/artist/update/${user._id}`,

        {

            method:"PUT",

            body:formData

        });

        const data =
        await res.json();

        document.getElementById(
        "editArtistMessage"
        ).innerText = data.message;

        window.location.href =
        "index.html";

    } catch(err){

        console.log(err);

    }

});