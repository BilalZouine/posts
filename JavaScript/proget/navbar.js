function navbar() {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    const user_name = localStorage.getItem("user_name");
    let navbar = document.querySelector("#navbar")
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


    } else {

    }
}
