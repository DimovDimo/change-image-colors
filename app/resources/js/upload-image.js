let uploadImage = document.getElementById("upload-image");
uploadImage.addEventListener("change", upload());

function upload() {
    return function (event) {
        let file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function (imageEvent) { readImage(imageEvent); };
    };
}

function readImage(imageEvent) {
    let image = new Image();
    image.src = imageEvent.target.result;
    image.onload = function () { drawImage(image); };
}

function drawImage(image) {
    let canvas = document.getElementById("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
}
