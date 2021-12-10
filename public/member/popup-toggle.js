
    document.getElementById("myinfo").onclick = function () {
        document.getElementById("toEdit-btn").style.display = "block"; // popup ปุ่ม แก้ไขข้อมูล
        document.getElementById("editing").style.display = "none"; // ปุ่ม ย้อนกลับ
        document.getElementById("displayInput").style.display = "none"; // input field สำหรับการเปลี่ยนข้อมูลส่วนตัวของ user
        document.getElementById("display").style.display = "flex";// display ข้้อมูลส่วนตัวของ user
        document.getElementById("preview").style.display = "none";// input photo field สำหรับการเปลี่ยนรูปโปรไฟล์ของ 
        document.getElementById("proPic").style.display = "block";// display รูปโปรไฟล์ปััจจุบันของuser
        document.getElementById("popup1").style.display = "block";// popup ข้อมูลของฉัน
        document.getElementById("popup2").style.display = "none"; // popup เปลี่ยนพาสเวิด
        document.getElementById("popup3").style.display = "none"; // popup ประวัติการซื้อ
        document.getElementById("popup4").style.display = "none"; // popup สินค้าที่ต้องชำะ
        document.getElementById("popup5").style.display = "none"; // popup สถานะสินค้า            
        document.getElementById("popup6").style.display = "none"; // popup การขาย    
    }
    document.getElementById("changePassword").onclick = function () {
        document.getElementById("popup1").style.display = "none"; // popup บัญชีของฉัน
        document.getElementById("popup2").style.display = "block";// popup เปลี่ยนพาสเวิด
        document.getElementById("popup3").style.display = "none"; // popup ประวัติการซื้อ
        document.getElementById("popup4").style.display = "none"; // popup สินค้าทีต้องชำระ
        document.getElementById("popup5").style.display = "none"; // popup สถานะสินค้า
        document.getElementById("popup6").style.display = "none"; // popup การขาย
    }
    document.getElementById("orderHistory").onclick = function () {
        document.getElementById("popup1").style.display = "none"; // popup บัญชีของฉัน
        document.getElementById("popup2").style.display = "none"; // popup เปลี่ยนพาสเวิด
        document.getElementById("popup3").style.display = "block";// popup ประวัติการซื้อ
        document.getElementById("popup4").style.display = "none"; // popup สินค้าที่ต้อชำระ
        document.getElementById("popup5").style.display = "none"; // popup สถานะสินค้า
        document.getElementById("popup6").style.display = "none"; // popup การขาย
    }
    document.getElementById("unpaid").onclick = function () {
        document.getElementById("popup1").style.display = "none"; // popup บัญชีของฉัน
        document.getElementById("popup2").style.display = "none"; // popup เปลี่ยนพาสเวิด
        document.getElementById("popup3").style.display = "none"; // popup ประวัติการซื้อ
        document.getElementById("popup4").style.display = "block";// popup สินค้าที่ต้องชำระ
        document.getElementById("popup5").style.display = "none"; // popup สถานะสินค้า
        document.getElementById("popup6").style.display = "none"; // popup การขาย
    }
    document.getElementById("orderStatus").onclick = function () {
        document.getElementById("popup1").style.display = "none"; // popup บัญชีของฉัน
        document.getElementById("popup2").style.display = "none"; // popup เปลี่ยนพาสเวิด
        document.getElementById("popup3").style.display = "none"; // popup ประวัติการซื้อ
        document.getElementById("popup4").style.display = "none"; // popup สินค้าที่ต้องชำระ
        document.getElementById("popup5").style.display = "block";// popup สถานะสินค้า
        document.getElementById("popup6").style.display = "none"; // popup การขาย
    }
    document.getElementById("selling").onclick = function () {
        document.getElementById("popup1").style.display = "none"; // popup บัญชีของฉัน
        document.getElementById("popup2").style.display = "none"; // popup เปลี่ยนพาสเวิด
        document.getElementById("popup3").style.display = "none"; // popup ประวัติการซื้อ
        document.getElementById("popup4").style.display = "none"; // popup สินค้าที่ต้องชำระ
        document.getElementById("popup5").style.display = "none"; // popup สถานะสินค้า
        document.getElementById("popup6").style.display = "block";// popup การขาย
    }
    document.getElementById("seller").onclick = function () {
        document.getElementById("popup1").style.display = "none"; // popup บัญชีของฉัน
        document.getElementById("popup2").style.display = "none"; // popup เปลี่ยนพาสเวิด
        document.getElementById("popup3").style.display = "none"; // popup ประวัติการซื้อ
        document.getElementById("popup4").style.display = "none"; // popup สินค้าที่ต้องชำระ
        document.getElementById("popup5").style.display = "none"; // popup สถานะสินค้า
        document.getElementById("popup6").style.display = "block";// popup การขาย
    }
        