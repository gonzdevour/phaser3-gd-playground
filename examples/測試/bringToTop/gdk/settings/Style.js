import { getOS } from 'gdkPlugins/utils/os/os.js';
//get OS status
var OS = getOS();
var fontFamilyName = OS.desktop?'DFKai-SB':'Noto Sans CJK';
var bitmapTextName = OS.desktop?'bf0':'bf1';

var Style = {
    bitmapTextName: bitmapTextName,
    bitmapTextSize: 32,
    fontFamilyName: fontFamilyName,
    reviewPanel: {
        word: {
            character: {
                fontFamily: fontFamilyName,
                fontSize: 48,
                fixedWidth: 50,
                fixedHeight: 50,
                halign: 'center',
                valign: 'center',
                testString: '回'
            },
            phonology: {
                fontFamily: fontFamilyName,
                fontSize: 16,
                fixedWidth: 18,
                fixedHeight: 20,
                halign: 'right',
                valign: 'center',
                testString: '回'
            },
            tone: {
                fontFamily: fontFamilyName,
                fontSize: 16,
                fixedWidth: 18,
                fixedHeight: 10,
                halign: 'left',
                valign: 'center',
                testString: 'ˊˇˋ'
            },
            tone0: {
                fontFamily: fontFamilyName,
                fontSize: 16,
                fixedWidth: 18,
                fixedHeight: 10,
                halign: 'center',
                valign: 'bottom',
                testString: '˙'
            },

            normalColor: 'white',
            focusColor: 'chocolate',
            characterSizerHeight: 0.5*((55 * 3) + 2),
        },
    },

    quizPanel: {

        title: {
            fontFamily: fontFamilyName,
            fontSize: 48,
            fixedHeight: 60,
            valign: 'center',
            testString: '回'
        },

        qidxtext: {
            fontFamily: fontFamilyName,
            fontSize: 48,
            lineSpacing: 20,
            fixedHeight: 120,
            valign: 'center',
            halign: 'right',
            testString: '回'
        },

        word: {
            character: {
                fontFamily: fontFamilyName,
                fontSize: 96,
                fixedWidth: 100,
                fixedHeight: 100,
                halign: 'center',
                valign: 'center',
                testString: '回'
            },
            phonology: {
                fontFamily: fontFamilyName,
                fontSize: 32,
                fixedWidth: 36,
                fixedHeight: 40,
                halign: 'right',
                valign: 'center',
                testString: '回'
            },
            tone: {
                fontFamily: fontFamilyName,
                fontSize: 32,
                fixedWidth: 36,
                fixedHeight: 20,
                halign: 'left',
                valign: 'center',
                testString: 'ˊˇˋ'
            },
            tone0: {
                fontFamily: fontFamilyName,
                fontSize: 32,
                fixedWidth: 36,
                fixedHeight: 20,
                halign: 'center',
                valign: 'bottom',
                testString: '˙'
            },

            normalColor: 'white',
            focusColor: 'chocolate',
            characterSizerHeight: (55 * 3) + 2,
        },

        choice: {
            phonology: {
                fontFamily: fontFamilyName,
                fontSize: 60,
                fixedWidth: 72,
                fixedHeight: 90,
                halign: 'center',
                valign: 'center',
                testString: '回'
            },
            tone: {
                fontFamily: fontFamilyName,
                fontSize: 60,
                fixedWidth: 72,
                fixedHeight: 90,
                halign: 'center',
                valign: 'center',
                testString: '回'
            },
        },

        action: {
            submit: {
                fontSize: 48,
                // fixedWidth: 48 * 4 + 10, // Fit the text Width
                fixedHeight: 100,
                halign: 'center',
                valign: 'center',
                testString: '回'
            },
        },

        top: {
            round: {
                tl: 10,
                tr: 10,
                bl: 0,
                br: 0
            },
        },
        bottom: {
            round: {
                tl: 0,
                tr: 0,
                bl: 10,
                br: 10
            },
        },
    },

}

export default Style;