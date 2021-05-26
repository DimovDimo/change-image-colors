const maxColor = 255; //TODO: input color
//TODO: in range min-max color (between) => min + (color % ((max - min) + 1))

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let image = new Image();
image.crossOrigin = "anonymous";
let imagePath = "resources/images/flower-field-spectrum.jpg";
image.src = imagePath;

image.onload = function () {
    context.drawImage(image, 0, 0); //TODO: input context.drawImage(img,x,y,width,height);
};

let filters = document.getElementById("select-filters");
filters.addEventListener("change", selectFilters);

function selectFilters() {
    switch (filters.value) {
        case "invert": change(invert); break;
        case "invertRed": change(invertRed); break;
        case "invertGreen": change(invertGreen); break;
        case "invertBlue": change(invertBlue); break;
        case "sepia": change(sepia); break;
        case "sepiaRed": change(sepiaRed); break;
        case "sepiaGreen": change(sepiaGreen); break;
        case "sepiaBlue": change(sepiaBlue); break;
        case "sepiaRandom": change(sepiaRandom); break;
        case "averageRed": change(averageRed); break;
        case "averageGreen": change(averageGreen); break;
        case "averageBlue": change(averageBlue); break;
        case "grayscaleAverage": change(grayscaleAverage); break;
        case "grayscaleMax": change(grayscaleMax); break;
        case "grayscaleMin": change(grayscaleMin); break;
        case "grayscaleRed": change(grayscaleRed); break;
        case "grayscaleGreen": change(grayscaleGreen); break;
        case "grayscaleBlue": change(grayscaleBlue); break;
        case "blackAndWhiteAverage": change(blackAndWhiteAverage); break;
        case "blackAndWhiteMax": change(blackAndWhiteMax); break;
        case "blackAndWhiteMin": change(blackAndWhiteMin); break;
        case "blackAndWhiteRed": change(blackAndWhiteRed); break;
        case "blackAndWhiteGreen": change(blackAndWhiteGreen); break;
        case "blackAndWhiteBlue": change(blackAndWhiteBlue); break;
        case "onlyRed": change(onlyRed); break;
        case "onlyGreen": change(onlyGreen); break;
        case "onlyBlue": change(onlyBlue); break;
        case "withoutRed": change(withoutRed); break;
        case "withoutGreen": change(withoutGreen); break;
        case "withoutBlue": change(withoutBlue); break;
        case "redInGreen": change(redInGreen); break;
        case "redInBlue": change(redInBlue); break;
        case "greenInRed": change(greenInRed); break;
        case "greenInBlue": change(greenInBlue); break;
        case "blueInRed": change(blueInRed); break;
        case "blueInGreen": change(blueInGreen); break;
        case "changeRedWithGreen": change(changeRedWithGreen); break;
        case "changeRedWithBlue": change(changeRedWithBlue); break;
        case "changeGreenWithBlue": change(changeGreenWithBlue); break;
        case "noise": change(noise); break;
        case "noiseUp": change(noiseUp); break;
        case "noiseDown": change(noiseDown); break;
        case "maximaAndMinima": change(maximaAndMinima); break;
        case "maximaAndMinimaRed": change(maximaAndMinimaRed); break;
        case "maximaAndMinimaGreen": change(maximaAndMinimaGreen); break;
        case "maximaAndMinimaBlue": change(maximaAndMinimaBlue); break;
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
    red = calculateInvert(red);
    green = calculateInvert(green);
    blue = calculateInvert(blue);

    return { red, green, blue };
}

function invertRed(red, green, blue) {
    red = calculateInvert(red);
    green = green;
    blue = blue;

    return { red, green, blue };
}

function invertGreen(red, green, blue) {
    red = red;
    green = calculateInvert(green);
    blue = blue;

    return { red, green, blue };
}

function invertBlue(red, green, blue) {
    red = red;
    green = green;
    blue = calculateInvert(blue);

    return { red, green, blue };
}

function sepia(red, green, blue) {
    red = calculateSepia(0.4, red, 0.8, green, 0.2, blue);
    green = calculateSepia(0.4, red, 0.7, green, 0.2, blue);
    blue = calculateSepia(0.3, red, 0.5, green, 0.1, blue);

    return { red, green, blue };
}

function sepiaRed(red, green, blue) {
    red = calculateSepia(0.4, red, 0.8, green, 0.2, blue);
    green = green;
    blue = blue;

    return { red, green, blue };
}

function sepiaGreen(red, green, blue) {
    red = red;
    green = calculateSepia(0.4, red, 0.7, green, 0.2, blue);
    blue = blue;

    return { red, green, blue };
}

function sepiaBlue(red, green, blue) {
    red = red;
    green = green;
    blue = calculateSepia(0.3, red, 0.5, green, 0.1, blue);

    return { red, green, blue };
}

function sepiaRandom(red, green, blue) {
    red = calculateSepia(Math.random(), red, Math.random(), green, Math.random(), blue);
    green = calculateSepia(Math.random(), red, Math.random(), green, Math.random(), blue);
    blue = calculateSepia(Math.random(), red, Math.random(), green, Math.random(), blue);

    return { red, green, blue };
}

function averageRed(red, green, blue) {
    red = calculateAverage(red, green, blue);
    green = green;
    blue = blue;

    return { red, green, blue };
}

function averageGreen(red, green, blue) {
    red = red;
    green = calculateAverage(red, green, blue);
    blue = blue;

    return { red, green, blue };
}

function averageBlue(red, green, blue) {
    red = red;
    green = green;
    blue = calculateAverage(red, green, blue);

    return { red, green, blue };
}

function grayscaleAverage(red, green, blue) {
    let average = calculateAverage(red, green, blue);
    
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

// TODO: blackAndWhite > minAndMax
function blackAndWhiteAverage(red, green, blue) {
    let average = (red + green + blue) / 3;
    let blackAndWhite = Math.round(average / maxColor) * maxColor;
    
    red = blackAndWhite;
    green = blackAndWhite;
    blue = blackAndWhite;

    return { red, green, blue };
}

function blackAndWhiteMax(red, green, blue) {
    let max = Math.max(red, green, blue);
    let blackAndWhite = Math.round(max / maxColor) * maxColor;
    
    red = blackAndWhite;
    green = blackAndWhite;
    blue = blackAndWhite;

    return { red, green, blue };
}

function blackAndWhiteMin(red, green, blue) {
    let min = Math.min(red, green, blue);
    let blackAndWhite = Math.round(min / maxColor) * maxColor;
    
    red = blackAndWhite;
    green = blackAndWhite;
    blue = blackAndWhite;

    return { red, green, blue };
}

function blackAndWhiteRed(red, green, blue) {
    let blackAndWhite = Math.round(red / maxColor) * maxColor;

    red = blackAndWhite;
    green = blackAndWhite;
    blue = blackAndWhite;

    return { red, green, blue };
}

function blackAndWhiteGreen(red, green, blue) {
    let blackAndWhite = Math.round(green / maxColor) * maxColor;

    red = blackAndWhite;
    green = blackAndWhite;
    blue = blackAndWhite;

    return { red, green, blue };
}

function blackAndWhiteBlue(red, green, blue) {
    let blackAndWhite = Math.round(blue / maxColor) * maxColor;

    red = blackAndWhite;
    green = blackAndWhite;
    blue = blackAndWhite;

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

function redInGreen(red, green, blue) {
    red = red;
    green = red;
    blue = blue;

    return { red, green, blue };
}

function redInBlue(red, green, blue) {
    red = red;
    green = green;
    blue = red;

    return { red, green, blue };
}

function greenInRed(red, green, blue) {
    red = green;
    green = green;
    blue = blue;

    return { red, green, blue };
}

function greenInBlue(red, green, blue) {
    red = red;
    green = green;
    blue = green;

    return { red, green, blue };
}

function blueInRed(red, green, blue) {
    red = blue;
    green = green;
    blue = blue;

    return { red, green, blue };
}

function blueInGreen(red, green, blue) {
    red = red;
    green = blue;
    blue = blue;

    return { red, green, blue };
}

function changeRedWithGreen(red, green, blue) {
    red = green;
    green = red;
    blue = blue;

    return { red, green, blue };
}

function changeRedWithBlue(red, green, blue) {
    red = blue;
    green = green;
    blue = red;

    return { red, green, blue };
}

function changeGreenWithBlue(red, green, blue) {
    red = red;
    green = blue;
    blue = green;

    return { red, green, blue };
}

function noise(red, green, blue) {
    red = Math.min(Math.round(red * (2 * Math.random())), maxColor);
    green = Math.min(Math.round(green * (2 * Math.random())), maxColor);
    blue = Math.min(Math.round(blue * (2 * Math.random())), maxColor);

    return { red, green, blue };
}

function noiseUp(red, green, blue) {
    red = Math.min(Math.round(red * (1 + Math.random())), maxColor);
    green = Math.min(Math.round(green * (1 + Math.random())), maxColor);
    blue = Math.min(Math.round(blue * (1 + Math.random())), maxColor);

    return { red, green, blue };
}

function noiseDown(red, green, blue) {
    red = Math.min(Math.round(red * Math.random()), maxColor);
    green = Math.min(Math.round(green * Math.random()), maxColor);
    blue = Math.min(Math.round(blue * Math.random()), maxColor);

    return { red, green, blue };
}

function maximaAndMinima(red, green, blue) {
    red = calculateMaximaAndMinima(red);
    green = calculateMaximaAndMinima(green);
    blue = calculateMaximaAndMinima(blue);

    return { red, green, blue };
}

function maximaAndMinimaRed(red, green, blue) {
    red = calculateMaximaAndMinima(red);
    green = green;
    blue = blue;

    return { red, green, blue };
}

function maximaAndMinimaGreen(red, green, blue) {
    red = red;
    green = calculateMaximaAndMinima(green);
    blue = blue;

    return { red, green, blue };
}

function maximaAndMinimaBlue(red, green, blue) {
    red = red;
    green = green;
    blue = calculateMaximaAndMinima(blue);

    return { red, green, blue };
}

function calculateInvert(color) {
    return maxColor - color;
}

function calculateSepia(multiplierRed, red, multiplierGreen, green, multiplierBlue, blue) {
    return Math.min(Math.round(multiplierRed * red + multiplierGreen * green + multiplierBlue * blue), maxColor);
}

function calculateAverage(red, green, blue) {
    return (red + green + blue) / 3;
}

function calculateMaximaAndMinima(color) {
    return Math.round(color / maxColor) * maxColor;
}