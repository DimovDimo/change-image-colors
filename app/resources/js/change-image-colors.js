const maxColor = 255;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let image = new Image();
image.crossOrigin = "anonymous";
let imagePath = "resources/images/parrot.jpg";
image.src = imagePath;

image.onload = function () {
    context.drawImage(image, 0, 0); //TODO: input context.drawImage(img,x,y,width,height);
};

let filters = document.getElementById("select-filters");
filters.addEventListener("change", selectFilters);

function selectFilters() {
    switch (filters.value) {
        case "invert": invert(); break;
        default: original();
    }
}

function original() {
    context.drawImage(image, 0, 0);
}

function invert() {
    //original()
    context.drawImage(image, 0, 0);

    //get data
    let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    for (let i = 0; i < data.length; i = i + 4) {
        let red = data[i];
        let green = data[i + 1];
        let blue = data[i + 2];

        /* red */   data[i]     = maxColor - red;
        /* green */ data[i + 1] = maxColor - green;
        /* blue */  data[i + 2] = maxColor - blue;
    }
    
    //put data
    context.putImageData(imgData, 0, 0);
}