
// const urlObj = new URL(url);

let image = document.querySelector("#image")

if (image) {
    const Param = new URLSearchParams(window.location.search)
    console.log(1);

    const imageSrc = Param.get("img")
    image.src = imageSrc;
}


