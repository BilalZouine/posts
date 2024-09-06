const containerPoste = document.querySelector('#poste')
let request = true
let current_page = 1
let last_page = 1
var lastPostAdd = 0
var iscalde = false

function setlastPostAdd(NewlastPostAdd) {
    lastPostAdd = NewlastPostAdd

}
function gestionDescription(description)
{
    description = description.splice(0,4).join(" ");
    if(description.length > 40){
        description = description.substring(0,30)+"..."
    }
    return description
}

function writePostes(postes) {
    postes.forEach(poste => {
        let container_post = document.createElement('li');
        let img_user = document.createElement('img');
        let link_profile = document.createElement('a');
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
        link_profile.href = `profile.html?user_id=${poste.author.id}`
        link_profile.appendChild(img_user)
        div_img.appendChild(link_profile)

        container_infouser.appendChild(div_img)
        div.appendChild(user_name)
        div.appendChild(date_poste)
        container_infouser.appendChild(div)



        let container_img = document.createElement('div');
        let poste_image = document.createElement('img');
        let imageLink = document.createElement('a');


        container_img.classList = "container-img";
        poste_image.classList = "img";

        const url_img = typeof poste.image != "object" ? poste.image : "images/6167023.webp"

        poste_image.src = url_img;
        imageLink.href = `${url_img}`
        imageLink.target = "_blank"
        imageLink.appendChild(poste_image)



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
        let descriptionContent = poste.body.split(" ")





        prorete_post.classList = "prorete-post";
        description.classList = "description";
        container_tags.classList = "d-flex my-2";
        shar.classList = "btn"
        like.classList = "btn"
        comments.classList = "btn comments"
        i_comm.classList = "fa-regular fa-comment"
        i_like.classList = "fa-regular fa-heart"
        i_shar.classList = "fa-thin fa-share"

        if(descriptionContent.length>4){
            descriptionContent = gestionDescription(descriptionContent)+"...";
        }else{
            descriptionContent =  gestionDescription(descriptionContent)
        }
        




        description.innerText = descriptionContent
        description.style.color = "gray"
        sup.innerHTML += poste.comments_count
        sup.id = "C.C.P." + poste.id
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


        container_img.appendChild(imageLink)

        prorete_post.appendChild(description)
        prorete_post.appendChild(container_tags)
        prorete_post.appendChild(hr)
        prorete_post.appendChild(div_conta)


        container_post.appendChild(container_infouser)
        container_post.appendChild(container_img)
        container_post.appendChild(prorete_post)

        containerPoste.appendChild(container_post)


    })
}



function getPostes(page = 0, getNewPost = false, lastPostsAdd = 0) {
    var url, current_url
    if (getNewPost) {
        if (lastPostsAdd === 0) {
            url = "https://tarmeezacademy.com/api/v1"
            current_url = url + `/posts?limit=1`
        } else {
           
            url = "https://tarmeezacademy.com/api/v1"
            current_url = url + `/posts?limit=1`
        }

    } else {
        url = "https://tarmeezacademy.com/api/v1"
        current_url = url + `/posts?page=${page}`
    }
    if (lastPostsAdd === 0) {
        toggelloager(true)
    }
    axios.get(current_url)
        .then((response) => {
            toggelloager(false)

            request = true
            last_page = getNewPost ? last_page : response.data.meta.last_page
            const postes = response.data.data
            if (!iscalde) {
                iscalde = true
                setlastPostAdd(postes[0].id)
            }
            if (lastPostsAdd !== 0) {
                if (lastPostAdd < postes[0].id) {
                    lastPostAdd =postes[0].id
                    writePostes(postes)
                } else {    

                    return;
                    
                }
            } else {
                writePostes(postes)
            }

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

setInterval(function () {
    getPostes(0, true, lastPostAdd)
}, 10000)

containerPoste.addEventListener("load", getPostes(current_page))


window.addEventListener("scroll", () => {

    const endOfPade = window.scrollY + window.innerHeight + 500 >= document.body.clientHeight

    if (endOfPade && request && current_page < last_page) {
        request = false
        current_page += 1
        getPostes(current_page)

    }
})