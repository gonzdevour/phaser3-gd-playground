import Model from '../../model/Model.js';

var CreateModel = function (config) {
    var model = new Model(config);

    // Add event hander here
    /*
    model.on(eventName, function(result){

    });
    */

    return model;
}

export default CreateModel;