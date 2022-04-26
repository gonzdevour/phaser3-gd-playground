import Character from "../Character.js";

var Query = function (dbWrap, filter, sortMode) {
  //character用的query
  var characterCollection = dbWrap.characterCollection; //使用characterCollection

  if (typeof sortMode === "string") {
    sortMode = SortMode[sortMode];
  }

  var docArray;
  switch (sortMode) {
    case 1: // 'bopomofo'
      docArray = characterCollection
        .chain() //init
        .find(filter) //依GetBopomofoFilter(bopomofo)的巢狀JSON查找
        .compoundsort(["initials", "media", "vowel", "tone"]) //依ㄅㄆㄇㄈunicode排序
        .data();
      break;

    case 2: // 'freq'
      docArray = characterCollection.chain().find(filter).simplesort("freq").data();
      break;
      
    default:
      docArray = characterCollection.find(filter);
      break;
  }

  var characters = [];
  for (var i = 0, cnt = docArray.length; i < cnt; i++) {
    characters.push(new Character(dbWrap, docArray[i]));
  }
  return characters; //character doc array
};
const SortMode = {
  none: 0,
  bopomofo: 1,
  freq: 2,
};

export default Query;
