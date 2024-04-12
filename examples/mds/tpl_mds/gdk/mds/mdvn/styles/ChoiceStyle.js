import { COLOR_MAIN, COLOR_DARK, COLOR_LIGHT } from './Colors.js';

export default {
    space: {
        left: 20, right: 20, top: 20, bottom: 20,
        title: 60,
        content: 30,
        choices: 30, choice: 20,
    },

    background: { color: COLOR_MAIN, strokeColor: COLOR_LIGHT, radius: 20, },

    title: {
        $type:'label',
        space: { left: 5, right: 5, top: 20, bottom: 5 },
        text: {
            $type:'bbcodetext',
            fontSize: 48, testString: '|MÉqgy回',
        },
        wrapText: 'char',
        background: {
            color: COLOR_DARK,
            alpha: 0,
        }
    },

    content: {
        $type:'label',
        space: { left: 5, right: 5, top: 5, bottom: 5 },
        text: {
            $type:'bbcodetext',
            fontSize: 48,
            testString: '|MÉqgy回',
        },
        wrapText: 'char',
    },

    choicesType: 'radio',
    choice: {
        space: { left: 20, right: 20, top: 20, bottom: 20 },
        background: {
            color: COLOR_DARK,
            strokeWidth: 0,
            radius: 10,

            'hover.strokeColor': 0xffffff,
            'hover.color': 0x555555,
            'hover.strokeWidth': 4,
            'active.color': COLOR_LIGHT,
        },
        text: {
            $type:'bbcodetext',
            fontSize: 48,
            testString: '|MÉqgy回',
        },
        wrapText: 'char',
    },

    align: {
        actions: 'right'
    },
}