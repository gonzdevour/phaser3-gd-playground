import phaser from 'phaser/src/phaser.js';
import Papa from 'papaparse/papaparse.js';
import loki from 'lokijs/src/lokijs.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {

        var csvString = `name,hp,mp,friends,email
Rex,100,20,"gd,Alice","emailA"
Alice,300,40,"gd","emailB"
gd,150,40,"Rex""emailC"`;

        var csvTable = Papa.parse(csvString, {
            dynamicTyping: true,
            header: true
        }).data;

        // Create the database
        var db = new loki();

        // Create a collection
        var collection = db.addCollection('userList',{
            indices: ["name"], //建立快速索引，例如ID、圖書管的isbn標準碼，find時如果用到indices內的key就會加速
            unique: "email", //指定有唯一性質的欄位，如ID或email(unique key可以用by取得值)
        });

        // insert csv-table
        collection.insert(csvTable);

        console.log(`--collection--`)
        console.log(collection)

        console.log(`--collection.chain().data()--`)
        var result = collection.chain().data();
        console.log(result);

        console.log(`--測試unique key(email)--`)
        try {
            // 尝试添加第二个玩家，具有不同的 email，这应该成功
            collection.insert({ name: 'Bob', hp:10, mp: 50, friends:"Rex, Charlie", email:"emailD" });
            
            // 尝试添加第三个玩家，但 email 与第一个玩家相同，这将抛出错误
            collection.insert({ name: 'Charlie', hp:10, mp: 50, friends:"gd, Bob", email:"emailA" });
        } catch (e) {
            console.log(e); //錯誤訊息會是：Duplicate key for property email: emailA
        }
        
        console.log(`--id: 2--`)
        var qByID = collection.get(2)
        console.log(qByID)

        console.log(`--unique name "gd"--`)
        var qByUniqueKeyValue = collection.by("name", "gd")
        console.log(qByUniqueKeyValue)

        console.log(`--hp equal 100--`)
        var qEqual = collection.find({hp: {'$eq': 100}})
        console.log(qEqual)

        console.log(`--hp abstract equal "100"--`)
        var qAbstractEqual = collection.find({hp: {'$aeq': "100"}});
        console.log(qAbstractEqual)

        console.log(`--hp not equal 100--`)
        var qNotEqual = collection.find({hp: {'$ne': 100}});
        console.log(qNotEqual)

        console.log(`--hp greater than 100--`)
        var qGreaterThan = collection.find({hp: {'$gt': 100}});
        console.log(qGreaterThan)

        console.log(`--hp greater than or equal to 100--`)
        var qGreaterThanOrEqualTo = collection.find({hp: {'$gte': 100}});
        console.log(qGreaterThanOrEqualTo)

        console.log(`--hp less than 200--`)
        var qLessThan = collection.find({hp: {'$lt': 200}});
        console.log(qLessThan)

        console.log(`--hp less than or equal to 100--`)
        var qLessThanOrEqualTo = collection.find({hp: {'$lte': 100}});
        console.log(qLessThanOrEqualTo)   

        console.log(`--hp between 100 & 300--`)
        var qBetween = collection.find({hp: {'$between': [100,300]}});//會包含100和300
        console.log(qBetween)

        console.log(`--name in the list: "Rex" & "gd"--`)
        var qIn = collection.find({name: {'$in': ["Rex", "gd"]}});
        console.log(qIn)

        console.log(`--name not in the list: "Rex" & "gd"--`)
        var qNotIn = collection.find({name: {'$nin': ["Rex", "gd"]}});
        console.log(qNotIn)

        console.log(`--friends array contains "gd"--`)
        var qContains = collection.find({friends: {'$contains': "gd"}});
        console.log(qContains)

        console.log(`--friends array contains any ["Alice", "Rex"]--`)
        var qContainsAny = collection.find({friends: {'$containsAny': ["Alice", "Rex"]}});
        console.log(qContainsAny)

        console.log(`--friends array contains none ["Alice", "Rex"]--`)
        var qContainsNone = collection.find({friends: {'$containsNone': ["Alice", "Rex"]}});
        console.log(qContainsNone)

        console.log(`--name matching regex "/rex/i"--`)
        var qRegex = collection.find({name: {'$regex': ["rex","i"]}});
        console.log(qRegex)

        console.log(`--hp greater than 150 or less than 150--`)
        var qOr = collection.find({'$or': [
            {hp: {'$lt': 150}},
            {hp: {'$gt': 150}},
            // ...
        ]});
        console.log(qOr)

        console.log(`--hp greater than 150 or less than 150(find one)--`)
        var qOrFindOne = collection.findOne({'$or': [
            {hp: {'$lt': 150}},
            {hp: {'$gt': 150}},
            // ...
        ]});
        console.log(qOrFindOne)

        console.log(`--(where)hp less than 200 & mp less than 40--`)
        var qWhere = collection.where(function(doc) {
            return doc.hp < 200 && doc.mp < 40;//以自定義函數為filter
        });
        console.log(qWhere)

        console.log(`--find and sort by hp(ascending)--`)
        var qSimpleSort = collection.chain().find({}).simplesort("hp").data();
        console.log(qSimpleSort)

        console.log(`--find and sort by hp(descending)--`)
        var qSimpleSort = collection.chain().find({}).simplesort("hp", true).data();
        console.log(qSimpleSort)

        console.log(`--find and multi-sort by mp & hp(mp desc, hp asc)--`)
        var qCompoundSort = collection.chain().find({}).compoundsort([["mp",true], ["hp",false]]).data();
        console.log(qCompoundSort)

        console.log(`--自定義函數排序--`)
        var qCustomSort = collection.chain().find({}).sort(function(doc1, doc2) {
            // 首先按 mp 升序排序
            if (doc1.mp < doc2.mp) {
                return -1;
            } else if (doc1.mp > doc2.mp) {
                return 1;
            } else {
                // 如果 mp 相等，再按 hp 降序排序
                if (doc1.hp > doc2.hp) {
                    return -1;
                } else if (doc1.hp < doc2.hp) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }).data();
        console.log(qCustomSort)

        console.log(`--取出第P個以後Q個資料--`)
        var qCrop = collection.chain().find({}).offset(1).limit(2).data();
        console.log(qCrop)

        console.log(`--自定義函數更新資料--`)
        var qUpdate = collection.chain().find({}).update(function(doc) {
            if (doc.name === "Rex") {
                doc.hp += 99; // 增加名为 Rex 的角色 50 点生命值
            }
            return doc; // 返回修改后的文档以更新集合中的文档
        }).data();
        console.log(qUpdate)

        console.log(`--移除查詢到的資料--`)
        collection.chain().find({"name":"gd"}).remove(); //remove沒有回傳promise，後面不能接data
        var qRemove = collection.chain().data();
        console.log(qRemove)

        console.log(`--新增一筆資料--`)
        collection.insert({name:"gd02", hp:333, mp:333, friends:"Goku, Friren"});
        var cInsert = collection.chain().data();
        console.log(cInsert)

/*         console.log(`--依內容重構資料--`)
        var cMap = collection.chain().find({}).map(function(doc) {
            // 基于 hp 值设置 status 字段
            if (doc.hp > 100) {
                doc.status = "healthy";
            } else {
                doc.status = "weak";
            }
            return doc; // 返回修改后的文档
        }).data(); // 这里直接得到处理后的文档数组，无需调用 .data()
        console.log(cMap) */

        console.log(`--對資料庫新增欄位與內容(for each + update)--`)
        collection.chain().find({}).data().forEach(function(doc) {
            if (doc.hp > 100) {
                doc.status = "healthy";
            } else {
                doc.status = "weak";
            }
            collection.update(doc); // 使用 update() 方法更新文档
        });
        var cForEachUpdate = collection.chain().data();
        console.log(cForEachUpdate)

        console.log(`--以collection的內容為條件建立(map)新的匿名collection--`)
        var cMap = collection.chain().find({}).map(function(doc) {
            // 根据角色的 hp 值判断角色的状态
            var status = doc.hp > 100 ? "Strong" : "Weak";
            // 创建一个新对象，要注意這邊不能帶有原本doc中的$loki屬性否則會報錯
            var newDoc = {
                name: doc.name,
                hp: doc.hp,
                mp: doc.mp,
                status: status // 添加状态信息
            };
            
            return newDoc; // 返回这个新的对象，而非原始文档
        }).data();
        console.log(cMap);

        console.log(`--將原始資料map後重新歸納累計(總hp & 總mp)--`)

        // Map Function: 返回每个角色的 hp 和 mp
        var mapFn = function(doc) {
            return { hp: doc.hp, mp: doc.mp };
        };

        // Reduce Function: 计算所有角色的 hp 和 mp 总和
        var reduceFn = function(docArray) {
            return docArray.reduce(function(accumulator, currentValue) {
                accumulator.hp += currentValue.hp;
                accumulator.mp += currentValue.mp;
                return accumulator;
            }, { hp: 0, mp: 0 }); // 初始值
        };

        // 执行 mapReduce
        var cMapReduce = collection.chain().find({}).mapReduce(mapFn, reduceFn);

        console.log(cMapReduce); // 输出 { hp: 总生命值, mp: 总魔法值 }

        console.log(`--複製一份篩選結果作為新的collection--`)
        var cloneTarget = collection.chain().find({});
        var cClone = cloneTarget.branch();
        console.log(cClone.find().data());

        console.log(`--建立collection的動態視圖(healthy排行榜)--`)
        // 创建动态视图
        var healthyPlayersView = collection.addDynamicView('HealthyPlayers');
        // 配置过滤条件，只包含狀態為healthy的玩家
        healthyPlayersView.applyFind({ status: "healthy" });
        // 配置排序规则，按hp降序
        healthyPlayersView.applySimpleSort('hp', true);
        
        console.log(healthyPlayersView.data());

        console.log(`--依動態視圖追加條件(mp>30)--`)
        var cViewAddFilter = healthyPlayersView.branchResultset().find({mp:{$gt:30}}).data();
        console.log(cViewAddFilter);

        console.log(`--平均值(hp)--`)
        console.log(collection.avg("hp"));

        console.log(`--最大值(hp)--`)
        console.log(collection.max("hp"));

        console.log(`--最小值(hp)--`)
        console.log(collection.min("hp"));

        console.log(`--中位數(hp)--`)
        console.log(collection.median("hp"));

        console.log(`--總計(hp>250的人有幾個)--`)
        console.log(collection.count({"hp":{$gt:250}}));

        console.log(`--db to JSON to db--`)
        var dbAsJSON = db.serialize();
        db.loadJSON(dbAsJSON);
        var collection = db.getCollection('userList')
        console.log(collection.chain().data());

    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);