window.jss_parse_do = function (params, onSuccess, onError) {
    var method = params.method;
    var methods = {
        init: parse_init,//appid,jskey,url
        signup: parse_signUp,//
        login: app_logIn,//
        logout: app_logOut,//
        fbinit: parse_fb_init,//
        fblogin: parse_fb_login,//
        fblink: parse_fb_link,//
        fbunlink: parse_fb_unlink,//
        getcurrentuser: parse_curUser_get,//
        pushobj: parse_pushObj,//typename,datajson
        getobjbyid: parse_getObjById,//typename,id
        getobjbyjson: parse_getObjByJson,//datajson
        delobjbyid: parse_delObjById,//typename,id
        updatebyid: parse_updateById,//typename,id,datajson
        pushobjwithlink: parse_pushObjWithLink,//typename,datajson,linkedtypename,linkedid
        addlinkbyid: parse_addLinkById,//typename0,id0,typename1,id1,linkname
        getobjbyidwithlink: parse_getObjByIdWithLink,//typename,id,linkname
        addrelation: parse_addRelation,//typename0,id0,typename1,id1,relationname
        addrelationbyjson: parse_addRelationByJson,//typename0,id0,datajson,relationname
        addrelationboth: parse_addRelationBoth,//typename0,id0,typename1,id1,relationname
        removerelation: parse_removeRelation,//typename0,id0,typename1,id1,relationname
        removerelationbyjson: parse_removeRelationByJson,//typename0,id0,datajson,relationname
        removerelationboth: parse_removeRelationBoth,//typename0,id0,typename1,id1,relationname
        getobjbyidwithrelation: parse_getObjByIdWithRelation,//typename,id,relationname
        query: parse_query,//
        aggregate: parse_aggregate,//
        lq_subscribe: parse_lq_subscribe,//
        lq_unsubscribe: parse_lq_unsubscribe,//
        lq_close: parse_lq_close,//
        filesave: parse_file_save,//
    };
    return methods[method](params)
        .then((result) => {
            onSuccess(result, method);
        })
        .catch((result) => {
            onError(result, method);
        })
};

//parse init

var parse_init = function (params) {
    var appId = params.appid;
    var jsKey = params.jskey;
    var url = params.url;
    var mkey = params.masterkey;
    Parse.initialize(appId, jsKey); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = url;
    Parse.masterKey = mkey;
    return Promise.resolve();
};

//parse user

var parse_signUp = function (params) {
    var datajson = params.datajson;
    var user = new Parse.User();
    for (var key in datajson) {
        user.set(key, datajson[key]);
        app_log(key + ", " + datajson[key]);
    };
    return user.signUp();
};

var app_logIn = function (params) {
    app_log("login start");
    return Parse.User.logIn(params.username, params.password);
};

var app_logOut = function (params) {
    app_log("logout start");
    return Parse.User.logOut();
};

var parse_curUser_get = function (params) {
    return Promise.resolve(Parse.User.current());
};

//parse object

var parse_pushObj = function (params) {
    var typename = params.typename;
    var datajson = params.datajson;
    var type = Parse.Object.extend(typename);
    var updater = new type();
    for (var key in datajson) {
        updater.set(key, datajson[key]);
        app_log(key + ", " + datajson[key]);
    };
    return updater.save();
};

var parse_getObjById = function (params) {
    var typename = params.typename;
    var id = params.id;
    var type = Parse.Object.extend(typename);
    var query = new Parse.Query(type);
    return query.get(id);
};

var parse_getObjByJson = function (params) {
    var datajson = params.datajson;
    var items = [];
    var promoises = [];
    for (var typename in datajson) {
        for (var idx in datajson[typename]) {
            app_log(typename + ":" + datajson[typename][idx]);
            var o = { "typename": typename, "id": datajson[typename][idx] };
            var p = parse_getObjById(o)
                .then(function (item) {
                    items.push(item);
                })
            promoises.push(p);
        };
    };
    return Promise.all(promoises)
        .then(function () {
            return Promise.resolve(items);
        })
}

var parse_delObjById = function (params) {
    return parse_getObjById(params)
        .then((updater) => {
            return updater.destroy();
        })
};

var parse_updateById = function (params) {
    var datajson = params.datajson;
    return parse_getObjById(params)
        .then((updater) => {
            //method: set,increment(for count),add, addUnique, remove(for arrays)
            //key: key to update, datajson[method][key]: value to update
            for (var method in datajson) {
                for (var key in datajson[method]) {
                    updater[method](key, datajson[method][key]);
                    app_log(method + ": " + key + ',' + datajson[method][key]);
                };
            };
            return updater.save();
        });
};

