export const GetTweakStyle = function ({
    width = 500,
    fontSize = 32,
    colors
}) {
    var {
        main = 0x424242,
        light = 0x6d6d6d,
        dark = 0x1b1b1b
    } = colors;

    const COLOR_MAIN = main;
    const COLOR_LIGHT = light;
    const COLOR_DARK = dark;

    return {
        width: width,

        styles: {
            space: { left: 10, right: 10, top: 10, bottom: 10 },

            background: {
                radius: 10,
                color: 0x0,
                strokeColor: 0xffffff,
            },

            inputRow: {
                space: { left: 5, right: 5, top: 2, bottom: 2 },

                background: {
                    strokeColor: COLOR_MAIN
                },

                title: {
                    space: { icon: 2 },
                    iconSize: 30,
                    text: { fontSize: fontSize },
                },

                inputText: {
                    background: {
                        color: COLOR_DARK
                    },
                    focusStyle: {
                        color: COLOR_MAIN,
                    },
                    style: {
                        backgroundBottomY: 4,
                        backgroundHeight: 18,
                        fontSize: fontSize,
                    },
                    cursorStyle: {
                        color: 'black',
                        backgroundColor: 'white',
                    },
                },

                slider: {
                    track: {
                        color: COLOR_DARK,
                        height: 24,
                    },
                    indicator: {
                        color: COLOR_MAIN,
                        height: 24,
                    },
                    thumb: {
                        color: COLOR_LIGHT,
                        radius: 24,
                        width: 48, height: 48,
                    },
                },

                list: {
                    label: {
                        space: { left: 5, right: 5 },
                        background: {
                            color: COLOR_DARK,
                        },
                    },
                    button: {
                        space: { left: 5, right: 5, top: 8, bottom: 8 },
                        background: {
                            color: COLOR_DARK,
                            strokeColor: COLOR_LIGHT,

                            'hover.color': COLOR_LIGHT,
                        },
                    },
                },

                button: {
                    space: { left: 8, right: 8, top: 8, bottom: 8 },
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                        'active.color': COLOR_LIGHT,
                    },
                },

                checkbox: {
                    color: COLOR_LIGHT,
                    boxStrokeColor: COLOR_DARK,
                    uncheckedColor: COLOR_DARK,
                },

                colorInput: {
                    colorPicker: {
                        background: { color: 0x0, strokeColor: COLOR_LIGHT },
                    },

                    colorComponents: {
                        inputText: {
                            background: {
                                color: COLOR_DARK
                            },
                            focusStyle: {
                                color: COLOR_MAIN,
                            },
                            style: {
                                backgroundBottomY: 4,
                                backgroundHeight: 18,
                            },
                            cursorStyle: {
                                color: 'black',
                                backgroundColor: 'white',
                            }
                        }
                    }
                },

                proportion: {
                    title: 1,
                    inputField: 1.5,
                    range: { slider: 2, inputText: 1 }
                }
            },

            folder: {
                space: { left: 10 },

                title: {
                    space: { left: 5, top: 2, bottom: 2 },
                    text: { fontSize: fontSize },
                    iconSize: 30,
                    background: { color: COLOR_DARK },

                    expandedIcon: {
                        color: COLOR_MAIN,
                    },
                },

                background: {
                    strokeColor: COLOR_DARK
                },

            },

            tab: {
                tab: {
                    space: { left: 3, right: 3, top: 3, bottom: 3 },

                    text: { fontSize: fontSize },
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_MAIN,
                        'active.color': COLOR_MAIN,
                    },

                },
                tabs: {
                    space: { item: 3 }
                },
                pages: {
                    fadeIn: 300
                },
            },

            separator: {
                height: 5,
                color: COLOR_DARK
            },

        },
    }
}

export default GetTweakStyle;