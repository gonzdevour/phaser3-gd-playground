const TypeNames = ['initials', 'media', 'vowel', 'tone'];
const Initials = 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙ';
const Media = 'ㄧㄨㄩ';
const Vowel = 'ㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ';
const Tone = '˙ ˊˇˋ';
const Bopomofo = {
    initials: Initials.split(''),
    media: Media.split(''),
    vowel: Vowel.split(''),
    tone: Tone.split(''),
}

export {
    TypeNames,
    Initials, Media, Vowel, Tone,
    Bopomofo
};