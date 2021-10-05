const Style = {
    quizPanel: {
        title: {
            fontFamily: 'Arial',
            fontSize: 32,
            fixedHeight: 48,
            valign: 'center',
            testString: '回'
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
    quiz: {
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
            fontSize: 32,
            fixedWidth: 36,
            fixedHeight: 40,
            halign: 'right',
            valign: 'center',
            testString: '回'
        },
        tone: {
            fontSize: 72,
            fixedWidth: 36,
            fixedHeight: 20,
            halign: 'left',
            valign: 'center',
            testString: 'ˊˇˋ'
        },
        tone0: {
            fontSize: 72,
            fixedWidth: 36,
            fixedHeight: 20,
            halign: 'center',
            valign: 'bottom',
            testString: '˙'
        },
    },
    choice: {
        phonology: {
            fontSize: 60,
            fixedWidth: 72,
            fixedHeight: 90,
            halign: 'center',
            valign: 'center',
            testString: '回'
        },
        tone: {
            fontSize: 90,
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
            fixedWidth: 48 * 4 + 10,
            fixedHeight: 100,
            halign: 'center',
            valign: 'center',
            testString: '回'
        },
    }
}

export { Style };