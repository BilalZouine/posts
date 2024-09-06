function update(postId) {
    Swal.fire({
        title: 'update Post ',
        html:
            `
                <div class='form-group'>
                <label for='title_post'> title </label>
                <textarea id='title_post' class='form-controll' > </textarea>
                </div>
                <div class='form-group'>
                <label for='body_post'> body </label>
                <textarea id='body_post' class='form-controll' > </textarea>
                </div>
                `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Update Post',
        cancelButtonText: 'cancel',
        preConfirm: () => {
            const title = document.querySelector("#title_post").value;
            const body = document.querySelector("#body_post").value;

            return { title: title.trim(), body: body.trim(), id: postId };


        }
    }).then((result) => {
        if (result.isConfirmed) {
            updatePost(result.value)
        }
    });


}

function statusPost(title, icon) {
    Swal.fire({
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 500
    });
}


function updatePost(data) {


    var newData
    
    if (data.title != null && data.body != null && data.title.length >2 && data.body.length >2 ) {
        newData = {
            "title": data.title,
            "body": data.body
        }      

    } else {


        if (data.title != null  && data.title.length >2) {
            newData = {
                "title": data.title
            }
        }
        if (data.body != null  && data.body.length >2) {
            newData = {
                "body": data.body
            }
        }

    }

    const token = localStorage.getItem("token")
    const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
    }    
    axios.put(url + '/posts/'+data.id,newData, {
        headers: headers
    })
        .then(response => {
            statusPost('Post updated successfully:', "success")
            console.log(response);
            
        })
        .catch(error => {
            statusPost('Error updated post: ', "error")


            if (error.response) {
                console.error('error update post: ', error.response.data);
            } else {
                console.error('error update post: ', error.message);
            }

        });
}



function Delete(postId) {
    const token = localStorage.getItem("token")
    const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
    }    
    axios.delete(url + '/posts/'+postId, {
        headers: headers
    })
        .then(response => {
            statusPost('Post removed successfully:', "success")
            const Params = new URLSearchParams(window.location.search)
            const id = Params.get("user_id")
            getPostes(id)
            const lastNumPost = document.querySelector("#num_post")
            let newNumPOst = Number(lastNumPost.innerText)
            lastNumPost.innerText = newNumPOst - 1
            
            
        })
        .catch(error => {
            statusPost('Error removed post: ', "error")
           

            if (error.response) {
                console.error('error removed post: ', error.response.data);
            } else {
                console.error('error removed post: ', error.message);
            }

        });

}