var parse_pushObjWithLink = function (params) {
    var typename = params.typename;//pushed obj's typename
    var datajson = params.datajson;//pushed obj's datajson
    var linkname = params.linkname;
    var linkedtypename = params.linkedtypename;//linked obj's typename
    var linkedid = params.linkedid;
    var linkedtype = Parse.Object.extend(linkedtypename);
    var linker = new linkedtype();
    linker.id = linkedid;
    var type = Parse.Object.extend(typename);
    var updater = new type();
    for (var key in datajson) {
        updater.set(key, datajson[key]);
        //app_log(key + ", " + datajson[key]);
    };
    updater.set(linkname, linker);
    return updater.save();
};

var parse_addLinkById = function (params) {
    return parse_getObjById({ typename: params.typename, id: params.id })
        .then((updater0) => {
            return parse_getObjById({ typename: params.linkedtypename, id: params.linkedid })
                .then((updater1) => {
                    updater0.set(params.linkname, updater1);
                    return updater0.save();
                })
        })
};

var parse_getObjByIdWithLink = function (params) {
    return parse_getObjById(params)
        .then((updater) => {
            return updater.get(params.linkname).fetch()
                .then((linker) => {
                    return Promise.resolve([updater, linker]);
                })
        });
};

var parse_addRelation = function (params) {
    app_log("parse add B as A's" + params.relationname);
    return parse_getObjById({ typename: params.typename0, id: params.id0 })
        .then((updater0) => {
            return parse_getObjById({ typename: params.typename1, id: params.id1 })
                .then((updater1) => {
                    updater0.relation(params.relationname).add(updater1);
                    return updater0.save();
                })
        })
};

var parse_addRelationByJson = function (params) {
    app_log("parse add BCD as A's" + params.relationname);
    return parse_getObjById({ typename: params.typename0, id: params.id0 })
        .then((updater0) => {
            return parse_getObjByJson(params)//return an array
                .then((updater1) => {
                    app_log("updater1: " + JSON.stringify(updater1));
                    updater0.relation(params.relationname).add(updater1);
                    return updater0.save();
                })
        })
};

var parse_addRelationBoth = function (params) {
    app_log("parse make B and A are " + params.relationname);
    var updater0;
    var updater1;
    return parse_getObjById({ typename: params.typename0, id: params.id0 })
        .then((p) => {
            updater0 = p;
            return parse_getObjById({ typename: params.typename1, id: params.id1 });
        })
        .then((p) => {
            updater1 = p;
            updater0.relation(params.relationname).add(updater1);
            updater1.relation(params.relationname).add(updater0);
            return Parse.Object.saveAll([updater0, updater1]);
        })
};

var parse_removeRelation = function (params) {
    app_log("parse remove B from A's " + params.relationname);
    return parse_getObjById({ typename: params.typename0, id: params.id0 })
        .then((updater0) => {
            return parse_getObjById({ typename: params.typename1, id: params.id1 })
                .then((updater1) => {
                    updater0.relation(params.relationname).remove(updater1);
                    return updater0.save();
                })
        })
};

var parse_removeRelationByJson = function (params) {
    app_log("parse remove B from A's " + params.relationname);
    return parse_getObjById({ typename: params.typename0, id: params.id0 })
        .then((updater0) => {
            return parse_getObjByJson(params)//return an array
                .then((updater1) => {
                    updater0.relation(params.relationname).remove(updater1);
                    return updater0.save();
                })
        })
};

var parse_removeRelationBoth = function (params) {
    app_log("parse make B and A no longer " + params.relationname);
    var updater0;
    var updater1;
    return parse_getObjById({ typename: params.typename0, id: params.id0 })
        .then((p) => {
            updater0 = p;
            return parse_getObjById({ typename: params.typename1, id: params.id1 });
        })
        .then((p) => {
            updater1 = p;
            updater0.relation(params.relationname).remove(updater1);
            updater1.relation(params.relationname).remove(updater0);
            return Parse.Object.saveAll([updater0, updater1]);
        })
};

var parse_getObjByIdWithRelation = function (params) {
    return parse_getObjById(params)
        .then((updater) => {
            return updater.relation(params.relationname).query().find()
                .then((linker) => {
                    return Promise.resolve([updater, linker]);
                })
        });
};

//parse query

