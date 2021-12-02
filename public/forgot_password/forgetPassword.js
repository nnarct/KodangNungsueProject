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

let buttonConfirm = document.querySelector('#btn-confirm')
let emailField = document.querySelector('#email')
buttonConfirm.addEventListener('click', sendEmail)
emailField.addEventListener('keyup', (e)=>{
    if (e.key === 'Enter') {
        sendEmail();
    }
})

function sendEmail() {
    var auth = firebase.auth();
    var email = emailField.value;

    if (email != "") {
        auth.sendPasswordResetEmail(email).then(function () {
            Swal.fire(
                'Email has been sent to your email',
                'Please check and verify',
                'success'
            )
            email = '';
        })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                Swal.fire(
                    'Error',
                    errorMessage,
                    'error'
                )

            });
    }
    else {
        Swal.fire(
            'Error',
            'Please write your email first',
            'info'
        )
    }
}