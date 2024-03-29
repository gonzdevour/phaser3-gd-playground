const COLOR_PRIMARY = 0x474747; //#474747
const COLOR_LIGHT = 0x8f8f8f; //#8f8f8f
const COLOR_DARK = 0x222222; //#222222

var CreateModelMenu = function (scene, config) {
  var items = [
    {
      name: "AA",
      children: [
        {
          name: "AA-0",
          children: [{ name: "AA-00" }, { name: "AA-01" }, { name: "AA-02" }],
        },
        {
          name: "AA-1",
          children: [{ name: "AA-10" }, { name: "AA-11" }, { name: "AA-12" }],
        },
        {
          name: "AA-2",
          children: [{ name: "AA-20" }, { name: "AA-21" }, { name: "AA-22" }],
        },
      ],
    },
    {
      name: "BB",
      children: [{ name: "BB-0" }, { name: "BB-1" }, { name: "BB-2" }],
    },
    {
      name: "CC",
      children: [{ name: "CC-0" }, { name: "CC-1" }, { name: "CC-2" }],
    },
  ];

  var scene = scene;
  scene.print = scene.add.text(0, 0, "");
  var menu = CreateMenu(scene, 0, 0, items, function (button) {
    scene.print.text += "Click " + button.text + "\n";
  });

  scene.input.on( "pointerdown", function (pointer) {
    if (!menu.isInTouching(pointer)) {
          menu.collapseSubMenu();
          scene.print.text = "";
    }
  }, scene);

  return menu;
};

var CreateMenu = function (scene, x, y, items, onClick) {
  var exapndOrientation = 'y';
  var easeOrientation = 'y';

  var menu = scene.rexUI.add.menu({
      x: x,
      y: y,
      orientation: exapndOrientation,
      //anchor: { left: 'left+10', bottom: 'bottom-10', right: 'right-10', top: 'top+10'},
      //anchor: { left: 'left+10', bottom: 'bottom-10'},
      space: { item: 10 },
      // subMenuSide: 'right',

      items: items,
      createButtonCallback: function (item, i, items) {
          return scene.rexUI.add.label({
              background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
              text: scene.add.text(0, 0, item.name, { fontSize: '48px', padding: 6}),
              icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
              space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10 },
          })
      },
      // expandEvent: 'button.over'
  });

  menu
      .on('button.over', function (button) {
          button.getElement('background').setStrokeStyle(3, 0xffffff);
      })
      .on('button.out', function (button) {
          button.getElement('background').setStrokeStyle();
      })
      .on('button.click', function (button) {
          onClick(button);
      })

  return menu;
}

export default CreateModelMenu;
