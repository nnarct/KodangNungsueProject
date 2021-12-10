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

// <-------------------------- ส่วนตรวจสอบแถบด้านบน --------------------------->
let headerButton = document.querySelector('.button');
let headerBasket = document.querySelector('.rmenu');
headerBasket.style.display = 'none';

auth.onAuthStateChanged((user) => {
    if (user) {
        headerButton.style.display = 'none';
        headerBasket.style.removeProperty('display');
    }
    else {
        headerBasket.style.display = 'none';
        headerButton.style.removeProperty('display');
    }
});

// <------------------------ ส่วนตรวจสอบแถบด้านข้าง ------------------------------>
let inputText = document.querySelector('.input > input');
inputText.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        let searchFormOtherPage = {
            type: 'search',
            value: inputText.value
        };
        sessionStorage.setItem('searchFromOtherPage', JSON.stringify(searchFormOtherPage));
        location.href = '../index.html';
    }
})

let cates = document.querySelectorAll('.cat > ul > h5');
let subCates = document.querySelectorAll('.cat > ul > li');

cates.forEach((cate) => {
    cate.addEventListener('click', () => {
        let searchFormOtherPage = {
            type: 'type',
            value: cate.innerText,
        };
        sessionStorage.setItem('searchFromOtherPage', JSON.stringify(searchFormOtherPage));
        location.href = '../index.html';
    });
});

subCates.forEach((subCate, index) => {
    subCate.addEventListener('click', () => {
        let header = '';
        if(index < 3) {
            header = cates[0].innerText;
        }
        else {
            header = cates[1].innerText;
        }
        let searchFormOtherPage = {
            type: 'type',
            value: header + ': ' + subCate.innerText,
        };
        sessionStorage.setItem('searchFromOtherPage', JSON.stringify(searchFormOtherPage));
        location.href = '../index.html'
    });
});