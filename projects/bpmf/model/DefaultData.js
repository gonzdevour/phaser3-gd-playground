//Model.js使用的預設值

var DefaultQuizConfig = {
    database: '高頻詞庫', //指定詞庫種類
    enhancement: '無', //強化練習模式
    mode: '隨機', //依序|隨機|測驗
    count: 3,
}

var DefaultData = Object.assign( //恰巧等於DefaultQuizConfig的複製(物件與陣列不能用var複製否則會指向同一物件)
    {},
    DefaultQuizConfig
);

export {
    DefaultData,
    DefaultQuizConfig
}