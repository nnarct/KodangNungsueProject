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
var newPassword
firebase.auth().confirmPasswordReset(code, newPassword)
    .then(function() {
      // Success
    })
    .catch(function() {
      // Invalid code
    })