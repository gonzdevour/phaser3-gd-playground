import Model from "../../model/Model.js";

//config: {db: [this.cache.text.get("db0"), this.cache.text.get("db1")];}
//在boot scene呼叫，用db cache array建立model，並透過base scene class將model存入Model變數。

var CreateModel = function (config) {
  //config
  return new Model(config);
};

export default CreateModel;
