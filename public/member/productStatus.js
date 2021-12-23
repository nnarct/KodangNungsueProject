// <-------------------- ส่วนดำเนินการ ------------------------>
updatePendingPaymentProduct();
updateConsidingProduct();
updateWatingDelivery();

// <----------------------- ส่วนฟังก์ชัน -------------------------->
function updateConsidingProduct() {
    userDetail = updateUserDetail();

    let borderConsiderProduct = document.querySelector('.wait4check-cont');

    database.collection('invoice').where('userId', '==', userDetail.id).where('status', '==', 'รอการตรวจสอบ')
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let invoiceInfo = {
                    id: doc.id,
                    productSelected: doc.data().productSelected,
                    productTotalPrice: doc.data().productTotalPrice,
                    seller: doc.data().seller,
                    sellerId: doc.data().sellerId,
                    shippingCost: doc.data().shippingCost,
                    status: doc.data().status,
                    userId: doc.data().userId
                }
                let allProductDetail = invoiceInfo.productSelected;

                // กรอบสินค้า 1 ร้าน
                let divForOneStore = document.createElement('div');
                divForOneStore.classList.add('one-store-div');
                // แถบด้านบน
                let headerStatusProduct = document.createElement('div');
                headerStatusProduct.classList.add('ost-header');
                headerStatusProduct.innerHTML += 'ร้าน ';

                let spanNameStore = document.createElement('span');
                spanNameStore.innerHTML = invoiceInfo.seller;

                headerStatusProduct.append(spanNameStore);
                headerStatusProduct.innerHTML += ' เลขที่ใบคำสั่งซื้อ ';

                let numberInvoiceId = document.createElement('span');
                numberInvoiceId.innerHTML = invoiceInfo.id;

                headerStatusProduct.append(numberInvoiceId);

                let totalPriceZone = document.createElement('span');
                totalPriceZone.style.fontStyle = 'oblique';
                totalPriceZone.style.color = 'black';
                totalPriceZone.innerHTML += ' ราคารวม ';

                let totalPriceNum = document.createElement('span');
                totalPriceNum.style.color = 'red';
                totalPriceNum.innerHTML = invoiceInfo.productTotalPrice + invoiceInfo.shippingCost;

                totalPriceZone.append(totalPriceNum);
                totalPriceZone.innerHTML += ' บาท';

                headerStatusProduct.append(totalPriceZone);

                divForOneStore.append(headerStatusProduct);
                // จบแถบด้านบน

                // แถบสินค้า
                let bodyStatusProduct = document.createElement('div');
                bodyStatusProduct.classList.add('product-part');


                // ส่วนวนลูปแสดงสินค้าแต่ละอัน
                allProductDetail.forEach((eachProduct) => {

                    // กรอบสินค้าหนึ่งชิ้น
                    let eachProductBorder = document.createElement('div');
                    eachProductBorder.classList.add('one-product-dis');

                    // พื้นที่รูปกรอบรูป
                    let imageStatusZone = document.createElement('div');
                    imageStatusZone.classList.add('photo-display');
                    imageStatusZone.setAttribute('align', 'center');

                    // กรอบรูป
                    let imageBorderStatus = document.createElement('div');
                    imageBorderStatus.classList.add('prodaga');

                    let imageProductStatus = document.createElement('img');
                    imageProductStatus.classList.add('proaga');
                    imageProductStatus.style.boxShadow = '3px 4px 4px 3px lightgray';
                    imageProductStatus.src = '../src/noImage.png';

                    storageRef.child(invoiceInfo.sellerId + '/' + eachProduct.productId + '/image1')
                        .getDownloadURL().then((url) => {
                            imageProductStatus.src = url;
                        }).catch((error) => {
                            console.log(error.message);
                        });

                    imageBorderStatus.append(imageProductStatus);
                    imageStatusZone.append(imageBorderStatus);

                    // ส่วนรายละเอียด
                    let detailStatusZone = document.createElement('div');
                    detailStatusZone.classList.add('prod-info-display');

                    // โซนชื่อ
                    let nameEachProduct = document.createElement('span');
                    nameEachProduct.style.fontWeight = 'border';
                    nameEachProduct.innerHTML += eachProduct.productName;
                    detailStatusZone.append(nameEachProduct);
                    detailStatusZone.innerHTML += '<br>';
                    detailStatusZone.innerHTML += 'จำนวน ';

                    let amountEachProduct = document.createElement('span');
                    amountEachProduct.innerHTML = eachProduct.amount;

                    detailStatusZone.append(amountEachProduct);
                    detailStatusZone.innerHTML += ' เล่ม';
                    detailStatusZone.innerHTML += '<br>';

                    detailStatusZone.innerHTML += ' ราคา';

                    let priceEachProduct = document.createElement('span');
                    priceEachProduct.innerHTML = eachProduct.price;

                    detailStatusZone.append(priceEachProduct);
                    detailStatusZone.innerHTML += ' บาท';

                    eachProductBorder.append(imageStatusZone, detailStatusZone);
                    bodyStatusProduct.append(eachProductBorder);


                });

                divForOneStore.append(bodyStatusProduct);
                borderConsiderProduct.append(divForOneStore);


            });


        });
}

