const maxColor = 255; //TODO: input color

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
        case "invert": change(invert); break; // TODO: invert => negative ?
        case "sepia": change(sepia); break;
        case "grayscaleAverage": change(grayscaleAverage); break;
        case "grayscaleMax": change(grayscaleMax); break;
        case "grayscaleMedium": change(grayscaleMedium); break;
        case "grayscaleMin": change(grayscaleMin); break;
        case "grayscaleRed": change(grayscaleRed); break;
        case "grayscaleGreen": change(grayscaleGreen); break;
        case "grayscaleBlue": change(grayscaleBlue); break;
        case "onlyRed": change(onlyRed); break;
        case "onlyGreen": change(onlyGreen); break;
        case "onlyBlue": change(onlyBlue); break;
        case "withoutRed": change(withoutRed); break;
        case "withoutGreen": change(withoutGreen); break;
        case "withoutBlue": change(withoutBlue); break;
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

function grayscaleAverage(red, green, blue) {
    let average = (red + green + blue) / 3;
    
    red = average;
    green = average;
    blue = average;

    return { red, green, blue };
}

function grayscaleMax(red, green, blue) {
    let max = Math.max(red, green, blue);
    
    red = max;
    green = max;
    blue = max;

    return { red, green, blue };
}

function grayscaleMedium(red, green, blue) {
    let medium = [red, green, blue].sort()[1];
    
    red = medium;
    green = medium;
    blue = medium;

    return { red, green, blue };
}

function grayscaleMin(red, green, blue) {
    let min = Math.min(red, green, blue);
    
    red = min;
    green = min;
    blue = min;

    return { red, green, blue };
}

function grayscaleRed(red, green, blue) {    
    red = red;
    green = red;
    blue = red;

    return { red, green, blue };
}

function grayscaleGreen(red, green, blue) {
    red = green;
    green = green;
    blue = green;

    return { red, green, blue };
}

function grayscaleBlue(red, green, blue) {
    red = blue;
    green = blue;
    blue = blue;

    return { red, green, blue };
}

function onlyRed(red, green, blue) {    
    red = red;
    green = 0;
    blue = 0;

    return { red, green, blue };
}

function onlyGreen(red, green, blue) {
    red = 0;
    green = green;
    blue = 0;

    return { red, green, blue };
}

function onlyBlue(red, green, blue) {
    red = 0;
    green = 0;
    blue = blue;

    return { red, green, blue };
}

function withoutRed(red, green, blue) {    
    red = 0;
    green = green;
    blue = blue;

    return { red, green, blue };
}

function withoutGreen(red, green, blue) {
    red = red;
    green = 0;
    blue = blue;

    return { red, green, blue };
}

function withoutBlue(red, green, blue) {
    red = red;
    green = green;
    blue = 0;

    return { red, green, blue };
}