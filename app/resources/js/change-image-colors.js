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
        case "invert": change(invert); break; // TODO: invert => negative ?
        case "sepia": change(sepia); break;
        case "sepiaRandom": change(sepiaRandom); break;
        case "grayscaleAverage": change(grayscaleAverage); break;
        case "grayscaleMax": change(grayscaleMax); break;
        case "grayscaleMedium": change(grayscaleMedium); break;
        case "grayscaleMin": change(grayscaleMin); break;
        case "grayscaleRed": change(grayscaleRed); break;
        case "grayscaleGreen": change(grayscaleGreen); break;
        case "grayscaleBlue": change(grayscaleBlue); break;
        case "blackAndWhiteAverage": change(blackAndWhiteAverage); break;
        case "blackAndWhiteMax": change(blackAndWhiteMax); break;
        case "blackAndWhiteMedium": change(blackAndWhiteMedium); break;
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
        case "multiplyWithEulerConstant": change(multiplyWithEulerConstant); break;
        case "multiplyWithNaturalLogarithmOf2": change(multiplyWithNaturalLogarithmOf2); break;
        case "multiplyWithNaturalLogarithmOf10": change(multiplyWithNaturalLogarithmOf10); break;
        case "multiplyWithBase2LogarithmOfEulerConstant": change(multiplyWithBase2LogarithmOfEulerConstant); break;
        case "multiplyWithBase10LogarithmOfEulerConstant": change(multiplyWithBase10LogarithmOfEulerConstant); break;
        case "multiplyWithPi": change(multiplyWithPi); break;
        case "multiplyWithSquareRootOf1Over2": change(multiplyWithSquareRootOf1Over2); break;
        case "multiplyWithSquareRootOf2": change(multiplyWithSquareRootOf2); break;
        case "multiplyWithAcos": change(multiplyWithAcos); break;
        case "multiplyWithAcosh": change(multiplyWithAcosh); break;
        case "multiplyWithAsin": change(multiplyWithAsin); break;
        case "multiplyWithAsinh": change(multiplyWithAsinh); break;
        case "multiplyWithAtan": change(multiplyWithAtan); break;
        case "multiplyWithAtanh": change(multiplyWithAtanh); break;
        case "grayscaleAtanhRedAndGreen": change(grayscaleAtanhRedAndGreen); break;
        case "grayscaleAtanhRedAndBlue": change(grayscaleAtanhRedAndBlue); break;
        case "grayscaleAtanhGreenAndRed": change(grayscaleAtanhGreenAndRed); break;
        case "grayscaleAtanhGreenAndBlue": change(grayscaleAtanhGreenAndBlue); break;
        case "grayscaleAtanhBlueAndRed": change(grayscaleAtanhBlueAndRed); break;
        case "grayscaleAtanhBlueAndGreen": change(grayscaleAtanhBlueAndGreen); break;
        case "blackAndWhiteAtanhRedAndGreen": change(blackAndWhiteAtanhRedAndGreen); break;
        case "blackAndWhiteAtanhRedAndBlue": change(blackAndWhiteAtanhRedAndBlue); break;
        case "blackAndWhiteAtanhGreenAndRed": change(blackAndWhiteAtanhGreenAndRed); break;
        case "blackAndWhiteAtanhGreenAndBlue": change(blackAndWhiteAtanhGreenAndBlue); break;
        case "blackAndWhiteAtanhBlueAndRed": change(blackAndWhiteAtanhBlueAndRed); break;
        case "blackAndWhiteAtanhBlueAndGreen": change(blackAndWhiteAtanhBlueAndGreen); break;
        case "multiplyWithCbrt": change(multiplyWithCbrt); break;
        case "clz32": change(clz32); break;
        case "multiplyWithCos": change(multiplyWithCos); break;
        case "multiplyWithCosh": change(multiplyWithCosh); break;
        case "multiplyWithExp": change(multiplyWithExp); break;
        case "multiplyWithExpm1": change(multiplyWithExpm1); break;
        case "grayscaleHypot": change(grayscaleHypot); break;
        case "blackAndWhiteHypot": change(blackAndWhiteHypot); break;
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

// TODO: checkbox => filterRed, filterGreen, filterBlue

function invert(red, green, blue) {
    red = maxColor - red;
    green = maxColor - green;
    blue = maxColor - blue;

    return { red, green, blue };
}

// function invertRed(red, green, blue) {
//     red = maxColor - red;
//     green = green;
//     blue = blue;

//     return { red, green, blue };
// }

// function invertGreen(red, green, blue) {
//     red = red;
//     green = maxColor - green;
//     blue = blue;

//     return { red, green, blue };
// }

// function invertBlue(red, green, blue) {
//     red = red;
//     green = green;
//     blue = maxColor - blue;

