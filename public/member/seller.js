document.getElementById("sellerInfo").onclick = function () {
    document.getElementById("sellerInfo").style.background = "rgb(155, 231, 97)" ;
    document.getElementById("sellerStorage").style.background = "white";
    document.getElementById("ship").style.background = "white";
    document.getElementById("addProduct").style.background = "white";
    document.getElementById("S-Info").style.display = "block";
    document.getElementById("S-Storage").style.display = "none";
    document.getElementById("S-Ship").style.display = "none";
    document.getElementById("S-AddProduct").style.display = "none";
}
document.getElementById("sellerStorage").onclick = function () {
    document.getElementById("sellerInfo").style.background = "white" ;
    document.getElementById("sellerStorage").style.background = "rgb(155, 231, 97)";
    document.getElementById("ship").style.background = "white";
    document.getElementById("addProduct").style.background = "white";

    document.getElementById("S-Info").style.display = "none";
    document.getElementById("S-Storage").style.display = "block";
    document.getElementById("S-Ship").style.display = "none";
    document.getElementById("S-AddProduct").style.display = "none";
}
document.getElementById("ship").onclick = function () {
    document.getElementById("sellerInfo").style.background = "white";
    document.getElementById("sellerStorage").style.background = "white";
    document.getElementById("ship").style.background = "rgb(155, 231, 97)";
    document.getElementById("addProduct").style.background = "white";

    document.getElementById("S-Info").style.display = "none";
    document.getElementById("S-Storage").style.display = "none";
    document.getElementById("S-Ship").style.display = "block";
    document.getElementById("S-AddProduct").style.display = "none";
}
document.getElementById("addProduct").onclick = function () {
   document.getElementById("sellerInfo").style.background = "white" ;
    document.getElementById("sellerStorage").style.background = "white";
    document.getElementById("ship").style.background = "white";
    document.getElementById("addProduct").style.background = "rgb(155, 231, 97)";
    
    document.getElementById("S-Info").style.display = "none";
    document.getElementById("S-Storage").style.display = "none";
    document.getElementById("S-Ship").style.display = "none";
    document.getElementById("S-AddProduct").style.display = "block";
}
document.getElementById("start-selling").onclick = function () { 
    document.getElementById("welcoming").style.display = "none";
    document.getElementById("becomingSeller").style.display= "block";
 }