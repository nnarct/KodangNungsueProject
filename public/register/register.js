var config = {
    apiKey: "AIzaSyADVCDx2u4eyXan_CTvJ2N-zRJ6zT5eBPw",
    authDomain: "kodangnungsue.firebaseapp.com",
    projectId: "kodangnungsue"
};
firebase.initializeApp(config);

let db = firebase.firestore();

function getData(){
    $address = document.getElementById("inputAddress").value;
    $email = document.getElementById("inputEmail").value;
    $password = document.getElementById("inputPassword").value;
    $conpass = document.getElementById("inputConfirmPassword").value;
    $phone = document.getElementById("inputPhone").value;
    $name = document.getElementById("inputName").value;
    $surname = document.getElementById("inputSurname").value;
    
    if(checkPassword($password, $conpass)){
        addData();
    }
    else{
        alert('รหัสผ่านไม่ตรงกัน');
    }
}

function checkPassword(a, b){
    if(strcmp(a, b) === 0)
    {
        return true;
    }
    else{
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
        alert("Document successfully written!")
    });

}

function strcmp(a, b) {
    if (a.toString() < b.toString()) return -1;
    if (a.toString() > b.toString()) return 1;
    return 0;
}

let regButton = document.getElementById('regbutton');
regButton.addEventListener('click', getData);