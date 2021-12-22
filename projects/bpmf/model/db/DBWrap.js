import CreateDB from './CreateDB.js';
import { StringToDB } from './SerializeMethods.js';
import { GetWordCollection, GetCharacterCollection } from './GetCollectionMethods.js';
import Words from './words/Words.js';
import Characters from './characters/Characters.js';

//DBWrap是被Model.js呼叫的功能，在new Model時以Model.db.push(dbWrap)來建立Model.db資料
//當CreateModel(model)時，config為: {db: [this.cache.text.get("db0"), this.cache.text.get("db1")];}
//將其中的db0和db1(json)依序傳入DBWrap處理為一個完整物件回傳
/* DBWrap:{
    model:model,
    id:db編號,
    db:將compress還原回db,
    wordCollection:GetWordCollection(this.db), //從loki取出word collection的method
    characterCollection:GetCharacterCollection(this.db), //從loki取出character collection的method
    words:class, //class內包含words的query fn
    characters:class //class內包含characters的query fn
} */

class DBWrap {
    constructor(model, json) {
        this.model = model;
        this.id = model.db.length; 
        this.db = CreateDB(); //取得loki和loki的collections功能
        if (json) {
            StringToDB(this.db, json);
        }

        // Note: db won't be deserialized later, thus reference of collection won't change.
        this.wordCollection = GetWordCollection(this.db);
        this.characterCollection = GetCharacterCollection(this.db);

        this.words = new Words(this);
        this.characters = new Characters(this);
    }
}

export default DBWrap;