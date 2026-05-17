const loginBtn =
document.getElementById("loginPageBtn");

const signupLink =
document.getElementById("signupLink");

/* SIGNUP PAGE */

signupLink.addEventListener("click", () => {

    window.location.href =
    "signup.html";

});

/* LOGIN */

loginBtn.addEventListener("click",

async () => {

    const email =
    document.getElementById(
    "loginEmail"
    ).value;

    const password =
    document.getElementById(
    "loginPassword"
    ).value;

    const loginMessage =
    document.getElementById(
    "loginMessage"
    );

    try {

        const res = await fetch(

        "https://bmkalahub-api.onrender.com/api/auth/login",

        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:JSON.stringify({

                email,
                password

            })

        });

        const data =
        await res.json();

        loginMessage.innerText =
        data.message;

        /* SUCCESS */

        if(data.success){

            localStorage.setItem(

            "user",

            JSON.stringify(data.user)

            );

         const artistRes =
           await fetch(

           `https://bmkalahub-api.onrender.com/api/artist/my/${data.user._id}`

          );

          const artistData =
          await artistRes.json();

          if(artistData.artist){

           localStorage.setItem(

          "artist",

           JSON.stringify(
           artistData.artist
         )

        );

      }
            setTimeout(() => {

                window.location.href =
                "index.html";

            }, 1000);

        }

    } catch(err){

        loginMessage.innerText =
        "Server Error";

    }

});

      /* SHOW/HIDE LOGIN PASSWORD */

         const loginPassword =
         document.getElementById(
         "loginPassword"
        );

         const toggleLoginPassword =
         document.getElementById(
         "toggleLoginPassword"
        );

         if(toggleLoginPassword){

         toggleLoginPassword.addEventListener(

         "click",

         () => {

         if(

         loginPassword.type ===
          "password"

         ){

         loginPassword.type =
         "text";

         toggleLoginPassword.innerText =
         "Hide";

        } else {

          loginPassword.type =
          "password";

          toggleLoginPassword.innerText =
          "Show";

          }

        });

       }