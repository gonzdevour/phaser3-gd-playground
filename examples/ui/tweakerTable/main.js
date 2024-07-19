import 'phaser/src/phaser';
import AllPlugins from 'gdkPlugins/AllPlugins.js';

const COLOR_MAIN = 0x4e342e; //#4e342e
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const FONT_SIZE = 32;

class Test extends Phaser.Scene
{
    preload ()
    {
        this.load.pack('pack', 'assets/pack.json');
    }

    create ()
    {
        var gridTable = CreateGridTable(this);
        var editor = CreateEditor(this);
        var panel = this.rexUI.add.splitPanels({
            x: 400, y: 300,
            width: 1000, height: 300,

            space: {
                item: 5
            },

            leftPanel: gridTable,
            rightPanel: editor,
            splitter: this.rexUI.add.roundRectangle(0, 0, 15, 1, 0, COLOR_DARK),

            minLeftPanelWidth: 200,
            minRightPanelWidth: 250,

            splitRatio: 0.5
        })

        var items = CreateItems(20); //建立資料array
        gridTable.setItems(items); //將資料array注入gridTable，並update內容

        gridTable.on('cell.up', function (cellContainer, cellIndex) {
            var item = gridTable.items[cellIndex];
            editor.setBindingTarget(item); //按下cell，editor綁定該cell的資料
        }, this)

        editor
            .addScrollable()
            .addRows([ //監看的$key與item的JSON key是對應的
                {
                    $key: 'name', title: 'Name', view: 'string',
                    onValueChange() { gridTable.setItems(items) } //雖然items的內容已經改變了，但gridTable顯示的name沒變，因此要setItems
                },
                { $key: 'description', title: 'Descr-\niption', view: 'textarea', height: 100 },
                { $key: 'a', view: 'number' },
                { $key: 'b', view: 'number' },
                { $key: 'c', view: 'boolean' },
                { $key: 'd', view: 'number' },
                { $key: 'e', view: 'number' },
                { $key: 'f', view: 'number' },
                { $key: 'g', view: 'number' },
                { $key: 'h', view: 'number' },
            ], false)

        panel
            .setOrigin(0,0)
            .layout()
            ._locate({layerName:"ui", vpx:0, vpy:0, vpxOffset:20, vpyOffset:20})

        var txtContent = 'Click item on left table to \nedit item data on right tweaker\nDrag split-bar to resize table and tweaker'
        this.gd.add.textLabel(txtContent, {layerName:"ui", vpx:0, vpy:1, vpxOffset:20, vpyOffset:-20, originX:0, originY:1 })
    }
    update ()
    {
    }
}

var CreateItems = function (amount) { //建立資料array，每筆資料為JSON
    var items = [];
    for (var i = 0; i < amount; i++) {
        items.push({
            name: `Item ${i}`,
            description: `Item ${i}`,
            a: 10 + i,
            b: 20 + i,
            c: false,
            d: 30 + i,
            e: 40 + i,
            f: 50 + i,
            g: 60 + i,
            h: 70 + i,
        })
    }
    return items;
}

var CreateGridTable = function (scene) {
    return scene.rexUI.add.gridTable({
        width: 300,

        scrollMode: 0,

        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, { bl: 10, tl: 10 }).setStrokeStyle(2, COLOR_LIGHT),

        table: {
            cellHeight: 40,
            columns: 1,
            mask: {
                padding: 1,
            },
            // enableLayer: true,
            reuseCellContainer: true,
        },

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 8, COLOR_DARK),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
        },

        space: { left: 10, right: 10, top: 10, bottom: 20, table: 10, },

        createCellContainerCallback: function (cell, cellContainer) {
            var scene = cell.scene,
                width = cell.width,
                height = cell.height,
                item = cell.item, //cellContainer的對應資料
                index = cell.index;
            if (cellContainer === null) { //每個cellContainer的組件
                cellContainer = scene.rexUI.add.label({
                    width: width,
                    height: height,

                    background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                    text: scene.add.text(0, 0, '', { fontSize: FONT_SIZE }),

                    space: {
                        left: 5, right: 5, top: 5, bottom: 5
                    }
                });
            }
            // Set properties from item value
            cellContainer.setMinSize(width, height); // Size might changed in this demo
            cellContainer.getElement('text').setText(item.name); // Set text of text object
            cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
            return cellContainer;
        },
    })
}

