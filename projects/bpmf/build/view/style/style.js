const Style = {
    quizPanel: {

        title: {
            fontFamily: 'DFKai-SB',
            fontSize: 48,
            fixedHeight: 60,
            valign: 'center',
            testString: '回'
        },

        qidxtext: {
            fontFamily: 'DFKai-SB',
            fontSize: 48,
            lineSpacing: 20,
            fixedHeight: 120,
            valign: 'center',
            halign: 'right',
            testString: '回'
        },

        word: {
            character: {
                fontFamily: 'DFKai-SB',
                fontSize: 96,
                fixedWidth: 100,
                fixedHeight: 100,
                halign: 'center',
                valign: 'center',
                testString: '回'
            },
            phonology: {
                fontFamily: 'DFKai-SB',
                fontSize: 32,
                fixedWidth: 36,
                fixedHeight: 40,
                halign: 'right',
                valign: 'center',
                testString: '回'
            },
            tone: {
                fontFamily: 'DFKai-SB',
                fontSize: 32,
                fixedWidth: 36,
                fixedHeight: 20,
                halign: 'left',
                valign: 'center',
                testString: 'ˊˇˋ'
            },
            tone0: {
                fontFamily: 'DFKai-SB',
                fontSize: 32,
                fixedWidth: 36,
                fixedHeight: 20,
                halign: 'center',
                valign: 'bottom',
                testString: '˙'
            },

            normalColor: 'white',
            focusColor: 'chocolate',
        },

        choice: {
            phonology: {
                fontFamily: 'DFKai-SB',
                fontSize: 60,
                fixedWidth: 72,
                fixedHeight: 90,
                halign: 'center',
                valign: 'center',
                testString: '回'
            },
            tone: {
                fontFamily: 'DFKai-SB',
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

export { Style };