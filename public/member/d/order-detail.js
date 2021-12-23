let invoiceDetail = JSON.parse(localStorage.getItem('invoiceDetail'));
let invoiceId = localStorage.getItem('invoiceId');
let allProduct = invoiceDetail.productSelected;
if (invoiceDetail == null) {
    location.href = '../../index.html';
}

// เลขที่ใบคำสั่งซื้อ
let invoiceIdZone = document.querySelector('.topna > span');
invoiceIdZone.innerHTML = invoiceId;
// กรอบใบคำสั่งซื้อ
let container = document.querySelector('#allPriceZone');

allProduct.forEach((oneProduct) => {
    // ข้อมูลสินค้าหนึ่งชิ้น
    let productZone = document.createElement('div');
    
    // ชื่อสินค้า
    let productName = document.createElement('li');
    productName.innerHTML = oneProduct.productName;

    // จำนวน
    let amountZone = document.createElement('p');
    amountZone.innerHTML += 'จำนวน ';
    let thisAmount = document.createElement('span');
    thisAmount.innerHTML = ' ' + oneProduct.amount;
    amountZone.append(thisAmount);
    amountZone.innerHTML += ' เล่ม';

    // รวมราคา
    let totalProductZone = document.createElement('p');
    totalProductZone.innerHTML += 'รวมราคา ';
    let thisTotal = document.createElement('span');
    thisTotal.innerHTML = ' ' + (oneProduct.price * oneProduct.amount);
    totalProductZone.append(thisTotal);
    totalProductZone.innerHTML += ' บาท';

    productZone.append(productName, amountZone, totalProductZone);

    container.append(productZone);
});

// ยอดเงินทั้งหมดที่ต้องชำระ
let totalPrice = document.querySelector('#totalPrice');
totalPrice.innerHTML = invoiceDetail.productTotalPrice + invoiceDetail.shippingCost;


