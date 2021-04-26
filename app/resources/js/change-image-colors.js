let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let image = new Image();
let imagePath = 'resources/images/parrot.jpg';
image.src = imagePath;

image.onload = function () {
    context.drawImage(image, 0, 0); //TODO: input context.drawImage(img,x,y,width,height);
};

function original() {
    context.drawImage(image, 0, 0);
}

function invert() {
    //original()
    context.drawImage(img, 0, 0);

    //get data
    let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for (let i = 0; i < data.length; i = i + 4) {
        let red = data[i];
        let green = data[i + 1];
        let blue = data[i + 2];

        red = 255 - red;
        green = 255 - green;
        blue = 255 - blue;
    }

    //put data
    context.putImageData(imgData, 0, 0);
}