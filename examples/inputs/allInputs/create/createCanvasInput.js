var createCanvasInput = function(scene, layerName, vpxOffset, vpyOffset, text, vpx, vpy){
  var txt = scene.add.rexCanvasInput({
    // Parameters of DynamicText
    width: 500, 
    height: 60,
    padding: 16,
    testString: '|MÉqgy回',
    background: {
        color: 0x000000,
        //color2: 0x333333,
        //horizontalGradient: true,
        //stroke: 0xffffff,
        strokeThickness: 3,
        cornerRadius: 6,
        //cornerIteration: 10,
        // Style when focus
        //'focus.color': 'red',
        //'focus.color2': 'green',
        'focus.stroke': 'white',
    },
    focusStyle: undefined,

    innerBounds: {
        color: null,
        color2: null,
        horizontalGradient: true,
        stroke: null,
        strokeThickness: 2
    },

    style: {
        bold: false,
        italic: false,
        fontSize: '32px',
        fontFamily: 'Courier',
        color: '#fff',
        stroke: '#fff',
        strokeThickness: 0,
        shadowColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        backgroundColor: null,
        backgroundHeight: undefined,
        backgroundBY: undefined,
        offsetX: 0,
        offsetY: 0,

        // Style when cursor move on
        'cursor.color': 'black', //被點到時的字的顏色
        'cursor.backgroundColor': 'white', //被點到時的字的背景色
        // 'cursor.xxx': ...
    },
    cursorStyle: undefined,

    childrenInteractive: false,

    text: text,

    wrap: {
        lineHeight: undefined,
        useDefaultLineHeight: true,
        maxLines: 1,
        wrapWidth: undefined,
        letterSpacing: 0,
        hAlign: 0,
        vAlign: 'center',  // For single line text input
        charWrap: true,    // For single line text input
    },

    textArea: false,

    // Parameters of hidden-text-editor   
    // inputType: 'text',  // 'text'|'password'|'textarea'|...                

    // readOnly: false,
    // maxLength: undefined,
    // minLength: undefined,
    // selectAll: false,

    // enterClose: true,

    // Callbacks
    // onOpen: function (textObject, hiddenInputText) {
    // },

    // onClose: function (textObject, hiddenInputText) {
    // },

    // onUpdate: function (text, textObject, hiddenInputText) {
    //     return text;
    // },   

    // onAddChar: function(child, index, canvasInput) {
    //    child.modifyStyle({...})
    // },

    // onCursorOut: function(child, cursorIndex, canvasInput) {
    //     child.modifyStyle({
    //         
    //     });
    // },

    // onCursorIn: function(child, cursorIndex, canvasInput) {
    //     child.modifyStyle({
    //         
    //     });
    // },

    // parseTextCallback: function(text) {
    //     return text;
    // }.

  })
  .setOrigin(0,0)
  ._locate({
    layerName: layerName,
    vpx: vpx,
    vpy: vpy,
    vpxOffset: vpxOffset,
    vpyOffset: vpyOffset,
  })

  return txt;
}

export default createCanvasInput;