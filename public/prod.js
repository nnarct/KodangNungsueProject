// <-----------------------------------ส่วนดำเนินการ--------------------------------------------->
let userLogin = false;
auth.onAuthStateChanged((user) => {
    if (user) {
        userLogin = true;
    }
    else {
        userLogin = false;
    }
    showProduct();
});

// <----------------------------------- เรียกข้อมูลสินค้า --------------------------------------->
let userDetail = JSON.parse(localStorage.getItem('userNow'));   
let productDetail = JSON.parse(localStorage.getItem('productSelected'));
if (localStorage.getItem('productSelected') === null) {
    location.href = 'index.html'
}

function showProduct() {
    const br = document.createElement('br');

    // ส่วนของภาพสินค้า
    let imageZone = document.createElement('div');
    imageZone.classList.add('col-2');
    imageZone.style.width = '47%';

    // กรอบภาพใหญ่ทั้งหมด
    let imageLarges = document.querySelector('.cont');


    // ภาพใหญ่ทั้งหมด วนลูป
    let firstImage = document.querySelector('.mySlidede > img');
    let firstNumText = document.querySelector('.mySlidede > div');

    storageRef.child(productDetail.userId + '/' + productDetail.id + '/image1')
        .getDownloadURL().then((url) => {
            firstImage.src = url;
        }).catch((error) => {
            console.log(error.message);
        });
    firstNumText.innerHTML = '1 / ' + productDetail.imgLength;

    for (let i = 1; i < productDetail.imgLength; i++) {
        let imageLargeBorder = document.createElement('div');
        imageLargeBorder.classList.add('mySlidede');
        let numberText = document.createElement('div');
        numberText.classList.add('numbertext');
        numberText.innerHTML = (i + 1) + ' / ' + productDetail.imgLength;
        let image = document.createElement('img');
        image.style.width = '100%';
        image.src = 'src/noImage.png';
        storageRef.child(productDetail.userId + '/' + productDetail.id + '/image' + (i + 1))
            .getDownloadURL().then((url) => {
                image.src = url;
            }).catch((error) => {
                console.log(error.message);
            });

        imageLargeBorder.append(numberText, image);
        imageLarges.append(imageLargeBorder);
    }

    // ปุ่มเปลี่ยนสไลด์
    let prev = document.createElement('a');
    prev.classList.add('pre');
    prev.setAttribute('onclick', 'pluSlides(-1)');
    prev.innerHTML = '❮';
    let next = document.createElement('a');
    next.classList.add('nex');
    next.setAttribute('onclick', 'pluSlides(1)');
    next.innerHTML = '❯';

    imageLarges.append(prev, next);

    // กรอบภาพเล็กทั้งหมด
    let imageSmalls = document.createElement('div');
    imageSmalls.classList.add('ro');

    // ภาพเล็กทั้งหมด วนลูป
    for (let i = 0; i < productDetail.imgLength; i++) {
        let imageSmallBorder = document.createElement('div');
        imageSmallBorder.classList.add('colum');
        let imageSmall = document.createElement('img');
        imageSmall.classList.add('demo', 'cur', 'imgl');
        imageSmall.style.width = '100%';
        imageSmall.setAttribute('onclick', 'curSlide(' + (i + 1) + ')');
        imageSmall.src = 'src/noImage.png';
        storageRef.child(productDetail.userId + '/' + productDetail.id + '/image' + (i + 1))
            .getDownloadURL().then((url) => {
                imageSmall.src = url;
            }).catch((error) => {
                console.log(error.message);
            });

        imageSmallBorder.append(imageSmall);
        imageSmalls.append(imageSmallBorder);
    }

    imageLarges.append(imageSmalls);

    let detailBorder = document.querySelector('.bgde');

    // ชื่อสินค้า
    let productName = document.createElement('h1');
    productName.innerHTML = productDetail.name;
    // ราคาสินค้า
    let price = document.createElement('h1');
    price.innerHTML = productDetail.price + ' บาท';

    // คะแนนสินค้า
    let rating = document.createElement('div');
    rating.classList.add('star', 'pro');
    let productRate = productDetail.rating;
    for (let i = 0; i < 5; i++) {
        let star = document.createElement('span');
        star.classList.add('fa', 'fa-star');
        if (productRate >= 1) {
            star.classList.add('checked');
            productRate--;
        }
        else if (productRate !== 0) {
            star.classList.replace('fa-star', 'fa-star-half-full');
            star.classList.add('checked')
            productRate = 0;
        }
        rating.append(star);
    }

    // รายละเอียดสินค้า
    let detail = document.createElement('h3');
    detail.innerHTML += 'ลงขายโดย';
    // ชื่อผู้ขาย
    let sellerName = document.createElement('span');
    sellerName.classList.add('light');
    sellerName.innerHTML = productDetail.seller;
    detail.append(sellerName, br);
    // จังหวัด
    detail.innerHTML += 'จังหวัด';
    let province = document.createElement('span');
    province.classList.add('light');
    province.innerHTML = productDetail.province;
    detail.append(province, br);
    // รายละเอียด
    detail.innerHTML += 'รายละเอียดสินค้า' + '<br><br>';
    let text = document.createElement('span');
    text.classList.add('light');
    text.innerHTML = productDetail.detail;
    detail.append(text);

    // สภาพสินค้า
    let condition = document.createElement('h3');
    condition.innerHTML += 'สภาพสินค้า';
    let conDetail = document.createElement('span');
    conDetail.classList.add('light');
    conDetail.innerHTML = productDetail.condition;
    condition.append(conDetail);

    // วันที่ขาย
    const dateSell = new Date(productDetail.date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    let date = document.createElement('h3');
    date.innerHTML += 'ลงขายเมื่อ';
    let dateDetail = document.createElement('span');
    dateDetail.classList.add('light');
    dateDetail.innerHTML = dateSell;
    date.append(dateDetail);

    // ประเภทสินค้า
    let type = document.createElement('h3');
    type.innerHTML += 'ประเภทสินค้า';
    let typeDetail = document.createElement('span');
    typeDetail.classList.add('light');
    typeDetail.innerHTML = productDetail.type;
    type.append(typeDetail);

    // จำนวนสินค้า
    let amount = document.createElement('label');
    amount.setAttribute('for', 'quantity');
    amount.innerHTML = 'จำนวน';
    let amountDetail = document.createElement('input');
    amountDetail.type = 'number';
    amountDetail.id = 'quantity';
    amountDetail.name = 'quantity';
    amountDetail.min = 1;
    amountDetail.max = productDetail.amount;
    amountDetail.placeholder = '0';
    amountDetail.innerHTML += 'เล่ม';

    // เหลือสินค้า
    let balanced = document.createElement('h4');
    let balancedDetail = document.createElement('span');
    balancedDetail.classList.add('light', 'proleft');
    balancedDetail.innerHTML = 'เหลือสินค้า ' + productDetail.amount + ' เล่ม';
    balanced.append(balancedDetail);

    // หยิบใส่ตะกร้า
    let basketButton = document.createElement('div');
    basketButton.classList.add('addcart');
    let selectedBasket = document.createElement('input');
    selectedBasket.type = 'submit';
    selectedBasket.id = 'bas';
    selectedBasket.value = 'หยิบลงตะกร้า';
    basketButton.append(selectedBasket);

    if (!userLogin) {
        let noLogin = document.createElement('span');
        noLogin.classList.add('overlay-no');
        let linkToLogin = document.createElement('a');
        linkToLogin.href = 'auth/login/login.html ';
        linkToLogin.classList.add('textno');
        linkToLogin.innerHTML = 'Please Login before...'
        noLogin.append(linkToLogin);
        basketButton.append(noLogin);
    }

    basketButton.addEventListener('click', () => {
        let alreadyChoose = false;
        database.collection('product_selected').where('productId', '==', productDetail.id)
            .where('userId', '==', userDetail.id).get().then((result) => {
                result.forEach(() => {
                    alreadyChoose = true;
                });
                if (alreadyChoose) {
                    Swal.fire(
                        'Please check the basket',
                        "You have already selected this product",
                        'info'
                    )
                }
                else if(Number(amountDetail.value == 0)) {
                    Swal.fire(
                        'Error',
                        "Please select at least one",
                        'error'
                    )
                }
                else {
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
                    let productBasket = {
                        productName: productDetail.name,
                        price: productDetail.price,
                        productId: productDetail.id,
                        sellerId: productDetail.userId,
                        userId: userDetail.id,
                        amount: Number(amountDetail.value)
                    };

                    database.collection('product_selected').add(productBasket).then((data) => {
                        let dealing = false;
                        database.collection('seller_selected').where('userId', '==', userDetail.id)
                            .where('sellerId', '==', productDetail.userId).get().then((result) => {
                                Swal.fire(
                                    'Success',
                                    "Add product complete",
                                    'success'
                                )
                                loadProductCount();
                                result.forEach(() => {
                                    dealing = true;
                                });
                                if (!dealing) {
                                    let relationShip = {
                                        sellerId: productDetail.userId,
                                        userId: userDetail.id
                                    };
                                    database.collection('seller_selected').add(relationShip)
                                }
                            });
                    });
                }
            });
    });

    // ประกอบส่วนรายละเอียด
    detailBorder.append(productName, price, rating, detail, condition, date);

    detailBorder.innerHTML += '<br>';
    detailBorder.append(type);
    detailBorder.innerHTML += '<br>';
    detailBorder.append(amount, amountDetail, balanced, basketButton)

    // <-------------------------------- ส่วนคอมเม้น ------------------------------------->

    let allReview = document.querySelector('.review');
    let headingReview = document.createElement('h2');
    headingReview.innerHTML = 'รีวิวสินค้า';

    let longLine = document.createElement('hr');
    longLine.setAttribute('color', '#1D3D14');
    longLine.setAttribute('size', '5');
    longLine.style.width = '80%';


    let ratingLarge = rating.cloneNode(true);
    ratingLarge.align = "center";

    // กราฟค่าเฉลี่ยจากการคอมเม้น
    let reviewBox = document.createElement('div');
    reviewBox.classList.add('reviewbox');
    let rowReview = document.createElement('div');
    rowReview.classList.add('rowre');

    database.collection('comments').get().then((querySnapshot) => {
        let comments = [];
        querySnapshot.forEach((doc) => {
            if (doc.data().productId === productDetail.id) {
                comments.push({
                    comment: doc.data().comment,
                    name: doc.data().name,
                    productId: doc.data().productId,
                    rating: doc.data().rating,
                    userId: doc.data().userId
                });
            }
        });



        // วนลูปทำทั้ง 5 กราฟ
        for (let i = 5; i > 0; i--) {
            let rowSideLeft = document.createElement('div');
            rowSideLeft.classList.add('side');
            let starNum = document.createElement('div');
            starNum.innerHTML = i + ' star';
            rowSideLeft.append(starNum);

            let rowMiddle = document.createElement('div');
            rowMiddle.classList.add('middle');

            let barContainer = document.createElement('div');
            barContainer.classList.add('bar-container');
            let bar = document.createElement('div');
            bar.classList.add('bar-' + i);

            let thisRateCount = 0;
            comments.forEach((comment) => {
                if (comment.rating === i) {
                    thisRateCount += 1;
                }
            });

            let persenBar = thisRateCount / productDetail.commentCount * 100;
            bar.style.width = '0%';
            bar.style.width = persenBar + '%';
            barContainer.append(bar);
            rowMiddle.append(barContainer);

            let rowSideRight = document.createElement('div');
            rowSideRight.classList.add('side', 'right');
            let countComment = document.createElement('div');
            countComment.innerHTML = thisRateCount + '';


            rowSideRight.append(countComment);
            rowReview.append(rowSideLeft, rowMiddle, rowSideRight);
        }
        reviewBox.append(rowReview);
        allReview.append(headingReview, longLine, ratingLarge, reviewBox);
        allReview.innerHTML += '<br>';

        let shortLine = document.createElement('hr');
        shortLine.style.width = '80%';
        shortLine.style.border = '3px solid #f1f1f1';
        allReview.append(shortLine);

        // โซนคอมเม้น
        let commentZone = document.createElement('div');
        commentZone.classList.add('comment');
        let commentLine = document.createElement('hr');
        commentLine.style.width = '100%';
        commentLine.style.border = '2px solid #f1f1f1';

        let littleCommentCount = 0;
        if (productDetail.commentCount > 0) {
            if (productDetail.commentCount === 1) {
                littleCommentCount = 1;
            }
            else {
                littleCommentCount = 2;
            }

        }

        // วนลูปโชว์ 2 คอมเม้น
        for (let i = 0; i < littleCommentCount; i++) {
            let commentBorder = document.createElement('div');
            let commentImg = document.createElement('img');
            commentImg.src = 'src/icon/peo.png';
            commentImg.classList.add('peocom');
            // ไว้มาแก้ทีหลัง
            let commentName = document.createElement('span');
            commentName.classList.add('namere');
            commentName.innerHTML = comments[i].name;

            let ratingComment = document.createElement('span');
            ratingComment.classList.add('st-right');
            let commentRate = comments[i].rating;
            for (let j = 0; j < 5; j++) {
                let star = document.createElement('span');
                star.classList.add('fa', 'fa-star');
                if (commentRate >= 1) {
                    star.classList.add('checked');
                    commentRate--;
                }
                else if (commentRate !== 0) {
                    star.classList.replace('fa-star', 'fa-star-half-full');
                    star.classList.add('checked')
                    commentRate = 0;
                }
                ratingComment.append(star);
            }
            let commentText = document.createElement('p');
            commentText.innerHTML = comments[i].comment;

            commentBorder.append(commentImg, commentName, ratingComment, commentText);
            let commentLineAlso = commentLine.cloneNode(true);
            commentZone.append(commentBorder, commentLineAlso);
        }

        // ปุ่มดูทั้งหมด
        let btnAll = document.createElement('button');
        btnAll.id = 'myBtn';
        btnAll.innerHTML = 'ดูทั้งหมด';

        // โซนคอมเม้นทั้งหมด
        let myModal = document.createElement('div');
        myModal.id = 'myModal';
        myModal.classList.add('modal');

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // แถบปิด
        let exitBtn = document.createElement('span');
        exitBtn.classList.add('closemd');
        exitBtn.innerHTML = '&times;';

        let allComment = document.createElement('div');
        allComment.classList.add('allre');

        // วนลูปทุกๆคอมเม้น
        for (let i = 0; i < productDetail.commentCount; i++) {
            let commentBorder = document.createElement('div');
            let commentImg = document.createElement('img');
            commentImg.src = 'src/icon/peo.png';
            commentImg.classList.add('peocom');
            // ไว้มาแก้ทีหลัง
            let commentName = document.createElement('span');
            commentName.classList.add('namere');
            commentName.innerHTML = comments[i].name;

            let ratingComment = document.createElement('span');
            ratingComment.classList.add('st-right');
            let commentRate = comments[i].rating;
            for (let j = 0; j < 5; j++) {
                let star = document.createElement('span');
                star.classList.add('fa', 'fa-star');
                if (commentRate >= 1) {
                    star.classList.add('checked');
                    commentRate--;
                }
                else if (commentRate !== 0) {
                    star.classList.replace('fa-star', 'fa-star-half-full');
                    star.classList.add('checked')
                    commentRate = 0;
                }
                ratingComment.append(star);
            }
            let commentText = document.createElement('p');
            commentText.innerHTML = comments[i].comment;

            commentBorder.append(commentImg, commentName, ratingComment, commentText);
            let commentLineAlso = commentLine.cloneNode(true);
            allComment.append(commentBorder, commentLineAlso);
        }

        modalContent.append(exitBtn, allComment);
        myModal.append(modalContent);

        if (productDetail.commentCount > 0) {
            commentZone.append(btnAll, myModal);
            allReview.append(br, commentZone);
        }
        else {
            allReview.append(br);
        }

        // เรียกฟังก์ชันให้ปุ่มทำงาน
        if (productDetail.commentCount > 0) {
            addBtnEvent();
        }

    });
    // <------------------------ ส่วนสินค้าในร้านเดียวกัน ------------------------------->
    let otherProductZone = document.querySelector('.rec');

    let headerOther = document.createElement('h2');
    headerOther.innerHTML = 'สินค้าจากร้านเดียวกัน';

    let otherProductLine = document.createElement('hr');
    otherProductLine.setAttribute('color', '#1D3D14');
    otherProductLine.setAttribute('size', '5');
    otherProductLine.style.width = '80%';
    otherProductLine.style.marginBottom = '2%';

    let otherProducts = document.createElement('div');
    otherProducts.classList.add('product');
    otherProducts.innerHTML += '<br>';

    otherProductZone.append(headerOther, otherProductLine);

    database.collection('products').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let product = {
                id: doc.id,
                amount: doc.data().amount,
                commentCount: doc.data().commentCount,
                condition: doc.data().condition,
                date: doc.data().date,
                detail: doc.data().detail,
                imgLength: doc.data().imgLength,
                price: doc.data().price,
                name: doc.data().productName,
                province: doc.data().province,
                rating: doc.data().rating,
                seller: doc.data().seller,
                type: doc.data().type,
                userId: doc.data().userId
            };

            if (product.id !== productDetail.id) {
                // กรอบสินค้า
                let pbox = document.createElement('div');
                pbox.classList.add('pbox');

                // กรอบรูป
                let pimg = document.createElement('div');
                pimg.classList.add('pimg');

                // ตัวเชื่อมไปหน้าสินค้า 1
                let connect1 = document.createElement('a');
                connect1.href = 'prod.html';
                connect1.addEventListener('click', function () {
                    localStorage.setItem('productSelected', JSON.stringify(product));
                });

                // ภาพสินค้า
                let image = document.createElement('img');
                image.src = 'src/noImage.png';
                storageRef.child(product.userId + '/' + product.id + '/image1').getDownloadURL()
                    .then((url) => {
                        image.src = url;
                    }).catch((error) => {
                        console.log(error.message);
                    })

                // ดูเพิ่มเติม
                let moreBtn = document.createElement('div');
                moreBtn.classList.add('overlay-up');
                let moreText = document.createElement('span')
                moreText.classList.add('text-up');
                moreText.innerHTML = 'ดูเพิ่มเติม';
                moreBtn.append(moreText);

                // รวมส่วนภาพ
                connect1.append(image, moreBtn);
                pimg.append(connect1);

                // ส่วนเนื้อหา
                let pde = document.createElement('div');
                pde.classList.add('pde');

                // ตัวเชื่อมไปหน้าสินค้า 2
                let connect2 = document.createElement('a');
                connect2.href = 'prod.html';
                connect2.addEventListener('click', function () {
                    localStorage.setItem('productSelected', JSON.stringify(product));
                });

                // ชื่อสินค้า
                let productName = document.createElement('span')
                productName.classList.add('pname');
                productName.innerHTML = product.name;

                // ประกอบตัวเชื่อมกับชื่อสินค้า
                connect2.append(productName);

                // ตัวเชื่อมไปหน้าสินค้า 3
                let connect3 = document.createElement('a');
                connect3.href = 'prod.html';
                connect3.addEventListener('click', function () {
                    localStorage.setItem('productSelected', product);
                });

                // ราคาสินค้า
                let price = document.createElement('span')
                price.classList.add('pprice');
                price.innerHTML = '฿' + product.price;

                // ประกอบตัวเชื่อมกับราคา
                connect3.append(price);

                // คะแนนสินค้า
                let rating = document.createElement('div');
                rating.classList.add('star');
                let productRate = product.rating;
                for (let i = 0; i < 5; i++) {
                    let star = document.createElement('span');
                    star.classList.add('fa', 'fa-star');
                    if (productRate >= 1) {
                        star.classList.add('checked');
                        productRate--;
                    }
                    else if (productRate !== 0) {
                        star.classList.replace('fa-star', 'fa-star-half-full');
                        star.classList.add('checked')
                        productRate = 0;
                    }
                    rating.append(star);
                }

                // ปุ่มใส่ตะกร้า
                let cart = document.createElement('span');
                cart.classList.add('cart');

                // ใส่ของเข้าตะกร้า
                cart.addEventListener('click', () => {
                    let alreadyChoose = false;
                    database.collection('product_selected').where('productId', '==', product.id)
                        .where('userId', '==', userDetail.id).get().then((result) => {
                            result.forEach(() => {
                                alreadyChoose = true;
                            });
                            if (alreadyChoose) {
                                Swal.fire(
                                    'Please check the basket',
                                    "You have already selected this product",
                                    'info'
                                )
                            }
                            else {
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
                                let productBasket = {
                                    productName: product.name,
                                    price: product.price,
                                    productId: product.id,
                                    sellerId: product.userId,
                                    userId: userDetail.id,
                                    amount: 1
                                };

                                database.collection('product_selected').add(productBasket).then((data) => {
                                    let dealing = false;
                                    database.collection('seller_selected').where('userId', '==', userDetail.id)
                                        .where('sellerId', '==', product.userId).get().then((result) => {
                                            Swal.fire(
                                                'Success',
                                                "Add product complete",
                                                'success'
                                            )
                                            loadProductCount();
                                            result.forEach(() => {
                                                dealing = true;
                                            });
                                            if (!dealing) {
                                                let relationShip = {
                                                    sellerId: product.userId,
                                                    userId: userDetail.id
                                                };
                                                database.collection('seller_selected').add(relationShip)
                                            }
                                        });
                                });
                            }
                        });
                });

                // ไอคอนตะกร้า
                let cartImg = document.createElement('img');
                cartImg.src = "src/icon/addcart.png";
                cartImg.id = 'basket';

                // ประกอบปุ่มตะกร้า
                cart.append(cartImg);
                cart.innerHTML += 'หยิบใส่ตะกร้า';

                if (userLogin) {
                    cart.classList.add('n');
                }
                else {
                    // สำหรับยังไม่ล็อคอิน
                    let noLogin = document.createElement('div');
                    noLogin.classList.add('overlay');
                    let connectLogin = document.createElement('a');
                    connectLogin.classList.add('text');
                    connectLogin.href = 'auth/login/login.html ';
                    connectLogin.innerHTML = 'Please Login before...';
                    noLogin.append(connectLogin);
                    cart.append(noLogin);
                }

                // ประกอบเข้าทั้งหมด
                pde.append(connect2, connect3, rating, cart);
                pbox.append(pimg, pde);
                otherProducts.append(pbox);
            }

            otherProductZone.append(otherProducts);

        });

    });
}

// <-------------------------------ฟังก์ชันต่างๆในหน้าต่างๆ------------------------------------->

function addBtnEvent() {
    // Get the modal
    var modal = document.querySelector("#myModal");

    // Get the button that opens the modal
    var btn = document.querySelector("#myBtn");

    // Get the <span> element that closes the modal
    var span = document.querySelector(".closemd");

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}