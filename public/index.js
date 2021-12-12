// <----------------------------------- เรียกใช้ Database --------------------------------------->
var firebaseConfig = {
    apiKey: "AIzaSyADVCDx2u4eyXan_CTvJ2N-zRJ6zT5eBPw",
    authDomain: "kodangnungsue.firebaseapp.com",
    databaseURL: "https://kodangnungsue-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kodangnungsue",
    storageBucket: "kodangnungsue.appspot.com",
    messagingSenderId: "210511003247",
    appId: "1:210511003247:web:597d153c1b27be3536979a",
    measurementId: "G-QY54X5370W"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.firestore()
const storageRef = firebase.storage().ref()

// <----------------------------------- ส่วนดำเนินการ --------------------------------------->

let userDetail = JSON.parse(localStorage.getItem('userNow'));
let userLogin = false;
let headerButton = document.querySelector('.button');
let headerBasket = document.querySelector('.rmenu');
headerBasket.style.display = 'none';
const searchFormOtherPage = JSON.parse(sessionStorage.getItem('searchFromOtherPage'));
sessionStorage.removeItem('searchFromOtherPage');

auth.onAuthStateChanged((user) => {
    if (user) {
        userLogin = true;
        headerButton.style.display = 'none';
        headerBasket.style.removeProperty('display');
    }
    else {
        userLogin = false;
        headerBasket.style.display = 'none';
        headerButton.style.removeProperty('display');
    }
    reset();
    // เทียบว่ามีข้อมูลมาจากหน้าอื่นหรือไม่
    if (searchFormOtherPage === null) {
        showProductSearch('');
    }
    else if (searchFormOtherPage.type === 'search') {
        showProductSearch(searchFormOtherPage.value);
        headingTitle.innerHTML = 'รายการที่ค้นหา';
    }
    else {
        showProductType(searchFormOtherPage.value);
        headingTitle.innerHTML = searchFormOtherPage.value;
    }
});

let headingTitle = document.querySelector('#heading-title');
let inputText = document.querySelector('.input > input');
inputText.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        if (inputText.value === '') {
            headingTitle.innerHTML = 'หนังสือทั้งหมด';
        }
        else {
            headingTitle.innerHTML = 'รายการที่ค้นหา';
        }
        reset();
        showProductSearch(inputText.value);
    }
})

let cates = document.querySelectorAll('#cat > ul > h5');
let subCates = document.querySelectorAll('#cat > ul > li');

cates.forEach((cate) => {
    cate.addEventListener('click', () => {
        headingTitle.innerHTML = cate.innerText;
        reset();
        showProductType(cate.innerText);
    });
});

subCates.forEach((subCate, index) => {
    subCate.addEventListener('click', () => {
        if (index >= 0 && index <= 2) {
            headingTitle.innerHTML = cates[0].innerText + ': ' + subCate.innerText;
            reset();
            showProductType(subCate.innerText);
        }
        else if (index >= 3 && index <= 5) {
            headingTitle.innerHTML = cates[1].innerText + ': ' + subCate.innerText;
            reset();
            showProductType(subCate.innerText);
        }
    });
});

// <-------------------- ส่วน Log Out --------------------->
let buttonLogout = document.querySelector('.tbLogout');
buttonLogout.addEventListener('click', () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to log out ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sure'
    }).then((result) => {
        if (result.isConfirmed) {
            auth.signOut().then(() => {
                location.href = 'index.html';
            });
        }
    });
});

// <------------------------------ส่วนฟังก์ชันต่างๆ--------------------------------------->

function reset() {
    let allProduct = document.querySelector('.product');
    allProduct.innerHTML = null;
    allProduct.append(document.createElement('br'));
}

function showProductSearch(searchText) {
    let database_ref = database.collection('products');

    // All Product Box
    let allProduct = document.querySelector('.product');

    database_ref.get().then((querySnapshot) => {
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

            if (product.name.includes(searchText)) {
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
                        Swal.fire(
                            'Error',
                            error.message + '\n Please refresh webpage',
                            'error'
                        )
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
                allProduct.append(pbox);
            }

        });

    });

}

function showProductType(type) {
    let database_ref = database.collection('products');

    // All Product Box
    let allProduct = document.querySelector('.product');

    database_ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let product = {
                id: doc.id,
                amount: doc.data().amount,
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

            if (product.type.includes(type)) {
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
                        Swal.fire(
                            'Error',
                            error.message + '\n Please refresh webpage',
                            'error'
                        )
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
                allProduct.append(pbox);
            }

        });

    });

}