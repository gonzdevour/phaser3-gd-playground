import { COLOR_MAIN, COLOR_DARK, COLOR_LIGHT } from './Colors.js';

export default {
    space: {
        left: 0, right: 0, top: 20, bottom: 20,
        titleLeft: 40,
        separator: 10,
    },

    //background: { color: COLOR_DARK, strokeColor: COLOR_LIGHT, strokeWidth: 0, radius: 0, },

    icon: null,

    action: null,

    separator: { color: COLOR_LIGHT, originX: 0, originY: 0.5 },

    text: { fontSize: 48, testString: '|MÉqgy回', originX: 1, originY: 0 },

    title: { fontSize: 48, testString: '|MÉqgy回', originX: 0, originY: 1 },

    align: {
        title: 'left',
        text: 'right'
    },
};