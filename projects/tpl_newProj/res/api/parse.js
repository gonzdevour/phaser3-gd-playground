window.initializeParse = function(appId, jsKey, url) {
    Parse.initialize(appId,jsKey); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = url
    c2_callFunction('parse.init.success');
}