   const createArtistSubmit =
document.getElementById(
"createArtistSubmit"
);

createArtistSubmit.addEventListener(

"click",

async (e) => {

    e.preventDefault();
    const user =
    JSON.parse(
    localStorage.getItem("user")
    );

    const name =
    document.getElementById(
    "artistName"
    ).value;

    const category =
    document.getElementById(
    "artistCategory"
    ).value;

    const bio =
    document.getElementById(
    "artistBio"
    ).value;

    const phone =
    document.getElementById(
    "artistPhone"
    ).value;

    const image =
    document.getElementById(
    "artistImage"
    ).files[0];

    const artistMessage =
    document.getElementById(
    "artistMessage"
    );

    const formData =
    new FormData();

    formData.append(
    "userId",
    user._id
    );

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

    formData.append(
    "image",
    image
    );

    try {

        const res = await fetch(

        "http://localhost:5000/api/artist/create",

        {

            method:"POST",

            body:formData

        });

        const data =
        await res.json();

        artistMessage.innerText =
        data.message;

        window.location.href =
       "index.html";

    } catch(err){

        artistMessage.innerText =
        "Server Error";

    }

});