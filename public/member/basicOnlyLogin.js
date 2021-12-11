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

// <-------------------- ถ้าไม่ได้ล็อคอินจะหลุดเลย --------------------->
let productCount = document.querySelector('.num');
auth.onAuthStateChanged((user) => {
    if (!user || localStorage.getItem('userNow') == null) {
        location.href = '../index.html';
    }
    loadProductCount();
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
                location.href = '../index.html';
            });
        }
    });
});

// <------------------------------ ฟังก์ชันโหลดจำนวนสินค้าในตะกร้า ---------------------------------------->
function loadProductCount() {
    let thisCount = 0;
    let userDetail = JSON.parse(localStorage.getItem('userNow'));
    database.collection('product_selected').where('userId', '==', userDetail.id)
    .get().then((result) => {
        result.forEach(() => {
            thisCount += 1;
        });
        productCount.innerHTML = thisCount;
    });
}