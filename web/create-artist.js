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

    if (image) {

        formData.append(
        "image",
        image
        );

    }

    try {

        const res = await fetch(

        "https://bmkalahub-api.onrender.com/api/artist/create",

        {

            method:"POST",

            body:formData

        });

        const data =
        await res.json();

        if (data.success && data.artist) {

            localStorage.setItem(

            "artist",

            JSON.stringify(
            data.artist
            )

            );

            artistMessage.innerText =
            "Artist Created Successfully";

            window.location.href =
            "dashboard.html";

        } else {

    artistMessage.innerText =
    data.message;

    if(

    data.message ===

    "Artist profile already exists"

    ){

        setTimeout(() => {

            window.location.href =
            "dashboard.html";

        }, 1000);

    }

}
    } catch(err){

        console.log(err);

        artistMessage.innerText =
        "Server Error";

    }

});