function updatePendingPaymentProduct() {
    userDetail = updateUserDetail();

    let borderPendingProduct = document.querySelector('#pending-payment');

    database.collection('invoice').where('userId', '==', userDetail.id).where('status', '==', 'ที่ต้องชำระ')
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let invoiceInfo = {
                    id: doc.id,
                    productSelected: doc.data().productSelected,
                    productTotalPrice: doc.data().productTotalPrice,
                    seller: doc.data().seller,
                    sellerId: doc.data().sellerId,
                    shippingCost: doc.data().shippingCost,
                    status: doc.data().status,
                    userId: doc.data().userId
                }
                let allProductDetail = invoiceInfo.productSelected;

                // กรอบสินค้า 1 ร้าน
                let divForOneStore = document.createElement('div');
                divForOneStore.classList.add('one-store-div');
                // แถบด้านบน
                let headerStatusProduct = document.createElement('div');
                headerStatusProduct.classList.add('ost-header');
                headerStatusProduct.innerHTML += 'ร้าน ';

                let spanNameStore = document.createElement('span');
                spanNameStore.innerHTML = invoiceInfo.seller;

                headerStatusProduct.append(spanNameStore);
                headerStatusProduct.innerHTML += ' เลขที่ใบคำสั่งซื้อ ';

                let numberInvoiceId = document.createElement('span');
                numberInvoiceId.innerHTML = invoiceInfo.id;

                headerStatusProduct.append(numberInvoiceId);

                let totalPriceZone = document.createElement('span');
                totalPriceZone.style.fontStyle = 'oblique';
                totalPriceZone.style.color = 'black';
                totalPriceZone.innerHTML += ' ราคารวม ';

                let totalPriceNum = document.createElement('span');
                totalPriceNum.style.color = 'red';
                totalPriceNum.innerHTML = invoiceInfo.productTotalPrice + invoiceInfo.shippingCost;

                totalPriceZone.append(totalPriceNum);
                totalPriceZone.innerHTML += ' บาท';

                // เชื่อมไปหน้าชำระเงิน
                let linkToPay = document.createElement('a');
                linkToPay.href = '../inform-customer/payment-report.html';

                let buttonLinkToPay = document.createElement('input');
                buttonLinkToPay.type = 'button';
                buttonLinkToPay.classList.add('paymentbtn');
                buttonLinkToPay.value = 'แจ้งชำระเงิน';

                linkToPay.append(buttonLinkToPay);

                headerStatusProduct.append(totalPriceZone, linkToPay);

                divForOneStore.append(headerStatusProduct);
                // จบแถบด้านบน

                // แถบสินค้า
                let bodyStatusProduct = document.createElement('div');
                bodyStatusProduct.classList.add('product-part');


                // ส่วนวนลูปแสดงสินค้าแต่ละอัน
                allProductDetail.forEach((eachProduct) => {

                    // กรอบสินค้าหนึ่งชิ้น
                    let eachProductBorder = document.createElement('div');
                    eachProductBorder.classList.add('one-product-dis');

                    // พื้นที่รูปกรอบรูป
                    let imageStatusZone = document.createElement('div');
                    imageStatusZone.classList.add('photo-display');
                    imageStatusZone.setAttribute('align', 'center');

                    // กรอบรูป
                    let imageBorderStatus = document.createElement('div');
                    imageBorderStatus.classList.add('prodaga');

                    let imageProductStatus = document.createElement('img');
                    imageProductStatus.classList.add('proaga');
                    imageProductStatus.style.boxShadow = '3px 4px 4px 3px lightgray';
                    imageProductStatus.src = '../src/noImage.png';

                    storageRef.child(invoiceInfo.sellerId + '/' + eachProduct.productId + '/image1')
                        .getDownloadURL().then((url) => {
                            imageProductStatus.src = url;
                        }).catch((error) => {
                            console.log(error.message);
                        });

                    imageBorderStatus.append(imageProductStatus);
                    imageStatusZone.append(imageBorderStatus);

                    // ส่วนรายละเอียด
                    let detailStatusZone = document.createElement('div');
                    detailStatusZone.classList.add('prod-info-display');

                    // โซนชื่อ
                    let nameEachProduct = document.createElement('span');
                    nameEachProduct.style.fontWeight = 'border';
                    nameEachProduct.innerHTML += eachProduct.productName;
                    detailStatusZone.append(nameEachProduct);
                    detailStatusZone.innerHTML += '<br>';
                    detailStatusZone.innerHTML += 'จำนวน ';

                    let amountEachProduct = document.createElement('span');
                    amountEachProduct.innerHTML = eachProduct.amount;

                    detailStatusZone.append(amountEachProduct);
                    detailStatusZone.innerHTML += ' เล่ม';
                    detailStatusZone.innerHTML += '<br>';

                    detailStatusZone.innerHTML += ' ราคา';

                    let priceEachProduct = document.createElement('span');
                    priceEachProduct.innerHTML = eachProduct.price;

                    detailStatusZone.append(priceEachProduct);
                    detailStatusZone.innerHTML += ' บาท';

                    eachProductBorder.append(imageStatusZone, detailStatusZone);
                    bodyStatusProduct.append(eachProductBorder);


                });

                divForOneStore.append(bodyStatusProduct);
                borderPendingProduct.append(divForOneStore);
                console.log(borderPendingProduct)


            });


        });
}

