const url = "https://tarmeezacademy.com/api/v1"

function getInfoPset() {
    document.querySelector("#newPost").addEventListener("click", function () {

        Swal.fire({
            title: 'Add New Post ',
            html:
                `
                <textarea id='title_post'> </textarea>
                <input type="file" accept="image/png, image/jpeg, image/jpg" class="form-control" id="img_post" >
                `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Add Post',
            cancelButtonText: 'cancel',
            preConfirm: () => {
                const title = document.querySelector("#title_post").value;
                const imgage = document.querySelector('#img_post');
                const file = imgage.files[0]

                // if (!file || !title) {
                //     Swal.showValidationMessage('*');
                //     return false;
                // }

                return { image: file, title: title };




            }
        }).then((result) => {
            if (result.isConfirmed) {
                addPost(result.value)
            }
        });
    })
}

function statusPost(titel, icon) {
    Swal.fire({
        icon: icon,
        title: titel,
        showConfirmButton: false,
        timer: 2000
    });
}


function addPost(data) {


    const formdata = new FormData()
    formdata.append('image', data.image)
    formdata.append('body', data.title)
    const token = localStorage.getItem("token")
    const headers = {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`
    }
    axios.post(url + '/posts', formdata, {
        headers: headers
    })
        .then(response => {
            statusPost('Post added successfully:', "success")
            const Params = new URLSearchParams(window.location.search)
            const id = Params.get("user_id")
            getPostes(id,true)
            const lastNumPost = document.querySelector("#num_post")
            if(lastNumPost !== null){
                let newNumPOst = Number(lastNumPost.innerText)
                lastNumPost.innerText = newNumPOst + 1
            }
            
        })
        .catch(error => {
            statusPost('Error adding post: ', "error")


            if (error.response) {
                console.error('error add post: ', error.response.data);
            } else {
                console.error('error add post: ', error.message);
            }

        });
}
