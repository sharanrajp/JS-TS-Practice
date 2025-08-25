var fullImgBox = document.getElementById("fullImgBox");
var fullImg = document.getElementById("fullImg");

function openFullImg(image) {
    fullImgBox.style.display = "flex";
    fullImg.src = image;

}
function closeFullImg() {
    fullImgBox.style.display = "none";
}