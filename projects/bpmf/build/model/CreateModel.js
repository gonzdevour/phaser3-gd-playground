import Model from "../../model/Model.js";

//config: {db: [this.cache.text.get("db0"), this.cache.text.get("db1")];}

var CreateModel = function (config) {
  //config
  return new Model(config);
};

export default CreateModel;
