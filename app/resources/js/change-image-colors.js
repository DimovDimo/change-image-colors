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
        case "invert": change(invert); break;
        case "sepia": change(sepia); break;
        default: original();
    }
}

function original() {
    context.drawImage(image, 0, 0);
}

function change(filter) {
    original(); //TODO: Current image

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    for (let color = 0; color < data.length; color = color + 4) {
        let { red, green, blue } = getColors(data, color);
        ({ red, green, blue } = filter(red, green, blue));
        setColors(data, color, red, green, blue);
    }

    context.putImageData(imageData, 0, 0);
}

function getColors(data, color) {
    let red = data[color];
    let green = data[color + 1];
    let blue = data[color + 2];

    return { red, green, blue };
}

function setColors(data, color, red, green, blue) {
    data[color] = red;
    data[color + 1] = green;
    data[color + 2] = blue;
}

function invert(red, green, blue) {
    red = maxColor - red;
    green = maxColor - green;
    blue = maxColor - blue;

    return { red, green, blue };
}

function sepia(red, green, blue) {
    //TODO: input colors multipliers
    red = Math.min(Math.round(0.3 * red + 0.7 * green + 0.2 * blue), maxColor);
    green = Math.min(Math.round(0.3 * red + 0.5 * green + 0.2 * blue), maxColor);
    blue = Math.min(Math.round(0.3 * red + 0.5 * green + 0.1 * blue), maxColor);

    return { red, green, blue };
}