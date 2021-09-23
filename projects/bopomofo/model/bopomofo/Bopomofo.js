const types = ['initials', 'media', 'vowel', 'tone'];
const initials = 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙ';
const media = 'ㄧㄨㄩ';
const vowel = 'ㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ';
const tone = '˙ ˊˇˋ';
const bopomofo = {
    initials: initials.split(''),
    media: media.split(''),
    vowel: vowel.split(''),
    tone: tone.split(''),
}

export {
    types,
    initials, media, vowel, tone,
    bopomofo
};