//面板的所有可能選項，預設值放在model/DefaultData.js

const DataBaseOptions = [
    { title: '高頻詞庫', description: '參照教育部公布之詞頻總表' },
    { title: '常用詞庫', description: '分類整理生活中的常見用詞' },
]

const EnhanceOptions = [
    'ㄓㄗ',
    'ㄔㄘ',
    'ㄕㄙ',
    'ㄛㄡ',
    'ㄝㄟ',
    'ㄢㄣ',
    'ㄣㄥ',
    '結合韻',
    '無',
]

const QuizModeOptions = [
    '隨機',
    '依序',
    '測驗'
]


export {
    DataBaseOptions,
    EnhanceOptions,
    QuizModeOptions
}