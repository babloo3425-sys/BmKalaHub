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