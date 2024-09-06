function getComment(postId, staus = "get") {
    axios.get(url + `/posts/${postId}`)
        .then((result) => {
            writeComments(result.data.data, staus)
        })
        .catch((error) => {
            console.log(error.message);
        })

}
function writeComments(poste, statusCommnet = "get") {
    let body = ""
    if (poste.comments.length > 0) {
        poste.comments.forEach(comment => {
            const urlImg = comment.author.profile_image;
            const url_img_error = "images/user.png"
            const url_img = typeof urlImg != "object" ? urlImg : url_img_error;

            body += `
                <li class='comment-container' >
                <div>
                    <a href='profile.html?user_id=${comment.author.id}' class="Acounte-Comment"><img src="${url_img}"  style="width:30px !important ;height:30px;border-radius:50%;">
                    <span>${comment.author.username}</span></a>
                </div>
                <p>${poste.comments[0].body}</p>
    
                </li>
                `
        })
    } else {
        body = `
         <li class="no-comment">
           add first comment
        </li>
        `
    }


    if (statusCommnet === "get") {
        getComments(body, poste)
    } else {
        UpdateCommnte(body)
    }




}

function getComments(comments, poste) {
    Swal.fire({
        title: `<a href='profile.html?user_id=${poste.author.id}' class="lienProfile">${poste.author.username}</a>`,
        showCloseButton: true,
        showConfirmButton: false,
        width: 700,
        html: `
            <div class='container-comment'>
            <ul class='list-comment' id="areaComments">
            ${comments}
            </ul>
            </div>
            
            <ul class='mt-2 comment d-flex justify-content-start'>
                <li class='mx-2'>
                <img src="${localStorage.getItem("profile_image")}" class='img-user'>
                </li>
                 <li>
                    <textarea name="" id="commentText"></textarea>
                    <button class='add-comment btn' id='send_comment'><i class="fa-solid fa-paper-plane-top"></i></button>
                </li>
            </ul>
            `, didOpen: () => {

            document.querySelector("#send_comment").addEventListener("click", () => {
                const commentText = document.querySelector("#commentText").value;
                if (commentText.length >= 2) {
                    sendComment(commentText,poste.id)   
                    getComment(poste.id, "update")

                }

            })
        }
    })
}




function UpdateCommnte ( Comments ) {
    document.querySelector("#areaComments")
    .innerHTML = Comments 

}