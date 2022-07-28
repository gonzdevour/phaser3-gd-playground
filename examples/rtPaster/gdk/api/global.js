//config & scripts

var appcfg = {};
appcfg.fb = {
    appId: "2061760424047160",
    cookie: true,             // Enable cookies to allow the server to access the session.
    xfbml: true,              // Parse social plugins on this webpage.
    version: "v8.0"           // Use this Graph API version for this call.
};
appcfg.parse = {
    appid: "UBC1W5lzfgkJm2P0E8VwbvyuwuLyNQIXmYLTSxXX",
    jskey: "RHrzGpyH2tB8Yq8bn4iAVozJEDPRlgzgrmjlkZp2",
    url: "https://parseapi.back4app.com/",
    wssurl: "wss://database.b4a.io",
    masterkey: "mDAWomx30y6Oui5P2i8kuKJ3hDueRnOqnB0dKuEb",
};
appcfg.liffid = "1655628222-JYr7pK5M";

var LoadScripts = function () {
    var promoises = [];
    promoises.push(LoadScriptPromise("sns.js"));
    promoises.push(LoadScriptPromise("parse.min.js"));
    promoises.push(LoadScriptPromise("parsejs.js"));
    promoises.push(LoadScriptPromise("fbsdk.js"));
    promoises.push(LoadScriptPromise("liffsdk.js"));
    return Promise.all(promoises)
        .then(function () {
            return Promise.resolve();
        })
};

//sdk init

window.sdk_init = function () {
    //fb
    FB.init(appcfg.fb);
    //liff
    initializeLiff(appcfg.liffid);
    //parse
    parse_init(appcfg.parse)
        .then(() => {
            var params = {};
            params.datajson = appcfg.fb;
            return parse_fb_init(params);
        })
        .then(() => {
            app_log("parse init success");
        })
};

//call front

var callfront = function (pkg) {//pkg ex: [["fn0","p0"...],["fn1","p0"...]...]
    return new Promise(function (resolve, reject) {
        c2_callFunction('callpkg', [JSON.stringify(pkg)]);//for c2
        resolve();
    });
};

//logger

var app_log = function (msg) {
    c2_callFunction('log', [msg]);//for c2
    //console.log(msg);
};

//load script

window.loadscripts = function () {
    return LoadScripts()
        .then(() => {
            return callfront([["scripts_ready"]]);
        })
};

var LoadScriptPromise = function (url) {
    return new Promise(function (resolve, reject) {
        LoadScript(url, resolve);
    });
};

var LoadScript = function (url, onload) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0, cnt = scripts.length; i < cnt; i++) {
        if (scripts[i].src.indexOf(url) != -1) {
            if (onload) {
                onload();
            }
            return;
        }
    }
    var newScriptTag = document.createElement('script');
    newScriptTag.setAttribute('src', url);
    if (onload) {
        newScriptTag.onload = onload;
    }
    document.head.appendChild(newScriptTag);
};