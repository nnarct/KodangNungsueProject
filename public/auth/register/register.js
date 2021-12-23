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

let regButton = document.getElementById('regbutton')
regButton.addEventListener('click', register)
document.getElementById('inputAddress').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        register();
    }
});

function register() {
    let address = document.getElementById('inputAddress').value
    let email = document.getElementById('inputEmail').value
    let password = document.getElementById('inputPassword').value
    let conpass = document.getElementById('inputConfirmPassword').value
    let phone = document.getElementById('inputPhone').value
    let Name = document.getElementById('inputName').value
    let surname = document.getElementById('inputSurname').value

    if (validate_field(address) == false || validate_field(phone) == false || validate_field(Name) == false || validate_field(surname) == false
        || validate_field(email) == false || validate_field(password) == false || validate_field(conpass) == false) {
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
    if (validate_phone(phone) == false) {
        Swal.fire(
            'Error',
            'Invalid phone number format',
            'error'
        )
        return
    }
    if (strcmp(password, conpass) !== 0) {
        Swal.fire(
            'Error',
            "The two passwords don't match",
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
        title: 'Are you sure?',
        text: "Please check the correctness of the information",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sure'
    }).then((result) => {
        if (result.isConfirmed) {
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
            auth.createUserWithEmailAndPassword(email, password)
                .then(function () {
                    var user = auth.currentUser
                    var database_ref = database.collection('users')

                    var user_data = {
                        email: email,
                        address: address,
                        name: Name,
                        surname: surname,
                        phone: phone,
                        type: 'buyer',
                        last_login: Date.now()
                    }

                    database_ref.doc(user.uid).set(user_data)
                        .then(() => {
                            Swal.fire(
                                'Register Success!',
                                'Your information has been registered',
                                'success'
                            )
                            setTimeout(() => {
                                location.href = '../login/login.html';
                            }, 1000);
                        });
                    document.getElementById('inputAddress').value = '';
                    document.getElementById('inputEmail').value = '';
                    document.getElementById('inputPassword').value = '';
                    document.getElementById('inputConfirmPassword').value = '';
                    document.getElementById('inputPhone').value = '';
                    document.getElementById('inputName').value = '';
                    document.getElementById('inputSurname').value = '';
                })
                .catch(function (error) {
                    Swal.fire(
                        'Error',
                        error.message,
                        'error'
                    )
                })
        }
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
    if (password.toString().length < 8 || password.toString().length > 16) {
        return false
    } else {
        return true
    }
}

function validate_phone(phone) {
    if (phone.length !== 10) {
        return false
    }
    if (phone.charAt(0) !== '0') {
        return false
    }
    return true
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

function strcmp(a, b) {
    if (a.toString() < b.toString()) return -1;
    if (a.toString() > b.toString()) return 1;
    return 0;
}