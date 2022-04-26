//signup or login

var app_auth = function (data) {//於fb、liff的login動作完成後執行(注意這是parse case，如果要接gas該怎麼寫？)
  //provider, snsid, picurl, username, email為所有sns都必須回傳的五個值，用來建立UserInfo
  //檢查該provider的id在db是否存在
  var params = {};
  params.datajson = {};
  params.datajson["equalTo"] = {};
  params.datajson["equalTo"][data.provider] = data.snsid;
  params.typename = "UserInfo";
  params.querymethod = "first";
  return parse_query(params)
    .then((userinfo) => {
      app_log("my userinfo = " + userinfo);
      if (!!userinfo) {//如果存在，執行login，並將找到的UserInfo id傳回給使用者
        app_log("found my userinfo by " + data.provider + " auth, try to login.");
        userinfo.increment("logincnt");
        return userinfo.save();
      } else {//如果不存在，建立新UserInfo並回傳給使用者
        app_log("my userinfo not found by " + data.provider + " auth, try to register.");
        var myinfo = {};
        myinfo.typename = "UserInfo";
        myinfo.datajson = {};
        myinfo.datajson[data.provider] = data.snsid;
        myinfo.datajson.picurl = data.picurl;
        myinfo.datajson.username = data.username;
        myinfo.datajson.email = data.email;
        myinfo.datajson.logincnt = 1;
        return parse_pushObj(myinfo);
      }
    })
    .then((userinfo) => {
      return login_only_one(userinfo);
    });
};

var login_only_one = function (userinfo) {
  var params = {};
  params.appid = appcfg.parse.appid;
  params.jskey = appcfg.parse.jskey;
  params.wssurl = appcfg.parse.wssurl;
  params.typename = "UserInfo";
  params.task = "login_only_one";
  params.userinfo = userinfo;
  return parse_lq_subscribe(params);
};

//fb

var fb_statusChangeCallback = function (response) {  // Called with the results from FB.getLoginStatus().
  app_log('current_fb_status:');
  app_log(response);                   // The current login status of the person.
};

var fb_me = function () {
  return new Promise(function (resolve, reject) {
    FB.login(function (response) {
      FB.api('/me/?fields=id,name,email,picture.type(large)', function (profile) {
        var data = {};
        //provider, snsid, picurl, username, email為所有sns都必須回傳的五個值，用來建立UserInfo
        if (!profile || profile.error) {
          app_log('error_fb_me');
          reject();
        } else {
          data.provider = "facebook";
          data.snsid = profile.id;
          data.picurl = profile.picture.data.url;
          data.username = profile.name;
          data.email = profile.email;
          resolve(data);
        }
      });
    }, { scope: 'public_profile,email' });
  })
}

window.fb_checkLoginState = function () {   // Called when a person is finished with the Login Button.
  FB.getLoginStatus(function (response) {   // See the onlogin handler
    fb_statusChangeCallback(response);
  });
};

window.fb_auth = function (onSuccess, onError) {
  return fb_me()
    .then((data) => {
      return app_auth(data);
    })
    .then((userinfo) => {
      onSuccess(userinfo);
    })
    .catch((error) => {
      onError(error);
    });
};

//liff

var initializeLiff = function (myLiffId) {
  return liff.init({ liffId: myLiffId })
    .then(() => {
      app_log("Liff init success");
      // start to use LIFF's api, if Liff is logged in, profile will be sent by callback.
      if (liff.isLoggedIn()) {
        // set `redirectUri` to redirect the user to a URL other than the front page of your LIFF app.
        app_log('Liff has already logged in');
        return callfront([["liff_auth_ready"]]);
      } else {
        app_log('Liff is not logged in');
      }
    });
}

var liff_me = function () {
  if (liff.isLoggedIn()) {
    return liff.getProfile()
      .then((profile) => {
        var idToken = JSON.stringify(liff.getDecodedIDToken());
        var data = {};
        data.lan = liff.getLanguage();
        data.ver = liff.getVersion();
        data.isInLineApp = liff.isInClient();
        data.isLiffLoggedIn = liff.isLoggedIn();
        data.os = liff.getOS();
        //provider, snsid, picurl, username, email為所有sns都必須回傳的五個值，用來建立UserInfo
        data.provider = "liff";
        data.snsid = profile.userId;
        data.picurl = profile.pictureUrl;
        data.username = profile.displayName;
        data.email = idToken.email;
        app_log("liff_data: " + JSON.stringify(data));
        return Promise.resolve(data);
      });
  } else {
    app_log('error_liff_me');
  }
}

window.liff_auth = function (onSuccess, onError) {
  return liff_me()
    .then((data) => {
      return app_auth(data);
    })
    .then((userinfo) => {
      onSuccess(userinfo);
    })
    .catch((error) => {
      onError(error);
    });
};

window.liff_login = function () {
  if (!liff.isLoggedIn()) {
    liff.login();
  } else {
    app_log('Liff has already logged in.');
  }
}

window.liffLogout = function () {
  if (liff.isLoggedIn()) {
    liff.logout();
    window.location.reload();
  } else {
    app_log('Liff cannot logout cuz you are not logged in.');
  }
}

/**
* ifExternal is a boolean. Open external url if true, open line in-app-browser if false.
*/
window.liffOpenWindow = function (address, ifExternal) {
  liff.openWindow({
    url: address,
    external: ifExternal
  });
}

/**
* scan qrcode is not available on iOS 9+
*/
window.liffScan = function (onSuccess, onError) {
  if (!liff.isInClient()) {
    app_log('this function is only available on Line LIFF');
  } else {
    if (liff.scanCode) {
      liff.scanCode().then(result => {
        // e.g. result = { value: "Hello LIFF app!" }
        var res = JSON.stringify(result.value);
        var resvalue = res.replace(/^"|"$/g, '');
        onSuccess(resvalue);
        //toggleQrCodeReader();
      }).catch((error) => {
        onError(error);
      });
    }
  }
}

/**
* type: text, image, audio, video, template, flex
*/
window.liffSend = function (msgtype, msg, onSuccess, onError) {
  if (!liff.isInClient()) {
    app_log('this function is only available on Line LIFF');
  } else {
    liff.sendMessages([{
      'type': msgtype,
      'text': msg
    }]).then(function () {
      onSuccess(msg);
    }).catch(function (error) {
      app_log(error);
    });
  }
}

/**
* type: text, image, audio, video, template, flex
*/
window.liffShare = function (msgtype, msg, onSuccess, onError) {
  if (!liff.isInClient()) {
    app_log('this function is only available on Line LIFF');
  } else {
    liff.shareTargetPicker([{
      'type': msgtype,
      'text': msg
    }]).then(function () {
      onSuccess(msg);
    }).catch(function (error) {
      onError(error);
    });
  }
}

window.liffClose = function () {
  if (!liff.isInClient()) {
    app_log('this function is only available on Line LIFF');
  } else {
    liff.closeWindow();
  }
}