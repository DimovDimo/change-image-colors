const canvasId = "canvas";
const imageType = "image/png";
const fileNameId = "file-name";
const eventElementId = "download-image";
const eventListener = "click";
const linkElement = "a";
const joinDataset = ":";

document.getElementById(eventElementId)
        .addEventListener(eventListener, download);

function download() {
    let link = createDownloadLink();
    setFileName(link);
    setImage(link);
    setDownloadUrl(link);
    linkClick(link);
}

function linkClick(link) {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function setDownloadUrl(link) {
    let datasetDownload = [imageType, link.download, link.href];
    link.dataset.downloadurl = datasetDownload.join(joinDataset);
}

function setImage(link) {
    let canvas = getCanvas();
    let image = canvas.toDataURL(imageType);
    link.href = image;
}

function setFileName(link) {
	link.download = document.getElementById(fileNameId).value;
}

function getCanvas() {
	return document.getElementById(canvasId);
}

function createDownloadLink() {
	return document.createElement(linkElement);
}