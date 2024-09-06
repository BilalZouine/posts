
document.addEventListener("DOMContentLoaded", function () {
    const containerPoste = document.querySelector('#poste')
    const url = "https://tarmeezacademy.com/api/v1/posts/1"
    axios.get(url)
        .then((response) => {
            const postes = response.data.data


            postes.forEach(poste => {
                let container_post = document.createElement('li');
                let img_user = document.createElement('img');
                let container_infouser = document.createElement('div');
                let user_name = document.createElement('span');
                let date_poste = document.createElement('span');
                let div = document.createElement('div');
                let div_img = document.createElement('div');


                container_post.classList = "mb-2 rounded info-post";
                container_infouser.classList = "info-user mb-1 ";
                img_user.classList = "img-user";
                user_name.classList = "name-user";
                div.classList = "mx-2"
                div.style.lineHeight = '1'
                date_poste.classList = "day-post";




                user_name.innerText = poste.author.username + "\n"
                img_user.src = typeof poste.author.profile_image != "object" ? poste.author.profile_image : "images/user.png";
                date_poste.innerText = poste.created_at;
                div_img.appendChild(img_user)

                container_infouser.appendChild(div_img)
                div.appendChild(user_name)
                div.appendChild(date_poste)
                container_infouser.appendChild(div)



                let container_img = document.createElement('div');
                let poste_image = document.createElement('img');

                container_img.classList = "container-img";
                poste_image.classList = "img";

                poste_image.src = typeof poste.image != "object" ? poste.image : "images/6167023.webp";


                let prorete_post = document.createElement('div');
                let description = document.createElement('p');
                let comments = document.createElement('button');
                let like = document.createElement('button');
                let shar = document.createElement('button');
                let hr = document.createElement('hr');
                let sup = document.createElement('sup');
                let div_conta = document.createElement('div');
                let i_like = document.createElement("i")
                let i_comm = document.createElement("i")
                let i_shar = document.createElement("i")




                prorete_post.classList = "prorete-post";
                description.classList = "description";
                shar.classList = "btn"
                like.classList = "btn"
                comments.classList = "btn comments"
                i_comm.classList = "fa-regular fa-comment"
                i_like.classList = "fa-regular fa-heart"
                i_shar.classList = "fa-thin fa-share"




                description.innerText = "description: " + poste.body
                description.style.color = "gray"
                sup.innerHTML += poste.comments_count




                // div.style.display ='inline'
                // div.style.lineHeight = "0.5"
                // container_infouser.style.display ='flex'
                // container_infouser.style.justifyContent ='left'
                // container_infouser.style.background ='red'

                shar.appendChild(i_shar)
                like.appendChild(i_like)
                comments.appendChild(i_comm)
                comments.appendChild(sup)
                comments.addEventListener("click", () => {
                    getComment(poste.id,  poste.author.username)
                })


                div_conta.appendChild(like)
                div_conta.appendChild(comments)
                div_conta.appendChild(shar)
                div_conta.style.display = "flex"
                div_conta.style.justifyContent = "space-between"
                div_conta.style.alignItems = "center"
                div_conta.style.marginTop = "10px"


                container_img.appendChild(poste_image)

                prorete_post.appendChild(description)
                prorete_post.appendChild(hr)
                prorete_post.appendChild(div_conta)


                container_post.appendChild(container_infouser)
                container_post.appendChild(container_img)
                container_post.appendChild(prorete_post)

                containerPoste.appendChild(container_post)

            })




        })

    function getComment(id, title) {

        body = `
            <li class='no-comment'>
            auchan commnet <br> add firset coment 
            </li>
            `
        Swal.fire({
            title: title,
            showCloseButton: true,
            showConfirmButton: false,
            width: 700,
            html: `
                <div class='container-comment'>
                <ul class='list-comment'>
                ${body}
                </ul>
                </div>
                
                <ul class='mt-2 comment d-flex justify-content-start'>
                    <li class='mx-2'>
                    <img src="http://tarmeezacademy.com/images/users/DxoMYDu6nrpphPO.jpg" class='img-user'>
                    </li>
                     <li>
                        <textarea name="" id="commentText"></textarea>
                        <button class='add-comment btn' id='send_comment'><i class="fa-solid fa-paper-plane-top"></i></button>
                    </li>
                </ul>
                `,didOpen : ()=>{
                    document.querySelector("#send_comment").addEventListener("click",()=>{
                       const commentText  = document.querySelector("#commentText").value;
                       sendComment(commentText)
                    
                    })
                }
        })

    }
    function sendComment(comment){
        console.log(comment);
        
    }
})  
