const TypeNames = ['initials', 'media', 'vowel', 'tone'];
const Initials = 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙ';
const Media = 'ㄧㄨㄩ';
const Vowel = 'ㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ';
const Tone = '˙ ˊˇˋ';

const initialsList = Initials.split('');
const mediaList = Media.split('');
const vowelList = Vowel.split('');
const toneList = Tone.split('');
const Bopomofo = {
    initials: initialsList,
    media: mediaList,
    vowel: vowelList,
    tone: toneList,
}

var IsInitials = function (bopomofo) {
    return (initialsList.indexOf(bopomofo) !== -1);
}

var IsMedia = function (bopomofo) {
    return (mediaList.indexOf(bopomofo) !== -1);
}

var IsVowel = function (bopomofo) {
    return (vowelList.indexOf(bopomofo) !== -1);
}

var IsTone = function (bopomofo) {
    return (toneList.indexOf(bopomofo) !== -1);
}

export {
    TypeNames,
    Initials, Media, Vowel, Tone,
    Bopomofo,
    IsInitials, IsMedia, IsVowel, IsTone
};