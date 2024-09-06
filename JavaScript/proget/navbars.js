function eventSigIN(){
    document.querySelector("#signIn").addEventListener("click", () => {
        Swal.fire({
            title: "Sign In",
            html: `
            <div class='row'>
            <input type="email" class="form-control col"  id="email" placeholder="username">
            <input type="email" class="form-control col"  id="email" placeholder="username">
            <div>
            <div class='row'>
            <input type="email" class="form-control col"  id="email" placeholder="username">
            <input type="password" class="form-control col" id="password" placeholder="password">
            </div>
            `,

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
                connection(response.value)

            })
    })
}

