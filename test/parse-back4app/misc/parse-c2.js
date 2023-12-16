window.initializeParse = function(appId, jsKey, url) {
    Parse.initialize(appId,jsKey); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = url
    c2_callFunction('parse.init.success');
}

window.parse_writefirst = function (typename, queryConfig, updaterConfig, onSuccess, onError) {
    //想寫入的class名稱, JSON(key equal to value...), JSON(key update to value), successCBK, errorCBK
    var type = Parse.Object.extend(typename);
    var query = new Parse.Query(type);

    for ( var key in queryConfig ){
        query.equalTo(key, queryConfig[key]);
    }

    query.first({
        success: function (updater) {
            if (updater == null) {
                var updater = new type();
            }

            for ( var key in updaterConfig ){
                updater.set(key, updaterConfig[key]);
            }

            updater.save(null, {
                success: function (updater) {
                    onSuccess(updater);
                },
                error: function (updater, error) {
                    onError(updater.error);
                }
            });
        },
        error: function (object, error) {
            onError(error);
        }
    });
};

window.parse_ranktomyorder = function (typename, userID, onRank, descendingBy, afterUnix) { 
    //排行榜名稱, userID, callback, //optional: 以哪個欄位為基準降序(如'score'), 大於某時點(如大於本月首日unixstamp則為本月排行), 
    var type = Parse.Object.extend(typename);
    var start = 0;
    var lines = 1000;
    var db = [];
    var msg = 'success';
    var return_ranking = function(rank){
        onRank(rank, userID, typename, db, msg);
    };
    var on_success = function (rank_obj) {
        if ((!rank_obj) || (rank_obj.length == 0)) {
            msg = 'fetchNoItem';
            return_ranking(-1);
        }
        else {
            var ranking = -1;
            var i = 0;
            var addi = 0;
            var cnt = rank_obj.length;
            //在所有item中以userID取出自己的名次
            for (i = 0; i < cnt; i++) {
                db.push(rank_obj[i]); //將排名在userID前的名次資料存入db
                if (rank_obj[i].get('userID') === userID) {
                    ranking = start + i;
                    //break; //取到自己就停止增加db
                }
                if (ranking != -1) { 
                    addi = addi+1;
                    if (addi == 20){
                        break; //如果已取得ranking，再往下取N個
                    }
                }
            }
            // cound not find userID in this page, try get next page
            if (ranking === -1) {
                if (cnt < lines) {
                    msg = 'foundNoUserID';
                    return_ranking(-1);
                }
                else {
                    start += lines;
                    query_page(start);
                }
            }
            else {
                return_ranking(ranking);
            }
        }
    };
    var on_error = function (error) {
        // page not found, cound not find userID
        msg = 'parseQueryError';
        return_ranking(-1);
    };
    var handler = { 'success': on_success, 'error': on_error };

    var query_page = function (start_) {
        // get lines for each request until get null or get userID
        var query = new Parse.Query(type);
        if (afterUnix != undefined){
            query.greaterThanOrEqualTo('unix', afterUnix);
        }
        if (descendingBy != undefined){
            query.descending(descendingBy);
        }
        query.skip(start_);
        query.limit(lines);
        query.find(handler);
    };
    query_page(start);
}


