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
        profile.href  ="profile.html"
        
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

function statusLogIn(titel , icon){
    Swal.fire({
        icon: icon,
        title: titel,
        showConfirmButton: false,
        timer: 2000
      });
}

function gestionLogIn(response){
    localStorage.setItem("user_id" , response.user.id)
    localStorage.setItem("user_name" , response.user.username)
    localStorage.setItem("token",response.token)
    localStorage.setItem("profile_picture",response.user.image)

    gestionMoreElementNavBar("#signIn","#login")
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
            statusLogIn("welcome back","success")
            
        })
        .catch((error) => {
            statusLogIn("Your information is incorrect.","error")


        })
}

function addEventsButtonLogin() {
    document.querySelector("#login").addEventListener("click", () => {
        Swal.fire({
            title: "LOG IN",
            html: `<input type="email" class="swal2-input"  id="email" placeholder="username">
                <input type="password" class="swal2-input" id="password" placeholder="password">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "LOG IN",
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const login = document.querySelector("#email").value;
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

                    return { email: login, password: password };
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


function createAccount(data) {
    params = {
        username: data.username,
        email: data.email,
        password: data.password,
        // name: data.name,
        image: data.image
    }
    const headers = {
        'Accept': 'application/json'
    };
    axios.post(url + "/register", params, { headers: headers })
        .then((response) => {
            gestionLogIn(response.data)

            statusLogIn("welcome back","success")
        })
        .catch((error) => {
            statusLogIn("Your information is incorrect.","error")
        })

}



function eventButtunSignIn() {
    document.querySelector("#signIn").addEventListener("click", () => {
        Swal.fire({
            title: "Sign In",
            html: `
            <div class=''>
            <input type="email" class="form-control mb-4"  id="name" placeholder="name">
            <input type="email" class="form-control mb-4"  id="uname" placeholder="username" required>
            <input type="email" class="form-control mb-4 "  id="email" placeholder="email" required>
            <div>
            <div class='t-2'>
            <input type="email" class="form-control mb-4 "  id="pwd" placeholder="password" required>
            <input type="file" accept=''.png .jpg .jpng class="form-control mb-4 " id="image" >
            </div>
            `,

            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "LOG IN",
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const name = document.querySelector("#name").value;
                const login = document.querySelector("#email").value;
                const uname = document.querySelector("#uname").value;
                const pwd = document.querySelector("#pwd").value;
                const image = document.querySelector("#image").value;
                const patern = /(\w{3})\@([a-z]{3,6})\.([a-z]{2,7})/


                if (!login || !pwd || !uname || !patern.test(login)) {

                    if (!login && !pwd && !uname) {
                        Swal.showValidationMessage("pleas enter your information.")
                    } else if (!login || !patern.test(login)) {
                        Swal.showValidationMessage("pleas enter email .")

                    } else if (!pwd) {
                        Swal.showValidationMessage("pleas enter password .")
                    } else if (!uname) {
                        Swal.showValidationMessage("pleas enter user name .")
                    }

                } else {
                    return { name: name, username: uname, email: login, image: image, password: pwd };
                }
            }
        })
            .then((response) => {
                if (response.isConfirmed) {
                    createAccount(response.value)
                }

            })
    })
}



function LogOut() {
    document.querySelector("#logOut").addEventListener("click", () => {

        Swal.fire({
            title: "Are you sure you want to log out?",
            icon : 'warning',
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
                    gestionMoreElementNavBar("#logOut", "#newPost")


                }

            });


    });
}