var CreateEditor = function (scene) {
    return scene.rexUI.add.tweaker({
        width: 300,

        styles: {
            space: { left: 10, right: 10, top: 10, bottom: 10, item: 3 },
            background: { radius: { br: 10, tr: 10 }, color: 0x0, strokeColor: COLOR_LIGHT, },
            
            inputRow: {
                height: 26,
                space: { left: 5, right: 5, top: 2, bottom: 2 },
                title: { space: { icon: 2 }, iconSize: 30, text: { fontSize: FONT_SIZE }, },
                inputText: {
                    background: { color: COLOR_DARK },
                    focusStyle: { color: COLOR_MAIN, },
                    style: { backgroundBottomY: 4, backgroundHeight: FONT_SIZE, fontSize: FONT_SIZE, },
                    cursorStyle: { color: 'black', backgroundColor: 'white', }
                },
                slider: {
                    track: { color: COLOR_DARK, height: 8, },
                    indicator: { color: COLOR_MAIN, height: 8, },
                    thumb: { color: COLOR_LIGHT, width: 16, height: 16, },
                },
                list: {
                    label: { space: { left: 5, right: 5 }, background: { color: COLOR_DARK, }, },
                    button: { 
                        space: { left: 5, right: 5, top: 8, bottom: 8 }, 
                        background: { color: COLOR_DARK, strokeColor: COLOR_LIGHT, 'hover.color': COLOR_LIGHT, }, 
                    },
                },
                button: {
                    background: { color: COLOR_DARK, strokeColor: COLOR_LIGHT, 'active.color': COLOR_LIGHT, },
                    text: { fontSize: FONT_SIZE }
                },
                checkbox: {
                    color: COLOR_LIGHT,
                    boxStrokeColor: COLOR_DARK,
                    uncheckedColor: COLOR_DARK,
                },
                colorInput: {
                    colorPicker: { background: { color: 0x0, strokeColor: COLOR_LIGHT }, },
                    colorComponents: {
                        inputText: {
                            background: { color: COLOR_DARK },
                            focusStyle: { color: COLOR_MAIN, },
                            style: { backgroundBottomY: 4, backgroundHeight: FONT_SIZE, fontSize: FONT_SIZE, },
                            cursorStyle: { color: 'black', backgroundColor: 'white', }
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
                    text: { fontSize: FONT_SIZE },
                    iconSize: 30,
                    background: { color: COLOR_DARK },
                    expandedIcon: { color: COLOR_MAIN, },
                },
                background: { strokeColor: COLOR_DARK },
            },

            tab: {
                tab: {
                    space: { left: 3, right: 3, top: 3, bottom: 3 },
                    text: { fontSize: FONT_SIZE },
                    background: { color: COLOR_DARK, strokeColor: COLOR_MAIN, 'active.color': COLOR_MAIN, },
                },
                tabs: { space: { item: 3 } },
                pages: { fadeIn: 300 },
            },
          
            scrollable: {
                space: { panel: 5 },
                slider: {
                    track: { color: COLOR_DARK, width: 16, radius: 8 },
                    thumb: { color: COLOR_LIGHT, width: 16, height: 16, radius: 8 }
                }
            },
          
            separator: {
                height: 5,
                color: COLOR_DARK
            },

        },
    })
}

var config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1024,
    height: 800,
    scale: {
        mode: Phaser.Scale.EXPAND,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    plugins: AllPlugins,
    scene: Test
};

const game = new Phaser.Game(config);