var parse_query = function (params) {
    var querymethod = params.querymethod;//常用：find, first; 不常用：count, distinct
    var queryparam = params.queryparam;//只有distinct(值不重覆)會用到
    var datajson = params.datajson;
    var dataarray = params.dataarray;
    var datakeyarray = params.datakeyarray;
    var datavalue = params.datavalue;
    var typename = params.typename;
    var type = Parse.Object.extend(typename);
    var query = new Parse.Query(type);
    for (var cond in datajson) {
        //cond(key,value)
        //include,equalto,notEqualTo,greaterThan,greaterThanOrEqualTo,lessThan,lessThanOrEqualTo,startsWith
        for (var key in datajson[cond]) {
            app_log(key + " " + cond + " " + datajson[cond][key]);
            query[cond](key, datajson[cond][key]);
        };
    };
    for (var cond in datakeyarray) {
        //cond(key,array)
        //containedIn,notContainedIn,containsAll
        for (var key in datakeyarray[cond]) {
            var arr = datakeyarray[cond][key].split(",");//string to array
            app_log(key + " " + cond + " " + arr);
            query[cond](key, arr);
        };
    };
    for (var cond in datavalue) {
        //cond(key or value)
        //ascending,descending,exist,doesNotExist,limit,skip
        app_log(cond + " " + datavalue[cond]);
        query[cond](datavalue[cond]);
    };
    for (var cond in dataarray) {
        //cond(array)
        //include,select
        app_log(cond + " " + dataarray[cond]);
        query[cond](dataarray[cond]);
    };
    return query[querymethod](queryparam);
};

var parse_aggregate = function (params) {//master key required
    var pipelineArray = [];
    var pipeline = {};
    //用變數建立pipeline。group是aggregate的stage運算子之一，常用。
    pipeline["group"] = {};
    pipeline["group"]["result"] = {};
    pipeline["group"]["objectId"] = '$' + params.field2list;
    pipeline["group"]["result"]["$" + params.cntmethod] = '$' + params.field2cnt;
    pipelineArray.push(pipeline);
    app_log("parse_aggregate: " + JSON.stringify(pipelineArray));
    //範例：pipelineArray = [{ group: { objectId: '$school', result: { $sum: '$score' } } }];
    //objectId是指：「用什麼值來當列表物件不重覆的ID」，為aggregate的必要參數 
    //objectId:null時，可對列表中所有物件作運算；objectId:'$<fieldname>'時，則以該欄位中不重複的值為物件ID
    //result是自訂的新field運算方法：合計$sum, 平均$avg, 最大$max, 最小$min
    var query = new Parse.Query(params.typename);
    return query.aggregate(pipelineArray);
};

//parse live query

var parse_lq_subscription;//這是單一class監聽的變數設計，如果需要同時複數class監聽，可能就要用array或JSON

var parse_lq_subscribe = function (params) {//這是back4app的做法，與開源parse不同
    app_log("parse_lq_subscription");
    var appId = params.appid;
    var jsKey = params.jskey;
    var wssurl = params.wssurl;
    var client = new Parse.LiveQueryClient({
        applicationId: appId,
        serverURL: wssurl,
        javascriptKey: jsKey
    });
    client.open();
    var query = new Parse.Query(params.typename);
    //用task name對監聽任務做分類，並建立適合的constraints組
    //例如：query.ascending('createdAt').limit(5);
    if (params.task = "login_only_one") {
        //login_only_one是對複數登入產生on update callback的機制
        //1.使用Parse內建login機制時可以訂閱relation:User的變動：
        //query.equalTo("owner", Parse.User.current());
        //2.使用UserInfo做自訂登入時，訂閱自己的objectId(client端判斷updateAt或logincnt的變動)：
        //query.equalTo("objectId", params.userinfo.id);
    };
    //執行訂閱
    parse_lq_subscription = client.subscribe(query);
    //events
    parse_lq_subscription.on('open', (response) => {
        app_log('lq_opened: ' + JSON.stringify(response));
        callfront([[(params.task + "_lq_opened"), JSON.stringify(params.userinfo)]]);
    });
    parse_lq_subscription.on('create', (object, response) => {
        app_log('lq_created: ' + JSON.stringify(response));
        callfront([[(params.task + "_lq_created"), object]]);
    });
    parse_lq_subscription.on('update', (object, original, response) => {
        app_log('lq_updated: ' + JSON.stringify(response));
        callfront([[(params.task + "_lq_updated"), JSON.stringify(object), JSON.stringify(original)]]);
        //back4app尚未提供object和original回傳(值為0)，response提供兩個物件都是updated object，感覺是bug
        //callfront([[(params.task + "_lq_updated"), object, original]]);
    });
    parse_lq_subscription.on('enter', (object, original, response) => {//原先已存在但不符合query條件者，當其符合條件後觸發enter
        app_log('lq_entered: ' + JSON.stringify(response));
        callfront([[(params.task + "_lq_entered"), object, original]]);
    });
    parse_lq_subscription.on('leave', (object, response) => {//原先已存在且符合query條件者，當其不符合條件後觸發leave
        app_log('lq_left: ' + JSON.stringify(response));
        callfront([[(params.task + "_lq_left"), object]]);
    });
    parse_lq_subscription.on('delete', (object, response) => {
        app_log('lq_deleted: ' + JSON.stringify(response));
        callfront([[(params.task + "_lq_deleted"), object]]);
    });
    parse_lq_subscription.on('close', () => {
        app_log('lq_closed: ' + JSON.stringify(parse_lq_subscription));
        callfront([[(params.task + "_lq_closed")]]);
    });
    return Promise.resolve();
};

