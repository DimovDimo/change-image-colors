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
};