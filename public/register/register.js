var config = {
    apiKey: "AIzaSyADVCDx2u4eyXan_CTvJ2N-zRJ6zT5eBPw",
    authDomain: "kodangnungsue.firebaseapp.com",
    projectId: "kodangnungsue"
};
firebase.initializeApp(config);

let db = firebase.firestore();

function getData() {
    $address = document.getElementById("inputAddress").value;
    $email = document.getElementById("inputEmail").value;
    $password = document.getElementById("inputPassword").value;
    $conpass = document.getElementById("inputConfirmPassword").value;
    $phone = document.getElementById("inputPhone").value;
    $name = document.getElementById("inputName").value;
    $surname = document.getElementById("inputSurname").value;

    if (canPass()) {
        if ($phone.length !== 10) {
            Swal.fire(
                'Error',
                "Please enter a phone number 10 characters",
                'error'
            )
            return;
        }
        if ($password.length < 8 || $password.length > 16 || $conpass.length < 8 || $conpass.length > 16) {
            Swal.fire(
                'Error',
                "Please enter a password 8-16 characters",
                'error'
            )
        }
        else {
            if (checkPassword($password, $conpass)) {
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
                        Swal.fire(
                            'Register Success!',
                            'Your information has been registered',
                            'success'
                        )
                        addData();
                    }
                })
            }
            else {
                Swal.fire(
                    'Register Failed',
                    "The two passwords don't match",
                    'error'
                )
            }
        }
    }
    else {
        Swal.fire(
            'Error',
            "Please fill out all text fields",
            'error'
        )
    }
}

function canPass() {
    if ($address === '' || $email === '' || $password === '' || $conpass === ''
        || $phone === '' || $name === '' || $surname === '') {
        return false;
    }
    return true;
}

function checkPassword(a, b) {
    if (strcmp(a, b) === 0) {
        return true;
    }
    else {
        return false;
    }
}

function addData() {

    var docData = {
        address: $address,
        email: $email,
        password: $password,
        phone: $phone,
        name: $name,
        surname: $surname
    };
    db.collection("users").add(docData).then(() => {

    });

}

function strcmp(a, b) {
    if (a.toString() < b.toString()) return -1;
    if (a.toString() > b.toString()) return 1;
    return 0;
}

let regButton = document.getElementById('regbutton');
regButton.addEventListener('click', getData);