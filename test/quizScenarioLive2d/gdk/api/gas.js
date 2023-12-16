window.gas_req = function (gasurl, params, onSuccess, onError) {
    $.ajax({
        type: 'get',
        url: gasurl,
        data: params,
        success: function(result){
            //console.log(params['method'] + '：' + result);
            onSuccess(result);
        },
        error: function(result){
            //console.log(params['method'] + ' error: ' + result);
            onError(result);
        }
    });
}