var parse_lq_unsubscribe = function () {//unsubscribe會直接觸發on close
    parse_lq_subscription.unsubscribe();
    return Promise.resolve();
};

var parse_lq_close = function () {//關閉所有subscription並停止reconnect，back4app似乎不支援這條
    Parse.LiveQuery.close();
    return Promise.resolve();
};

//fb auth

var parse_fb_init = function (params) {
    Parse.FacebookUtils.init(params.datajson);
    return Promise.resolve();
};

var parse_fb_login = function (params) {
    return Parse.FacebookUtils.logIn("public_profile,email")
        .then((user) => {
            return parse_fb_profile_save(user)
                .then((user) => {
                    params.user = user;
                    return app_login_associate(params);
                });
        });
};

var parse_fb_link = function (params) {
    return Parse.FacebookUtils.link(Parse.User.current(), "public_profile,email")
        .then((user) => {
            return parse_fb_profile_save(user)
                .then((user) => {
                    params.user = user;
                    return app_login_associate(params);
                });
        })
}

var parse_fb_unlink = function (params) {
    return Parse.FacebookUtils.unlink(Parse.User.current());
}

var parse_fb_profile_save = function (user) {
    return new Promise(function (resolve, reject) {
        FB.api('/me/?fields=id,name,email,picture.type(large)', function (response) {
            resolve(response);
        });
    })
        .then((response) => {
            user.set('username', response.name);
            user.set('email', response.email);
            user.set('photourl', response.picture.data.url);
            return user.save();
        });
}

var app_login_associate = function (params) {//info為User class指到UserInfo的pointer，為可自訂的參數名稱
    var userdata = JSON.parse(JSON.stringify(params.user));//user是大型物件，轉JSON取得必要值後轉成物件
    if (!userdata.info) {//登入後若User內"info"欄無值則須在UserInfo建立物件
        app_log("new user!");
        app_log("login_associate_sstoken = " + userdata.sessionToken);
        app_log("login_associate_id = " + userdata.objectId);
        params.datajson.sstoken = userdata.sessionToken;
        params.linkedid = userdata.objectId;
        return parse_pushObjWithLink(params)//先建立UserInfo物件連結User為"owner"
            .then((userinfo) => {
                params.user.set('info', userinfo);
                return params.user.save();//再將User連結到新建立的UserInfo為"info"
            });
    } else {
        app_log("welcome back user! login_associate_sstoken = " + userdata.sessionToken);
        params.datajson.sstoken = userdata.sessionToken;
        var datajson2set = params.datajson;//把從params來的的datajson記錄起來
        params.datajson = {};//清空datajson
        params.datajson.set = datajson2set;//將datajson改成updateById允許的格式{"method":{datajson}}
        params.id = userdata.info.objectId;
        return parse_updateById(params);
    };
};

//file

var parse_file_save2 = function (params) {
    //var parseFile = new Parse.File(params.name, params.data, params.type, params.metadata, params.tags);
    var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
    var parseFile = new Parse.File("test.jpg", { base64: base64 });
    return parseFile.save();
};

var parse_file_save = function (params) {
    var typename = params.typename;
    var datajson = params.datajson;
    var file = params.file;
    var type = Parse.Object.extend(typename);
    var updater = new type();
    for (var key in datajson) {
        updater.set(key, datajson[key]);
        app_log(key + ", " + datajson[key]);
    };
    app_log("filedata: " + JSON.stringify(file.data));
    var parseFile = new Parse.File(file.name, file.data, file.type, file.metadata, file.tags);
    //var parseFile = new Parse.File(file.name, file.data, file.type);
    updater.set("file", parseFile);
    return updater.save();
};
