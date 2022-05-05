import DBWrap from "../../model/db/DBWrap.js";

var CreateModelDB = function (dbList) {
    //從CreateModel傳入config: {db: [this.cache.text.get("db0"), this.cache.text.get("db1")];}
    var db = [];
    for (var i = 0, cnt = dbList.length; i < cnt; i++) { //db0, db1，兩者為.compress壓縮字串
        var id = i;
        var dbWrap = new DBWrap(id, dbList[i]) //用DBWrap解壓縮compress後，傳入Model.db array裡
        db.push(dbWrap);
    }
  return db;
}

export default CreateModelDB;
