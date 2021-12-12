// <----------------------------- ส่วนดำเนินการหน้าแสดงข้อมูลโปรไฟล์ -------------------------------------->
let userDetail = JSON.parse(localStorage.getItem('userNow'));
// ชื่อผู้ใช้
let profileName = document.querySelector('.name');

// ภาพโปรไฟล์ผู้ใช้
let profileImageShow = document.querySelector('.smallProfilePic > img');
let largeProfileImage = document.querySelector('#proPic > img');

// รายละเอียดผู้ใช้ที่แสดง
let detailShow = document.querySelectorAll('#display > p'); // สำหรับชื่อ นามสกุล อีเมล โทรศัพท์

let addressShow = document.querySelector('.displayAddressInput'); // สำหรับที่อยู่

// ส่วน input edit ข้อมูล
let editShow = document.querySelectorAll('#displayInput > p > input'); // ส่วน ชื่อ นามสกุล เบอร์โทร
let editAddressShow = document.querySelector('#displayInput > div > textarea'); // สำหรับที่อยู่

loadProfile();

function updateUserDetail() {
    return JSON.parse(localStorage.getItem('userNow'));
}

function loadProfile() {
    userDetail = updateUserDetail();
    // ชื่อผู้ใช้
    profileName.innerHTML = userDetail.name + ' ' + userDetail.surname;

    // ภาพโปรไฟล์ผู้ใช้
    storageRef.child(userDetail.id + '/profile').getDownloadURL()
        .then((url) => {
            profileImageShow.src = url;
            largeProfileImage.src = url;
        }).catch((error) => {
            profileImageShow.src = '../src/icon/peo.png';
        });

    // รายละเอียดผู้ใช้ที่แสดง
    detailShow[0].innerHTML = userDetail.name;
    detailShow[1].innerHTML = userDetail.surname;
    detailShow[2].innerHTML = userDetail.email;
    let phoneFormat = userDetail.phone;
    phoneFormat = phoneFormat.slice(0, 3) + '-' + phoneFormat.slice(3, 6) + '-' + phoneFormat.slice(6);
    detailShow[3].innerHTML = phoneFormat;
    addressShow.innerHTML = userDetail.address;

    // ส่วน input edit ข้อมูล
    editShow[0].value = userDetail.name;
    editShow[1].value = userDetail.surname;
    document.querySelector('#emailProfileShow').innerHTML = userDetail.email;
    editShow[2].value = userDetail.phone;
    editAddressShow.value = userDetail.address;
}
// <--------------------------------- ฟังก์ชันกดยืนยัน --------------------------------------->
let comfirmEditBtn = document.querySelector('.ConfirmEdit');
comfirmEditBtn.addEventListener('click', confirmEditData);

function confirmEditData() {
    userDetail = updateUserDetail();
    let nameChange = editShow[0].value;
    let surnameChange = editShow[1].value;
    let phoneChange = editShow[2].value;
    let addressChange = editAddressShow.value;
    let editImage = document.querySelector('#de-btn');

    if (validate_field(addressChange) == false || validate_field(phoneChange) == false
        || validate_field(nameChange) == false || validate_field(surnameChange) == false) {
        Swal.fire(
            'Error',
            'Please fill out all text fields',
            'error'
        )
        return;
    }

    if (validate_phone(phoneChange) == false) {
        Swal.fire(
            'Error',
            'Invalid phone number format',
            'error'
        )
        return;
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
            database.collection('users').doc(userDetail.id).update({
                name: nameChange,
                surname: surnameChange,
                address: addressChange,
                phone: phoneChange
            }).then(() => {
                if (editImage.files[0] != null) {
                    const file = editImage.files[0];
                    const imgname = userDetail.id + '/profile';
                    const metadata = {
                        contentType: editImage.files[0].type
                    }
                    storageRef.child(imgname).put(file, metadata)
                        .then((snapshot) => {
                            database.collection('users').doc(userDetail.id).get().then((doc) => {
                                let newUserDetail = {
                                    id: doc.id,
                                    address: doc.data().address,
                                    email: doc.data().email,
                                    name: doc.data().name,
                                    surname: doc.data().surname,
                                    phone: doc.data().phone,
                                    type: doc.data().type,
                                    last_login: doc.data().last_login
                                }
                                localStorage.setItem('userNow', JSON.stringify(newUserDetail));
                                Swal.fire(
                                    'Edit Data Success!',
                                    'Your information has been changed successfully',
                                    'success'
                                )
                                loadProfile();
                                document.getElementById("displayInput").style.display = "none";
                                document.getElementById("display").style.display = "flex";
                                document.getElementById("preview").style.display = "none";
                                document.getElementById("proPic").style.display = "block";
                                document.getElementById("toEdit-btn").style.display = "block";
                                document.getElementById("editing").style.display = "none";
                            });

                        }).catch((error) => {
                            console.log(error.message)
                        })
                }
                else {
                    database.collection('users').doc(userDetail.id).get().then((doc) => {
                        let newUserDetail = {
                            id: doc.id,
                            address: doc.data().address,
                            email: doc.data().email,
                            name: doc.data().name,
                            surname: doc.data().surname,
                            phone: doc.data().phone,
                            type: doc.data().type,
                            last_login: doc.data().last_login
                        }
                        localStorage.setItem('userNow', JSON.stringify(newUserDetail));
                        Swal.fire(
                            'Edit Data Success!',
                            'Your information has been changed successfully',
                            'success'
                        )
                        loadProfile();
                        document.getElementById("displayInput").style.display = "none";
                        document.getElementById("display").style.display = "flex";
                        document.getElementById("preview").style.display = "none";
                        document.getElementById("proPic").style.display = "block";
                        document.getElementById("toEdit-btn").style.display = "block";
                        document.getElementById("editing").style.display = "none";
                    });
                }
            }).catch((error) => {
                console.error(error.message);
            });
        }
    });

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
    }
    else {
        return true
    }
}


// <--------------------------------- ส่วนของลืมรหัสผ่าน --------------------------------------->
let buttonConfirm = document.querySelector('#btn-confirm')
let emailField = document.querySelector('#email')
buttonConfirm.addEventListener('click', sendEmail)
emailField.addEventListener('keyup', (e) => {
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
                'success',
                'ok'
            )
            document.querySelector('#email').value = '';
            document.querySelector('#show-hide').style.display = 'block';
        })
            .catch(function (error) {

                Swal.fire(
                    'Error',
                    error.message,
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

// <------------------------ ส่วนตรวจสอบ user ว่าเป็นผู้ขายหรือผู้ซื้อ ---------------------------->
let sellingBar = document.querySelector('#selling');
let sellerBar = document.querySelector('#seller');

if(userDetail.type === 'buyer') {
    sellingBar.style.display = 'block';
    sellerBar.style.display = 'none';
}
else if(userDetail.type === 'seller') {
    sellingBar.style.display = 'none';
    sellerBar.style.display = 'block';
}
sellingBar.addEventListener('click',() => {
    location.reload();
    console.log('hello');
});