


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("form").addEventListener("submit", () => {
        this.event.preventDefault();
    })
    function addUser(fname, lname, email, fpassword, lpassword) {
        let fullName = fname + " " + lname;
        if (fullName === " ") {
            fullName = ""
        }
        let params = {
            name: fullName,
            email: email,
            fpassword: fpassword,
            lpassword: lpassword
        }

        axios.post("http://localhost/newProjetPartBacknd/controller/user/signIn.php", params)
            .then((response) => {
                let data = response.data
                if (typeof data === "object" && !data.request && !data.emailexu) {
                    chompVide(data)
                } else {
                    responseInsertion(data)
                }
            })
            .catch((error) => {
                console.log(error.message);
            })
    }


    document.querySelector('#signin').addEventListener('click', () => {
        let fname = document.querySelector('#fname').value;
        let lname = document.querySelector('#lname').value;
        let email = document.querySelector("#email").value;
        let fpassword = document.querySelector("#fpassword").value;
        let lpassword = document.querySelector("#lpassword").value;
        let name = fname + lname
        let patern = /(\w{3})\@([a-z]{3,6})\.([a-z]{2,7})/
        if (!patern.test(email) || fpassword == "" || lpassword == "" || name == "") {
            let data = { name: name == "" ? "false" : "true", pass1: fpassword == "" ? "false" : "true", pass2: lpassword == "" ? "false" : "true" }

            chompVide(data)
            if (!patern.test(email)) {
                document.querySelector("#e_email").innerText = "your email incorecte *"

            }

        } else {
            document.querySelector("#e_email").innerText = ""

            addUser(fname, lname, email, fpassword, lpassword)
        }
    })

})



function chompVide(data_error) {

    if (data_error.email == "false") {
        document.querySelector("#e_email").innerText = "chomp obligatoire *"
    } else {
        document.querySelector("#e_email").innerText = ''
    }

    if (data_error.pass1 == "false") {
        document.querySelector("#e_pass1").innerText = "chomp obligatoire *"
    } else {
        document.querySelector("#e_pass1").innerText = ''
    }

    if (data_error.pass2 == "false") {
        document.querySelector("#e_pass2").innerText = "chomp obligatoire *"
    } else {
        document.querySelector("#e_pass2").innerText = ''

    }

    if (data_error.name == "false") {
        document.querySelector("#e_name").innerText = "chomp obligatoire *"
    } else {
        document.querySelector("#e_name").innerText = ''

    }


    if (data_error.errPass == "false") {
        document.querySelector("#e_pass2").innerText = "password don't much *"

    }
}

function responseInsertion(response) {
    

    if (response.request) {
        alert("your account creat successfully")
    } else {
        document.querySelector("#e_email").innerText = "email existe"

    }

}