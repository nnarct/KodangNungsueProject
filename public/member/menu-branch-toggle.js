// <!------------------------- order status menu  ------------------------->

// ปุ่มรอการตรวจสอบ
document.getElementById("wait4check").onclick = function () {
    document.getElementById("wait4check").style.background = "rgb(155, 231, 97)" ;
    document.getElementById("wait4deli").style.background = "white";
    document.getElementById("gift").style.background = "white";
    
    document.getElementById("OS-check").style.display = "block";
    document.getElementById("OS-deli").style.display = "none";
    document.getElementById("OS-get").style.display = "none";
}
// ปุ่มรอการจัดส่ง
document.getElementById("wait4deli").onclick = function () {
    document.getElementById("wait4check").style.background = "white" ;
    document.getElementById("wait4deli").style.background = "rgb(155, 231, 97)";
    document.getElementById("gift").style.background = "white";

    document.getElementById("OS-check").style.display = "none";
    document.getElementById("OS-deli").style.display = "block";
    document.getElementById("OS-get").style.display = "none";
}
// ปุ่มที่ต้อได้รับ
document.getElementById("gift").onclick = function () {
    document.getElementById("wait4check").style.background = "white";
    document.getElementById("wait4deli").style.background = "white";
    document.getElementById("gift").style.background = "rgb(155, 231, 97)";


    document.getElementById("OS-check").style.display = "none";
    document.getElementById("OS-deli").style.display = "none";
    document.getElementById("OS-get").style.display = "block";

}





// <!------------------------- seller menu ------------------------->
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