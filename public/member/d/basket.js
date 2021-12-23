// <----------------------------------- เรียกข้อมูลผู้ใช้ --------------------------------------->
let userDetail = JSON.parse(localStorage.getItem('userNow'));
setBasket();
function setBasket() {

    // <-------------------- โซนพื้นที่ว่างของตะกร้า --------------------->
    let basketZone = document.querySelector('#area-shop');
    basketZone.innerHTML = null;

    database.collection('seller_selected').where('userId', '==', userDetail.id).get().then((resultSell) => {
        resultSell.forEach((sellSel) => {

            let allProductSelect = [];
            let sellerName = sellSel.data().seller;
            let dealingId = sellSel.id;
            let shippingCost = 50;
            let productTotalPrice = 0;

            // <-------------------- โซนของแต่ละร้านค้า ------------------------>
            let shopZone = document.createElement('table');
            shopZone.id = 'customers';

            // โซนชื่อและปุ่มเลือกร้าน
            let nameAndBtnZone = document.createElement('tr');
            nameAndBtnZone.style.backgroundColor = '#ddd';
            nameAndBtnZone.style.border = '0.5px solid rgb(139, 139, 139)';

            // ชื่อร้าน
            let storeNameShow = document.createElement('td');
            storeNameShow.setAttribute('colspan', '4');
            storeNameShow.innerHTML = sellerName;

            // โซนปุ่ม
            let btnZone = document.createElement('td');
            let editBtnZone = document.createElement('span');
            editBtnZone.classList.add('addq1');
            let editBtn = document.createElement('input');
            editBtn.type = 'button';
            editBtn.classList.add('pad1', 'gBtn', 'chooseBtn');
            editBtn.value = 'เลือกร้านนี้';
            editBtnZone.append(editBtn);

            let cancelBtnZone = document.createElement('td');
            cancelBtnZone.classList.add('chos1');
            let cancelBtn = document.createElement('input');
            cancelBtn.type = 'button';
            cancelBtn.classList.add('pad1', 'oBtn', 'cancelBtn');
            cancelBtn.value = 'ยกเลิก';
            cancelBtnZone.append(cancelBtn);

            btnZone.append(editBtnZone, cancelBtnZone)

            // ประกอบชื่อกับปุ่มเข้าด้วยกัน
            nameAndBtnZone.append(storeNameShow, btnZone);
            shopZone.append(nameAndBtnZone);


            database.collection('product_selected').where('sellerId', '==', sellSel.data().sellerId)
                .where('userId', '==', sellSel.data().userId).get().then((resultProd) => {
                    resultProd.forEach((prodSel) => {

                        // <----------------------- เก็บข้อมูล ------------------------>
                        let productDetail = {
                            id: prodSel.id,
                            sellerId: prodSel.data().sellerId,
                            userId: prodSel.data().userId,
                            productId: prodSel.data().productId,
                            productName: prodSel.data().productName,
                            price: prodSel.data().price,
                            amount: prodSel.data().amount
                        };

                        // โซนข้อมูลหนังสือ
                        let oneBookZone = document.createElement('tr');
                        oneBookZone.setAttribute('align', 'center');

                        // กรอบภาพ
                        let productImageZone = document.createElement('td');
                        productImageZone.style.width = '20%';

                        let productImageBorder = document.createElement('div');
                        productImageBorder.classList.add('imgbas');

                        // ตัวเลือกสินค้า
                        let chooseThis = document.createElement('input');
                        chooseThis.type = 'checkbox';
                        chooseThis.classList.add('check');
                        chooseThis.name = 'productSelected';
                        chooseThis.value = productDetail.id;
                        chooseThis.setAttribute('price', productDetail.price);
                        chooseThis.setAttribute('sellerId', productDetail.sellerId);

                        chooseThis.addEventListener('change', (event) => {
                            if (chooseThis.checked) {
                                productTotalPrice += Number(chooseThis.getAttribute('price'));
                                allProductSelect.push(productDetail);

                            } else {
                                productTotalPrice -= Number(chooseThis.getAttribute('price'));
                                let deleteAt = allProductSelect.findIndex(obj => obj.productId === productDetail.productId);
                                allProductSelect.splice(deleteAt, 1);

                            }
                            numberPriceBook.innerHTML = productTotalPrice + ' บาท'
                            numberTotalPrice.innerHTML = (productTotalPrice + shippingCost) + ' บาท'
                        });

                        // ภาพสินค้า
                        let imageProductBasket = document.createElement('img');
                        imageProductBasket.src = '../../src/noImage.png';

                        storageRef.child(productDetail.sellerId + '/' + productDetail.productId + '/image1').getDownloadURL()
                            .then((url) => {
                                imageProductBasket.src = url;
                            }).catch((error) => {
                                console.log(error.message);
                            });

                        productImageBorder.append(chooseThis, imageProductBasket);
                        productImageZone.append(productImageBorder);

                        // ชื่อและลบจากตะกร้า
                        let nameAndDelete = document.createElement('td');
                        nameAndDelete.setAttribute('align', 'left');

                        let borderNameAndDelete = document.createElement('div');

                        // ชื่อสินค้า
                        let productNameBasket = document.createElement('p');
                        productNameBasket.innerHTML = productDetail.productName;

                        // ปุ่มลบ
                        let deleteThisProduct = document.createElement('a');
                        deleteThisProduct.style.cursor = 'pointer';
                        deleteThisProduct.innerHTML = 'ลบออกจากตะกร้า';

                        deleteThisProduct.addEventListener('click', () => {
                            Swal.fire({
                                title: 'Are you sure ?',
                                text: "Do you want to delete this product",
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Sure'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Swal.fire({
                                        title: 'Please wait',
                                        text: 'Processing to add to basket',
                                        icon: 'info',
                                        allowEscapeKey: false,
                                        allowOutsideClick: false,
                                        didOpen: () => {
                                            Swal.showLoading()
                                        }
                                    });

                                    database.collection('product_selected').doc(productDetail.id)
                                        .delete().then(() => {
                                            let haveSeller = 0;
                                            database.collection('product_selected').where('sellerId', '==', productDetail.sellerId)
                                                .where('userId', '==', productDetail.userId).get().then((result) => {
                                                    result.forEach((doc) => {
                                                        haveSeller += 1;
                                                    });
                                                    if (haveSeller === 0) {
                                                        database.collection('seller_selected').doc(dealingId).delete().then(() => {
                                                            Swal.fire(
                                                                'Delete Success',
                                                                "The product has been deleted",
                                                                'success'
                                                            )
                                                            setBasket();
                                                            loadProductCount();
                                                        });
                                                    }
                                                    else {
                                                        Swal.fire(
                                                            'Delete Success',
                                                            "The product has been deleted",
                                                            'success'
                                                        )
                                                        setBasket();
                                                        loadProductCount();
                                                    }
                                                });
                                        });
                                }
                            });
                        });

                        borderNameAndDelete.append(productNameBasket, deleteThisProduct);
                        nameAndDelete.append(borderNameAndDelete);

                        // ราคา และ ราคารวม
                        let pricePerUnit = document.createElement('td');
                        pricePerUnit.innerHTML = productDetail.price + ' บาท';

                        let amountProductSelected = document.createElement('td');
                        let inputAmount = document.createElement('input');
                        inputAmount.type = 'number';
                        inputAmount.min = productDetail.amount;
                        inputAmount.max = productDetail.amount;
                        inputAmount.value = productDetail.amount;
                        inputAmount.classList.add('quanprod');
                        amountProductSelected.append(inputAmount);

                        let totalPrice = document.createElement('td');
                        totalPrice.innerHTML = productDetail.price * productDetail.amount + ' บาท';

                        oneBookZone.append(productImageZone, nameAndDelete, pricePerUnit, amountProductSelected, totalPrice);
                        shopZone.append(oneBookZone);

                        editBtn.addEventListener('click', () => {
                            chooseThis.style.display = 'block';
                        });
                        cancelBtn.addEventListener('click', () => {
                            chooseThis.style.display = 'none';
                        });

                    });
                });

            // โซนราคาสินค้ารวม
            let priceZone = document.createElement('div');
            priceZone.classList.add('total');
            priceZone.style.paddingBottom = '3%';

            // ตาราง
            let tableTotal = document.createElement('table');

            // ค่าหนังสือ
            let priceBook = document.createElement('tr');
            priceBook.innerHTML += '<td>ค่าหนังสือ</td>';
            let numberPriceBook = document.createElement('td');
            numberPriceBook.innerHTML = '0 บาท'
            priceBook.append(numberPriceBook);

            // ค่าส่ง
            let shippingCostDetail = document.createElement('tr');
            shippingCostDetail.innerHTML += '<td>ค่าส่ง</td>';
            let numberOfShipping = document.createElement('td');
            numberOfShipping.innerHTML = shippingCost + ' บาท';
            shippingCostDetail.append(numberOfShipping);

            // ราคารวม
            let totalPrice = document.createElement('tr');
            totalPrice.innerHTML += ' <td>ราคารวม</td>';
            let numberTotalPrice = document.createElement('td');
            numberTotalPrice.innerHTML = '0 บาท';
            totalPrice.append(numberTotalPrice);

            // ปุ่มยืนยันสินค้า
            let confirmInvoiceZone = document.createElement('tr');
            let borderInvoiceConfirm = document.createElement('td');
            borderInvoiceConfirm.setAttribute('colspan', '2');
            let confirmInvoiceBtn = document.createElement('input');
            confirmInvoiceBtn.type = 'button';
            confirmInvoiceBtn.classList.add('pad1', 'gBtn', 'confirmBtn');
            confirmInvoiceBtn.value = 'ยืนยันคำสั่งซื้อ';
            borderInvoiceConfirm.append(confirmInvoiceBtn);
            confirmInvoiceZone.append(borderInvoiceConfirm);

            tableTotal.append(priceBook, shippingCostDetail, totalPrice, confirmInvoiceZone);
            priceZone.append(tableTotal);
            basketZone.append(shopZone, priceZone);

            editBtn.addEventListener('click', () => {
                cancelBtnZone.style.display = 'block';
                priceZone.style.display = 'flex';


            });
            cancelBtn.addEventListener('click', () => {
                cancelBtnZone.style.display = 'none';
                priceZone.style.display = 'none';
            });

            confirmInvoiceBtn.addEventListener('click', () => {
                if (allProductSelect.length === 0) {
                    Swal.fire(
                        'Error',
                        "Please select at least one",
                        'error'
                    )
                    return;
                }

                Swal.fire({
                    title: 'Are you sure ?',
                    text: "Please check the shipping address carefully",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sure'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Please wait',
                            text: 'In the process of preparing the purchase order',
                            icon: 'info',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            didOpen: () => {
                                Swal.showLoading()
                            }
                        });

                        let productSelected = [];

                        allProductSelect.forEach((oneProductSelect) => {
                            productSelected.push({
                                amount: oneProductSelect.amount,
                                price: oneProductSelect.price,
                                productId: oneProductSelect.productId,
                                productName: oneProductSelect.productName
                            });
                        });

                        let invoiceCreate = {
                            productSelected: productSelected,
                            seller: sellerName,
                            sellerId: allProductSelect[0].sellerId,
                            shippingCost: shippingCost,
                            productTotalPrice: productTotalPrice,
                            status: 'ที่ต้องชำระ',
                            userId: allProductSelect[0].userId
                        };

                        database.collection('invoice').add(invoiceCreate).then((res) => {
                            let invoiceId = res.id;
                            localStorage.setItem('invoiceDetail', JSON.stringify(invoiceCreate));
                            localStorage.setItem('invoiceId', invoiceId);
                            let deleteCount = 0;
                            allProductSelect.forEach((oneProductSelect) => {
                                database.collection('product_selected').doc(oneProductSelect.id)
                                    .delete().then(() => {

                                        database.collection('products').doc(oneProductSelect.productId).get().then((doc) => {
                                            let amountProductNow = {
                                                amount: doc.data().amount - oneProductSelect.amount
                                            }
                                            database.collection('products').doc(oneProductSelect.productId).update(amountProductNow);
                                        });

                                        deleteCount += 1;
                                        if (deleteCount === allProductSelect.length) {
                                            let haveSeller = 0;
                                            database.collection('product_selected').where('sellerId', '==', allProductSelect[0].sellerId)
                                                .where('userId', '==', allProductSelect[0].userId).get().then((result) => {
                                                    result.forEach((doc) => {
                                                        haveSeller += 1;
                                                    });
                                                    if (haveSeller === 0) {
                                                        database.collection('seller_selected').doc(dealingId).delete().then(() => {
                                                            Swal.fire(
                                                                'Create purchase order success',
                                                                "Please check your purchase order",
                                                                'success'
                                                            )
                                                            setBasket();
                                                            loadProductCount();
                                                            setTimeout(() => {
                                                                location.href = 'order-detail.html';
                                                            }, 1500);
                                                        });
                                                    }
                                                    else {
                                                        Swal.fire(
                                                            'Create purchase order success',
                                                            "Please check your purchase order",
                                                            'success'
                                                        )
                                                        setBasket();
                                                        loadProductCount();
                                                        setTimeout(() => {
                                                            location.href = 'order-detail.html';
                                                        }, 1500);
                                                    }
                                                });
                                        }
                                    });
                            });

                        });

                    }
                });

            });


        });

        let allChooseBtn = document.querySelectorAll('.chooseBtn');
        let allCancelBtn = document.querySelectorAll('.cancelBtn');
        let allChooseBtnZone = document.querySelectorAll('.addq1');
        allChooseBtn.forEach((chooseBtn) => {
            chooseBtn.addEventListener('click', () => {
                allChooseBtnZone.forEach((chooseBtnZone) => {
                    chooseBtnZone.style.display = 'none';
                });
            });
        });

        allCancelBtn.forEach((cancelBtn) => {
            cancelBtn.addEventListener('click', () => {
                allChooseBtnZone.forEach((chooseBtnZone) => {
                    chooseBtnZone.style.display = 'block';
                });
            });
        });

    });

}