function updateInfoComment(id="num_com",add=true){
    if(add){
        document.querySelector("#commentText").value = "";
    }

    const lastNumPost = document.getElementById(id)
    
    if(lastNumPost !== null){
        let newNumPOst = Number(lastNumPost.innerText)
        lastNumPost.innerText = newNumPOst + 1
    }
}
function sendComment(commentText, postId) {
    // console.log(commentText,postId,url+`/posts/${postId}/comments`);

    const postInfo = {
        body: commentText
    }
    const token = localStorage.getItem("token")

    const headers = {
        authorization: `Bearer ${token}`
    }



    axios.post(url + `/posts/${postId}/comments`, postInfo, {
        headers: headers
    })
        .then((response) => {
            getComment(postId,"update");
            updateInfoComment()
            updateInfoComment(`C.C.P.${postId}`,false)
        
           
        })
        .catch((error) => {
            console.log(error);

        })

}

/*
data: Object { id: 15994, body: "hi", author: {…} }
author: Object { id: 13720, is_fake: 0, username: "zou", … }
created_at: "2024-08-06T12:01:42.000000Z"
email: "zou.hm@gmail.com"
email_verified_at: null
id: 13720
is_fake: 0
name: "Yarob"
profile_image: Object {  }
remember_token: null
updated_at: "2024-08-06T12:01:42.000000Z"
username: "zou"
<prototype>: Object { … }
body: "hi"
id: 15994
<prototype>: Object { … }
<prototype>: Object { … }


*/