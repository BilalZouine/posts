
const containerPoste = document.querySelector('#poste')
function getPostes(userId) {
    containerPoste.innerHTML=""


    const url = "https://tarmeezacademy.com/api/v1"
    const current_url = url + `/users/${userId}/posts`
    toggelloager()


    axios.get(current_url)
        .then((response) => {
            
            toggelloager(false)
            var postes = response.data.data
            postes=postes.reverse()
            postes.forEach(poste => {
                let container_post = document.createElement('li');
                let img_user = document.createElement('img');
                let link_profile = document.createElement('a');
                let carder_header = document.createElement('div');
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
                link_profile.src = `profile.html?user_id=${poste.author.id}`


                link_profile.appendChild(img_user)
                div_img.appendChild(link_profile)

                container_infouser.appendChild(div_img)
                div.appendChild(user_name)
                div.appendChild(date_poste)
                container_infouser.appendChild(div)

                carder_header.appendChild(container_infouser)
                if (userId == localStorage.getItem('user_id')) {
                    let div_btn = document.createElement('div');
                    let btn_remove = document.createElement('button');
                    let btn_update = document.createElement('button');

                    btn_remove.classList = 'btn btn-sm btn-danger'
                    btn_update.classList = 'btn btn-sm btn-primary mx-2'
                    div_btn.classList = 'mx-2'

                    btn_remove.innerText = "Delete"
                    btn_update.innerText = "Update"
                    btn_remove.addEventListener("click",()=>{
                        Delete(poste.id)
                    })
                    btn_update.addEventListener('click',()=>{
                        update(poste.id)
                    })

                    div_btn.appendChild(btn_update)
                    div_btn.appendChild(btn_remove)
                    carder_header.appendChild(div_btn)
                    carder_header.classList = 'd-flex justify-content-between'
                }
                let container_img = document.createElement('div');
                let poste_image = document.createElement('img');

                container_img.classList = "container-img";
                poste_image.classList = "img";

                poste_image.src = typeof poste.image != "object" ? poste.image : "images/6167023.webp";


                let prorete_post = document.createElement('div');
                let description = document.createElement('p');
                let container_tags = document.createElement('div');
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
                container_tags.classList = "d-flex my-2";
                shar.classList = "btn"
                like.classList = "btn"
                comments.classList = "btn comments"
                i_comm.classList = "fa-regular fa-comment"
                i_like.classList = "fa-regular fa-heart"
                i_shar.classList = "fa-thin fa-share"
                sup.id = "C.C.P."+poste.id

                description.innerText = "description: " + poste.body
                description.style.color = "gray"
                sup.innerHTML += poste.comments_count
                poste.tags.forEach(tag => {
                    let p = document.createElement('p');
                    p.classList = "tags"
                    p.innerText = tag.name
                    container_tags.appendChild(p)
                })

                shar.appendChild(i_shar)
                like.appendChild(i_like)
                comments.appendChild(i_comm)
                comments.appendChild(sup)
                comments.addEventListener("click", () => {
                    getComment(poste.id)
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
                prorete_post.appendChild(container_tags)
                prorete_post.appendChild(hr)
                prorete_post.appendChild(div_conta)


                container_post.appendChild(carder_header)
                container_post.appendChild(container_img)
                container_post.appendChild(prorete_post)

                containerPoste.appendChild(container_post)


            })




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

//=== getQueryParam this function return parame from url created in profile.js ====//
const userId = getQueryParam("user_id")
//=== //getQueryParam this function return parame from url created in profile.js // ====//
if (userId !== null) {
    document.querySelector(".profile-info").addEventListener('load', userInfo())
    containerPoste.addEventListener("load", getPostes(userId))
}





// window.addEventListener("scroll", () => {
//     let document_height = document.body.offsetHeight
//     let window_height = window.scrollY
//     let courrentPosition = window_height + 2121;

//     if (document_height <= courrentPosition && request && current_user < last_page) {
//         request = false
//         current_page += 1
//         getPostes(current_page)

//     }
// })