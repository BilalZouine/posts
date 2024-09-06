function createAccount(data) {
    const formData = new FormData()
    formData.append("username", data.username)
    formData.append("email", data.email)
    if(data.image){
        formData.append("image", data.image)
    }
    formData.append("name", data.name)
    formData.append("password", data.password)




    axios.post(url + "/register", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => {
            gestionLogIn(response.data)

            statusLogIn("vour Account created successfully", "success")
        })
        .catch(error => {
            if (error.response) {
                console.error('Status:', error.response.status); // حالة الاستجابة
                console.error('Data:', error.response.data); // بيانات الاستجابة
                console.error('Headers:', error.response.headers); // ترويسات الاستجابة
            } else if (error.request) {
                console.error('Request:', error.request); // الطلب الذي لم يتلقَ استجابة
            } else {
                console.error('Message:', error.message); // رسالة الخطأ
            }
        });


}

const btn = document.querySelector('#signIn')
if (btn) {
    eventButtunSignIn()
    console.log(8989);

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
                const image = document.querySelector("#image").files[0];
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
                    if (image) {
                        return { name: name, username: uname, email: login, image: image, password: pwd };
                    } else {
                        return { name: name, username: uname, email: login, password: pwd };

                    }

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
