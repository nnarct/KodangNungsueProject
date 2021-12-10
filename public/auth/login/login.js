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

let buttonSend = document.getElementById('button-send')
buttonSend.addEventListener('click', login);
let passwordFeild = document.getElementById('floatingPassword')
passwordFeild.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        login();
    }
})


function login() {
    let email = document.getElementById('floatingInput').value
    let password = document.getElementById('floatingPassword').value

    if (validate_field(email) == false || validate_field(password) == false) {
        Swal.fire(
            'Error',
            'Please fill out all text fields',
            'error'
        )
        return
    }
    if (validate_email(email) == false) {
        Swal.fire(
            'Error',
            'Invalid email format',
            'error'
        )
        return
    }
    if (validate_password(password) == false) {
        Swal.fire(
            'Error',
            'Enter a password of 8-16 characters',
            'error'
        )
        return
    }
    Swal.fire({
        title: 'Please wait',
        text: 'System is processing',
        icon: 'info',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            var user = auth.currentUser
            var database_ref = database.collection('users').doc(user.uid)

            var user_data = {
                last_login: Date.now()
            }
            database_ref.update(user_data)

            document.getElementById('floatingInput').value = '';
            document.getElementById('floatingPassword').value = '';

            database_ref.get().then((doc) => {
                let userDetail = {
                    id: doc.id,
                    address: doc.data().address,
                    email: doc.data().email,
                    Name: doc.data().name,
                    surname: doc.data().surname,
                    phone: doc.data().phone,
                    type: doc.data().type,
                    last_login: doc.data().last_login
                }
                Swal.fire(
                    'Login Success',
                    'Welcome to homepage',
                    'success'
                )               
                localStorage.setItem('userNow', JSON.stringify(userDetail));
                sessionStorage.setItem('userDetail', JSON.stringify(userDetail));
                setTimeout(() => {
                    location.href = "../../index.html";
                }, 1500)
            })


        })
        .catch(function (error) {
            var error_code = error.code
            var error_message = error.message

            Swal.fire(
                'Error',
                error_message,
                'error'
            )
        })
}

function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    }
    else {
        return false
    }
}

function validate_password(password) {
    if (password.toString < 8 || password.toString > 16) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}
