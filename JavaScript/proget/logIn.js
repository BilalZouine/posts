
function gestionMoreElementNavBar(socondeElement = null, firsetElement = null) {
    if (firsetElement && socondeElement) {
        document.querySelector(firsetElement).remove()
        document.querySelector(socondeElement).remove()
    }

    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    const user_name = localStorage.getItem("user_name");
    let navbar = document.querySelector("#navbar")
    let profile = document.querySelector("#profile")

    if (!token && !user_id && !user_name) {

        let btnlogin = document.createElement("button");
        let btnsignin = document.createElement("button");

        btnlogin.classList = "nav-link";
        btnlogin.id = "login";
        btnlogin.innerText = "log In";

        btnsignin.classList = "nav-link";
        btnsignin.id = "signIn";
        btnsignin.innerText = "sign In";
        

        navbar.appendChild(btnlogin);
        navbar.appendChild(btnsignin);
        
        addEventsButtonLogin()
        eventButtunSignIn()


    } else {

        let btnOut = document.createElement("button");
        let newPost = document.createElement("button");
        let img = document.createElement("img")
        img.src = localStorage.getItem("profile_image")
        profile.href = `profile.html?user_id=${user_id}`
        img.style.width = "50px !important"
        img.style.height = "40px"
        img.style.border = "2px solid gold"
        img.style.borderRadius = "50%"
        profile.appendChild(img)

        btnOut.classList = "nav-link";
        btnOut.id = "logOut";
        btnOut.innerText = "log Out";


        newPost.classList = "btn btn-primary  rounded-5";
        newPost.id = "newPost";
        newPost.innerText = "+";
        navbar.appendChild(btnOut);

        document.querySelector(".container").appendChild(newPost)
        LogOut()
        getInfoPset()

    }
}
gestionMoreElementNavBar()

function statusLogIn(titel, icon) {
    Swal.fire({
        icon: icon,
        title: titel,
        showConfirmButton: false,
        timer: 2000
    });
}

function gestionLogIn(response) {
    localStorage.setItem("user_id", response.user.id)
    localStorage.setItem("user_name", response.user.username)
    localStorage.setItem("token", response.token)
    localStorage.setItem("profile_image", response.user.profile_image)

    gestionMoreElementNavBar("#signIn", "#login")
}



function conected(infoUser) {
    params = {
        username: infoUser.email,
        password: infoUser.password
    }
    const headers = {
        'Accept': 'application/json'
    };
    axios.post(url + "/login", params, { headers: headers })
        .then((response) => {
            gestionLogIn(response.data)
            getPostes(response.data.user.id) 
            statusLogIn("welcome back", "success")

        })
        .catch((error) => {
            statusLogIn("Your information is incorrect.", "error")
            


        })
}

function addEventsButtonLogin() {
    document.querySelector("#login").addEventListener("click", () => {
        Swal.fire({
            title: "LOG IN",
            html: `<input type="email" class="swal2-input"  id="logIn_us" placeholder="username">
                <input type="password" class="swal2-input" id="password" placeholder="password">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "LOG IN",
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const login = document.querySelector("#logIn_us").value;
                const password = document.querySelector("#password").value;
               

                if (!login || !password) {

                    if (!login && !password) {
                        Swal.showValidationMessage("pleas enter email and password.")
                    } else if (!login) {
                        Swal.showValidationMessage("pleas enter email .")

                    } else if (!password) {
                        Swal.showValidationMessage("pleas enter password .")
                    }

                } else {

                    return { email: login.trim(), password: password.trim() };
                }
            }
        })
            .then((response) => {
                if (response.isConfirmed) {
                    conected(response.value)

                }
            })
    })

}





function LogOut() {
    document.querySelector("#logOut").addEventListener("click", () => {

        Swal.fire({
            title: "Are you sure you want to log out?",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Sig out",
            cancelButtonText: "Cancel",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem("user_name");
                    localStorage.removeItem("user_id");
                    localStorage.removeItem("token");
                    localStorage.removeItem("profile_image");
                    gestionMoreElementNavBar("#logOut", "#newPost")
                    document.querySelector("#profile").innerHTML=""

                    // Swal.fire({
                    //     title: "you have succrssfully logged out",
                    //     showConfirmButton: false,
                    //     position : "bottom-right",
                    //     showCloseButton: true,
                    //     focusConfirm: false,
                    //     background :"green"
                    // })

                }

            });


    });
}

// Swal.fire({
//     showConfirmButton: false,
//     showCloseButton: true,
//     customClass:{
//         titel:"titel-sweetalert"
//     },
//     focusConfirm: false,
//     background :"green"
// })

// Swal.fire({
//     text: 'you have succrssfully logged out',
//     position : "bottom-right",
//     showCloseButton: true,


//     customClass: {
//         popup: 'custom-swal2'
//     },
//     showConfirmButton: false,
// });
