const signupBtn =
document.getElementById("signupBtn");

const loginLink =
document.getElementById("loginLink");

/* LOGIN PAGE */

loginLink.addEventListener("click", () => {

    window.location.href =
    "login.html";

});

/* SIGNUP */

signupBtn.addEventListener("click",

async () => {

    const name =
    document.getElementById(
    "signupName"
    ).value;

    const email =
    document.getElementById(
    "signupEmail"
    ).value;

    const password =
    document.getElementById(
    "signupPassword"
    ).value;

    const signupMessage =
    document.getElementById(
    "signupMessage"
    );

    try {

        const res = await fetch(

        "https://bmkalahub-api.onrender.com/api/auth/signup",

        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:JSON.stringify({

                name,
                email,
                password

            })

        });

        const data =
        await res.json();

        signupMessage.innerText =
        data.message;

        if(data.success){

        localStorage.setItem(

        "user",

        JSON.stringify({

        name,
        email

     })

     );

     setTimeout(() => {

        window.location.href =
        "index.html";

     }, 1000);

  }

    } catch(err){

        signupMessage.innerText =
        "Server Error";

    }

});