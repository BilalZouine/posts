document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("form").addEventListener("submit",()=>{
        this.event.preventDefault();

    })

    document.querySelector("form").addEventListener("submit",()=>{
        this.event.preventDefault();
    })


    document.querySelector("#submit").addEventListener("click", () => {
        let login = document.querySelector("#login").value
        let password = document.querySelector("#password").value
        Userlogin(login, password)
    })



    function Userlogin(login, password) {
        let req = new XMLHttpRequest();

        let url = 'http://localhost/newProjetPartBacknd/controller/user/logIn.php';
        req.open("POST", url);
        // req.responseType ="application/JSON"
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status >= 200 && req.status < 300) {
                    let data = JSON.parse(req.response);
                    gestionStatus(data);
                }
            }
        }
        req.send(JSON.stringify({ login: login, password: password }));

    }

    function gestionStatus(response) {
        let p =document.querySelector("#statusLogIn");
        p.classList.add("login")

        if(response.error){
            p.innerText = response.error;
            p.classList.remove("login-Success")
            p.classList.add("login-Rejecte")

        }else{
            p.innerText = "Connection was successful.";
            p.classList.add("login-Success")
            p.classList.remove("login-Rejecte")
        }
    }
})

