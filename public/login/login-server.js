var config = {
    apiKey: "AIzaSyADVCDx2u4eyXan_CTvJ2N-zRJ6zT5eBPw",
    authDomain: "kodangnungsue.firebaseapp.com",
    projectId: "kodangnungsue"
};
firebase.initializeApp(config);

let db = firebase.firestore();

db.collection('users').get().then((querySnapshot) => {
    $readAddress = ['0'];
    $readEmail = ['0'];
    $readPassword = ['0'];
    $readPhone = ['0'];
    $readName = ['0'];
    $readSurname = ['0'];
    querySnapshot.forEach((doc) => {

        $readAddress.push(doc.data().address);
        $readEmail.push(doc.data().email);
        $readPassword.push(doc.data().password);
        $readPhone.push(doc.data().phone);
        $readName.push(doc.data().name);
        $readSurname.push(doc.data().surname);
    });
    $readAddress.splice(0, 1);
    $readEmail.splice(0, 1);
    $readPassword.splice(0, 1);
    $readPhone.splice(0, 1);
    $readName.splice(0, 1);
    $readSurname.splice(0, 1);
    console.log($readAddress);
    console.log($readEmail);
    console.log($readPassword);
    console.log($readPhone);
    console.log($readName);
    console.log($readSurname);
});

function addData() {
    $address = document.getElementById("inputAddress").value;
    $email = document.getElementById("inputEmail").value;
    $password = document.getElementById("inputPassword").value;
    $phone = document.getElementById("inputPhone").value;
    $name = document.getElementById("inputName").value;
    $surname = document.getElementById("inputSurname").value;
    document.getElementById("inputAddress").innerHTML = "";
    document.getElementById("inputEmail").innerHTML = "";

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

function login() {
    for (let i = 0; i < $readAddress.length; i++) {
        if (strcmp(document.getElementById("floatingInput").value, $readEmail[i]) === 0
            && strcmp(document.getElementById("floatingPassword").value, $readPassword[i]) === 0) {
            alert("Login Success");
            location.href = "https://www.youtube.com/";
            return;
        }
    }
    alert("Wrong Email or Password!!");
    return;
}
let buttonSend = document.getElementById('button-send');
buttonSend.addEventListener('click', login);