//     return { red, green, blue };
// }

function sepia(red, green, blue) {
    //TODO: input colors multipliers
    red = Math.min(Math.round(0.3 * red + 0.7 * green + 0.2 * blue), maxColor);
    green = Math.min(Math.round(0.3 * red + 0.5 * green + 0.2 * blue), maxColor);
    blue = Math.min(Math.round(0.3 * red + 0.5 * green + 0.1 * blue), maxColor);

    return { red, green, blue };
}

function sepiaRandom(red, green, blue) {
    red = Math.min(Math.round(Math.random() * red + Math.random() * green + Math.random() * blue), maxColor);
    green = Math.min(Math.round(Math.random() * red + Math.random() * green + Math.random() * blue), maxColor);
    blue = Math.min(Math.round(Math.random() * red + Math.random() * green + Math.random() * blue), maxColor);

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

function blackAndWhiteMedium(red, green, blue) {
    let medium = [red, green, blue].sort()[1];
    let blackAndWhite = Math.round(medium / maxColor) * maxColor;
    
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
    red = Math.round(red / maxColor) * maxColor;
    green = Math.round(green / maxColor) * maxColor;
    blue = Math.round(blue / maxColor) * maxColor;

    return { red, green, blue };
}

function multiplyWithEulerConstant(red, green, blue) {
    red = Math.round(red * Math.E) % (maxColor + 1);
    green = Math.round(green * Math.E) % (maxColor + 1);
    blue = Math.round(blue * Math.E) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithNaturalLogarithmOf2(red, green, blue) {
    red = Math.round(red * Math.LN2) % (maxColor + 1);
    green = Math.round(green * Math.LN2) % (maxColor + 1);
    blue = Math.round(blue * Math.LN2) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithNaturalLogarithmOf10(red, green, blue) {
    red = Math.round(red * Math.LN10) % (maxColor + 1);
    green = Math.round(green * Math.LN10) % (maxColor + 1);
    blue = Math.round(blue * Math.LN10) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithBase2LogarithmOfEulerConstant(red, green, blue) {
    red = Math.round(red * Math.LOG2E) % (maxColor + 1);
    green = Math.round(green * Math.LOG2E) % (maxColor + 1);
    blue = Math.round(blue * Math.LOG2E) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithBase10LogarithmOfEulerConstant(red, green, blue) {
    red = Math.round(red * Math.LOG10E) % (maxColor + 1);
    green = Math.round(green * Math.LOG10E) % (maxColor + 1);
    blue = Math.round(blue * Math.LOG10E) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithPi(red, green, blue) {
    red = Math.round(red * Math.PI) % (maxColor + 1);
    green = Math.round(green * Math.PI) % (maxColor + 1);
    blue = Math.round(blue * Math.PI) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithSquareRootOf1Over2(red, green, blue) {
    red = Math.round(red * Math.SQRT1_2) % (maxColor + 1);
    green = Math.round(green * Math.SQRT1_2) % (maxColor + 1);
    blue = Math.round(blue * Math.SQRT1_2) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithSquareRootOf2(red, green, blue) {
    red = Math.round(red * Math.SQRT2) % (maxColor + 1);
    green = Math.round(green * Math.SQRT2) % (maxColor + 1);
    blue = Math.round(blue * Math.SQRT2) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithAcos(red, green, blue) {
    red = Math.round(Math.acos(red / maxColor) * maxColor) % (maxColor + 1);
    green = Math.round(Math.acos(green / maxColor) * maxColor) % (maxColor + 1);
    blue = Math.round(Math.acos(blue / maxColor) * maxColor) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithAcosh(red, green, blue) {
    red = Math.round(Math.acosh(red / maxColor) * maxColor) % (maxColor + 1);
    green = Math.round(Math.acosh(green / maxColor) * maxColor) % (maxColor + 1);
    blue = Math.round(Math.acosh(blue / maxColor) * maxColor) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithAsin(red, green, blue) {
    red = Math.round(Math.asin(red / maxColor) * maxColor) % (maxColor + 1);
    green = Math.round(Math.asin(green / maxColor) * maxColor) % (maxColor + 1);
    blue = Math.round(Math.asin(blue / maxColor) * maxColor) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithAsinh(red, green, blue) {
    red = Math.round(Math.asinh(red / maxColor) * maxColor) % (maxColor + 1);
    green = Math.round(Math.asinh(green / maxColor) * maxColor) % (maxColor + 1);
    blue = Math.round(Math.asinh(blue / maxColor) * maxColor) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithAtan(red, green, blue) {
    red = Math.round(Math.atan(red / maxColor) * maxColor) % (maxColor + 1);
    green = Math.round(Math.atan(green / maxColor) * maxColor) % (maxColor + 1);
    blue = Math.round(Math.atan(blue / maxColor) * maxColor) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithAtanh(red, green, blue) {
    red = Math.round(Math.atanh(red / maxColor) * maxColor) % (maxColor + 1);
    green = Math.round(Math.atanh(green / maxColor) * maxColor) % (maxColor + 1);
    blue = Math.round(Math.atanh(blue / maxColor) * maxColor) % (maxColor + 1);

    return { red, green, blue };
}

function grayscaleAtanhRedAndGreen(red, green, blue) {
    let atan2 = Math.round(Math.atan2(red, green) * maxColor);

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function grayscaleAtanhRedAndBlue(red, green, blue) {
    let atan2 = Math.round(Math.atan2(red, blue) * maxColor);

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function grayscaleAtanhGreenAndRed(red, green, blue) {
    let atan2 = Math.round(Math.atan2(green, red) * maxColor);

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function grayscaleAtanhGreenAndBlue(red, green, blue) {
    let atan2 = Math.round(Math.atan2(green, blue) * maxColor);

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function grayscaleAtanhBlueAndRed(red, green, blue) {
    let atan2 = Math.round(Math.atan2(blue, red) * maxColor);

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function grayscaleAtanhBlueAndGreen(red, green, blue) {
    let atan2 = Math.round(Math.atan2(blue, green) * maxColor);

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function blackAndWhiteAtanhRedAndGreen(red, green, blue) {
    let atan2 = Math.round(Math.atan2(red, green)) * maxColor;

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function blackAndWhiteAtanhRedAndBlue(red, green, blue) {
    let atan2 = Math.round(Math.atan2(red, blue)) * maxColor;

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function blackAndWhiteAtanhGreenAndRed(red, green, blue) {
    let atan2 = Math.round(Math.atan2(green, red)) * maxColor;

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function blackAndWhiteAtanhGreenAndBlue(red, green, blue) {
    let atan2 = Math.round(Math.atan2(green, blue)) * maxColor;

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function blackAndWhiteAtanhBlueAndRed(red, green, blue) {
    let atan2 = Math.round(Math.atan2(blue, red)) * maxColor;

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function blackAndWhiteAtanhBlueAndGreen(red, green, blue) {
    let atan2 = Math.round(Math.atan2(blue, green)) * maxColor;

    red = atan2;
    green = atan2;
    blue = atan2;

    return { red, green, blue };
}

function multiplyWithCbrt(red, green, blue) {
    red = Math.round(Math.cbrt(red) * red) % (maxColor + 1);
    green = Math.round(Math.cbrt(green) * green) % (maxColor + 1);
    blue = Math.round(Math.cbrt(blue) * blue) % (maxColor + 1);

    return { red, green, blue };
}

function clz32(red, green, blue) {
    red = Math.clz32(red);
    green = Math.clz32(green);
    blue = Math.clz32(blue);

    return { red, green, blue };
}

function multiplyWithCos(red, green, blue) {
    red = Math.round(((Math.cos(red) + 1) / 2) * maxColor) % (maxColor + 1);
    green = Math.round(((Math.cos(green) + 1) / 2) * maxColor) % (maxColor + 1);
    blue = Math.round(((Math.cos(blue) + 1) / 2) * maxColor) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithCosh(red, green, blue) {
    red = Math.round(Math.cosh(red) * maxColor) % (maxColor + 1);
    green = Math.round(Math.cosh(green) * maxColor) % (maxColor + 1);
    blue = Math.round(Math.cosh(blue) * maxColor) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithExp(red, green, blue) {
    red = Math.round(Math.exp(red)) % (maxColor + 1);
    green = Math.round(Math.exp(green)) % (maxColor + 1);
    blue = Math.round(Math.exp(blue)) % (maxColor + 1);

    return { red, green, blue };
}

function multiplyWithExpm1(red, green, blue) {
    red = Math.round(Math.expm1(red)) % (maxColor + 1);
    green = Math.round(Math.expm1(green)) % (maxColor + 1);
    blue = Math.round(Math.expm1(blue)) % (maxColor + 1);

    return { red, green, blue };
}

function grayscaleHypot(red, green, blue) {
    let hypot = Math.round(Math.hypot(red, green, blue)) % (maxColor + 1);
    
    red = hypot;
    green = hypot;
    blue = hypot;

    return { red, green, blue };
}

function blackAndWhiteHypot(red, green, blue) {
    let hypot = Math.round(Math.hypot(red, green, blue)) % (maxColor + 1);
    let blackAndWhite = Math.round(hypot / maxColor) * maxColor;
    
    red = blackAndWhite;
    green = blackAndWhite;
    blue = blackAndWhite;

    return { red, green, blue };
}