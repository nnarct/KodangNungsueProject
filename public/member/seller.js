//<------------------------------ ข้อมูลร้าน ------------------------------------->
let storeDetail = document.querySelectorAll('.right-cont > p');
setStoreData();
function setStoreData() {
    userDetail = updateUserDetail();
    storeDetail[0].innerHTML = userDetail.storeName;
    storeDetail[1].innerHTML = userDetail.bankName;
    storeDetail[2].innerHTML = userDetail.bankNumber;
    storeDetail[3].innerHTML = userDetail.bankType;
}

// <------------------------------- ลงทะเบียนสินค้า ----------------------------------->

// <-------------------------------- ฟังก์ชันเรียกภาพจากไฟล์ -------------------------------------->
let imagesShow = document.querySelectorAll('.imagepreview');
let images = document.querySelectorAll('.imageUpload');
images.forEach((image, index) => {
    image.addEventListener("change", function () {
        if (image.files && image.files[0]) {
            let reader = new FileReader();

            reader.onload = function (event) {
                imagesShow[index].src = event.target.result
            }
            reader.readAsDataURL(image.files[0]);

        }
    });
})

// <----------------------------------- ลงทะเบียนสินค้า ------------------------------------------->
let imagesProduct = []
let buttonRegis = document.getElementById('button-regis')
buttonRegis.addEventListener('click', productRegis)

function productRegis() {
    userDetail = updateUserDetail();
    // <---------------------ดึงภาพสินค้ามาเก็บเตรียมลงทะเบียน------------------------------>
    if (images[0].files[0] == null) {
        Swal.fire(
            'Necessary',
            'An image is required in the first box to be the main image',
            'info'
        )
        return;
    }

    images.forEach((image, index) => {
        if (image.files[0] != null || imagesShow[index].src !== '') {
            imagesProduct.push(image.files[0])
        }
    })

    let productName = document.getElementById('product-name').value
    let price = document.getElementById('price').value
    let province = document.getElementById('province').value
    let condition = document.getElementById('condition').value
    let type = document.getElementById('type').value
    let amount = document.getElementById('amount').value
    let detail = document.getElementById('detail').value

    if (validate_field(productName) == false || validate_field(province) == false
        || validate_field(condition) == false || validate_field(detail) == false) {
        Swal.fire(
            'Error',
            'Please fill out all text fields',
            'error'
        )
        return;
    }

    if (Number(price) <= 0 || Number(amount) <= 0) {
        Swal.fire(
            'Error',
            'Please fill number more than 0',
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

            var product_data = {
                productName: productName,
                rating: 0,
                seller: userDetail.storeName,
                province: province,
                price: Number(price),
                condition: condition,
                type: type,
                amount: Number(amount),
                imgLength: imagesProduct.length,
                detail: detail,
                userId: userDetail.id,
                commentCount: 0,
                date: Date.now()
            }
            Swal.fire({
                title: 'Warning',
                text: 'Product registration Please do not leave this page.',
                icon: 'warning',
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            });

            let database_ref = database.collection('products')
            database_ref.add(product_data).then((data) => {

                let successCount = 0;
                for (let i = 0; i < imagesProduct.length; i++) {
                    const file = imagesProduct[i];
                    const imgname = userDetail.id + '/' + data.id + '/image' + (i + 1);
                    const metadata = {
                        contentType: imagesProduct[i].type
                    }

                    storageRef.child(imgname).put(file, metadata)
                        .then(() => {
                            successCount++
                            if (successCount === imagesProduct.length) {
                                Swal.fire(
                                    'Register Success!',
                                    'Your product has been registered',
                                    'success'
                                )
                            }
                        }).catch((error) => {
                            console.log(error.message)
                        })
                }

            }).catch((error) => {
                Swal.fire(
                    'Error',
                    error.message,
                    'error'
                )
            })

        }
    })

}