function updateWatingDelivery() {
    userDetail = updateUserDetail();

    let borderWatingProduct = document.querySelector('#OS-deli');

    database.collection('invoice').where('userId', '==', userDetail.id).where('status', '==', 'กำลังจัดส่ง')
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let invoiceInfo = {
                    id: doc.id,
                    productSelected: doc.data().productSelected,
                    productTotalPrice: doc.data().productTotalPrice,
                    seller: doc.data().seller,
                    sellerId: doc.data().sellerId,
                    shippingCost: doc.data().shippingCost,
                    status: doc.data().status,
                    userId: doc.data().userId
                }
                let allProductDetail = invoiceInfo.productSelected;

                // กรอบสินค้า 1 ร้าน
                let divForOneStore = document.createElement('div');
                divForOneStore.classList.add('one-store-div');
                // แถบด้านบน
                let headerStatusProduct = document.createElement('div');
                headerStatusProduct.classList.add('ost-header');
                headerStatusProduct.innerHTML += 'ร้าน ';

                let spanNameStore = document.createElement('span');
                spanNameStore.innerHTML = invoiceInfo.seller;

                headerStatusProduct.append(spanNameStore);
                headerStatusProduct.innerHTML += ' เลขที่ใบคำสั่งซื้อ ';

                let numberInvoiceId = document.createElement('span');
                numberInvoiceId.innerHTML = invoiceInfo.id;

                headerStatusProduct.append(numberInvoiceId);

                let totalPriceZone = document.createElement('span');
                totalPriceZone.style.fontStyle = 'oblique';
                totalPriceZone.style.color = 'black';
                totalPriceZone.innerHTML += ' ราคารวม ';

                let totalPriceNum = document.createElement('span');
                totalPriceNum.style.color = 'red';
                totalPriceNum.innerHTML = invoiceInfo.productTotalPrice + invoiceInfo.shippingCost;

                totalPriceZone.append(totalPriceNum);
                totalPriceZone.innerHTML += ' บาท';

                let trackingTell = document.createElement('span');
                trackingTell.style.color = 'gray';
                trackingTell.innerHTML = ' ผู้ขายกำลังจัดส่งสินค้า';

                headerStatusProduct.append(totalPriceZone, trackingTell);

                divForOneStore.append(headerStatusProduct);
                // จบแถบด้านบน

                // แถบสินค้า
                let bodyStatusProduct = document.createElement('div');
                bodyStatusProduct.classList.add('product-part');


                // ส่วนวนลูปแสดงสินค้าแต่ละอัน
                allProductDetail.forEach((eachProduct) => {

                    // กรอบสินค้าหนึ่งชิ้น
                    let eachProductBorder = document.createElement('div');
                    eachProductBorder.classList.add('one-product-dis');

                    // พื้นที่รูปกรอบรูป
                    let imageStatusZone = document.createElement('div');
                    imageStatusZone.classList.add('photo-display');
                    imageStatusZone.setAttribute('align', 'center');

                    // กรอบรูป
                    let imageBorderStatus = document.createElement('div');
                    imageBorderStatus.classList.add('prodaga');

                    let imageProductStatus = document.createElement('img');
                    imageProductStatus.classList.add('proaga');
                    imageProductStatus.style.boxShadow = '3px 4px 4px 3px lightgray';
                    imageProductStatus.src = '../src/noImage.png';

                    storageRef.child(invoiceInfo.sellerId + '/' + eachProduct.productId + '/image1')
                        .getDownloadURL().then((url) => {
                            imageProductStatus.src = url;
                        }).catch((error) => {
                            console.log(error.message);
                        });

                    imageBorderStatus.append(imageProductStatus);
                    imageStatusZone.append(imageBorderStatus);

                    // ส่วนรายละเอียด
                    let detailStatusZone = document.createElement('div');
                    detailStatusZone.classList.add('prod-info-display');

                    // โซนชื่อ
                    let nameEachProduct = document.createElement('span');
                    nameEachProduct.style.fontWeight = 'border';
                    nameEachProduct.innerHTML += eachProduct.productName;
                    detailStatusZone.append(nameEachProduct);
                    detailStatusZone.innerHTML += '<br>';
                    detailStatusZone.innerHTML += 'จำนวน ';

                    let amountEachProduct = document.createElement('span');
                    amountEachProduct.innerHTML = eachProduct.amount;

                    detailStatusZone.append(amountEachProduct);
                    detailStatusZone.innerHTML += ' เล่ม';
                    detailStatusZone.innerHTML += '<br>';

                    detailStatusZone.innerHTML += ' ราคา';

                    let priceEachProduct = document.createElement('span');
                    priceEachProduct.innerHTML = eachProduct.price;

                    detailStatusZone.append(priceEachProduct);
                    detailStatusZone.innerHTML += ' บาท';

                    eachProductBorder.append(imageStatusZone, detailStatusZone);
                    bodyStatusProduct.append(eachProductBorder);


                });

                divForOneStore.append(bodyStatusProduct);
                borderWatingProduct.append(divForOneStore);


            });


        });
}