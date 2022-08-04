var firebaseConfig = {
    apiKey: "AIzaSyDY5aRg8j6Jn0EcToJBepmynetKPJ56XhE",
    authDomain: "crackling-heat-5467.firebaseapp.com",
    databaseURL: "https://crackling-heat-5467.firebaseio.com/",
    projectId: "crackling-heat-5467",
    storageBucket: "crackling-heat-5467.appspot.com",
    messagingSenderId: "gonzdevour",
    appID: "Connect",
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* 設定語系，這邊使用裝置的預設語系 */
firebase.auth().useDeviceLanguage();

// Listening for auth state changes.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var uid = user.uid;
        var email = user.email;
        var photoURL = user.photoURL;
        var phoneNumber = user.phoneNumber;
        var isAnonymous = user.isAnonymous;
        var displayName = user.displayName;
        var providerData = user.providerData;
        var emailVerified = user.emailVerified;
        c2_callFunction('log', ['firebase user is signed in']);
        c2_callFunction('log', [phoneNumber]);
    }
});

// btnid: 'btn_auth_phone', size: 'visible'/'invisible'
window.authPhoneInit = function(btnid, tbxid, visibility){
    // [START appVerifier] 建立 reCAPTCHA 驗證(這是強制需要)，帶入發送按鈕的ID
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(btnid, {
        'size': visibility,
        'callback': function (response) {
            c2_callFunction('log', ['on recaptchaVerifier success']);
            var phoneNumber = document.getElementById(tbxid).value;
            c2_callFunction('log', ['try to submit phone number ' + phoneNumber]);
            onAuthPhoneSubmit(phoneNumber);
        }
    });
    // [END appVerifier]
    recaptchaVerifier.render().then(function (widgetId) {
        window.recaptchaWidgetId = widgetId;
    });
}

function onAuthPhoneSubmit(phoneNumber) {
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then(function (confirmationResult) {
        /* 發送成功 */
        window.confirmationResult = confirmationResult;
        console.log(window.confirmationResult);
        c2_callFunction('log', ['submit success']);
        c2_callFunction('GoToLayout', ['SMSVerify']);

    }).catch(function (error) {
        /* 發送失敗 */
        c2_callFunction('log', [error]);
        /* 重置驗證 */
        window.recaptchaVerifier.render().then(function (widgetId) {
            grecaptcha.reset(widgetId);
        })
    });
}

window.onAuthPhoneVerify = function(code, onSuccess, onError) {
    /* 檢查phone auth驗證碼 */
    window.confirmationResult.confirm(code)
        .then(function (result) {
            onSuccess(result.user);
        })
        .catch(function (error) {
            onError(error)
        });
}

window.createUserByEmail = function(email, password, onSuccess, onError) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(value) {
            onSuccess(value);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            onError(errorCode, errorMessage);
        });
};

window.signInByEmail = function(email, password, onSuccess, onError) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(value) {
            onSuccess(value);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            onError(errorCode, errorMessage);
        });
};