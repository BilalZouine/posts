function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function userInfo() {
    let card_user_name = document.querySelector("#userName")
    let card_name = document.querySelector("#name")
    let card_email = document.querySelector("#email")
    let card_poste_number = document.querySelector("#num_post")
    let card_comment_number = document.querySelector("#num_com")
    let user_img = document.querySelector("#user_img")
    let lienImg = document.querySelector("#lienImg")

    const id_user = getQueryParam("user_id")

    axios.get(url + `/users/${id_user}`)

        .then((response) => {
            const data = response.data.data

            card_user_name.innerHTML = data.username
            card_email.innerHTML = data.email
            card_name.innerHTML = data.name
            card_poste_number.innerHTML = data.posts_count
            card_comment_number.innerHTML = data.comments_count
            const url_img = typeof data.profile_image != "object" ? data.profile_image : "images/user.png"
            lienImg.href = `image.html?img=${url_img}`
            lienImg.target = "_blank"

            user_img.src = url_img

        })
}
