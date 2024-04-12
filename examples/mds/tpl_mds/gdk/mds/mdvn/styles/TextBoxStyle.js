import { COLOR_MAIN, COLOR_DARK, COLOR_LIGHT } from './Colors.js';

export default {
    space: {
        innerLeft: 20, innerRight: 20, innerTop: 20, innerBottom: 20,

        titleLeft: 20,
        icon: 10, text: 10,
    },

    innerBackground: { color: COLOR_MAIN, strokeColor: COLOR_LIGHT, strokeWidth: 4, radius: 20, },

    icon: { width: 0, height: 0, color: 0x0 },

    action: { tint: COLOR_LIGHT, alpha: 0, },

    text: { fontSize: 48, maxLines: 4, testString: '|MÉqgy回', },

    title: {
        $type: 'label',

        width: 200,
        space: {
            left: 20, right: 20, top: 20, bottom: 20,
            icon: 20,
            text: 20,
        },

        background: {
            radius: { tl: 10, tr: 10 },
            color: COLOR_DARK,
            strokeColor: COLOR_LIGHT, strokeWidth: 0,
            alpha:0.6,
        },
        text: { fontStyle: 'bold', fontSize: 48, testString: '|MÉqgy回', },

        icon: null,
        action: null,

        align: 'center',
        alpha: 0,
    }
};