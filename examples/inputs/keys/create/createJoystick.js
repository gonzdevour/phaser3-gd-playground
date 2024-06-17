import GetValue from "gdkPlugins/utils/object/GetValue.js";
import AngleToDirections from "gdkPlugins/utils/math/angle/angletodirections/AngleToDirections.js";
import VectorToCursorKeys from 'gdkPlugins/utils/input/VectorToCursorKeys';

var createJoystick = function (scene, layerName, vpxOffset, vpyOffset, vpx, vpy, config) {
  var analog = GetValue(config, "analog", false);
  var directionMode = GetValue(config, "directionMode", 1);
  var radius_circle = GetValue(config, "radius_circle", 100);
  var radius_thumb = GetValue(config, "radius_thumb", 30);
  var radius_diff = radius_circle - radius_thumb;

  var inputCircleBg = scene.add
    .circle(0, 0, radius_circle, 0xaaaaaa)
    .setStrokeStyle(5, 0xffffff, 1)
    .setAlpha(0.5)
    ._locate({ layerName: layerName, vpx: vpx, vpy: vpy, vpxOffset: vpxOffset, vpyOffset: vpyOffset });

  var inputCircleThumb = scene.add
    .circle(0, 0, radius_thumb, 0xaaaaaa)
    .setStrokeStyle(5, 0xffffff, 1)
    .setAlpha(1)
    ._locate({ layerName: layerName, vpx: vpx, vpy: vpy, vpxOffset: vpxOffset, vpyOffset: vpyOffset });

  var inputArea = scene.rexUI.add
    .roundRectangle(100, 100, 100, 100, 0, 0x0)
    .setOrigin(0, 0)
    .setAlpha(0.01)
    .setInteractive({
      draggable: true,
    })
    ._locate({ layerName: "clickArea", vpx: 0, vpy: 0 })
    .on("dragstart", function (pointer, dragX, dragY) {
      inputArea.controlCenterX = pointer.x;
      inputArea.controlCenterY = pointer.y;
    })
    .on("drag", function (pointer, dragX, dragY) {
      let p1 = { x: inputArea.controlCenterX, y: inputArea.controlCenterY };
      let p2 = { x: pointer.x, y: pointer.y };

      let dist = Phaser.Math.Distance.BetweenPoints(p1, p2);
      let polarDist = analog ? Phaser.Math.Clamp(dist, 0, radius_diff) : radius_diff;
      let rad = Phaser.Math.Angle.BetweenPoints(p1, p2);

      let deg = Number(Phaser.Math.RadToDeg(rad).toFixed())
      let dir = AngleToDirections(deg, directionMode); //angle, dirMode(0:UD, 1:LR, 2:4dir, 3:8dir)

      let polarX = polarDist * Math.cos(rad);
      let polarY = polarDist * Math.sin(rad);
      let toX = inputCircleBg.x + polarX;
      let toY = inputCircleBg.y + polarY;
      inputCircleThumb.setPosition(toX, toY);

      let dur = pointer.getDuration(); //取得累積拖曳時間
      //console.log(`dragDuration=${dur}`)
      inputArea.emit("goTo", deg, dir, dist, polarX, polarY);

      inputArea.stickAngle = deg;
      inputArea.stickDirection = dir;
      inputArea.stickDistance = dist;
      inputArea.stickPolarX = polarX;
      inputArea.stickPolarY = polarY

      inputArea.vector2CursorKeys.setVector(p1.x, p1.y, p2.x, p2.y);
    })
    .on("dragend", function (pointer, dragX, dragY, dropped) {
      inputCircleThumb.setPosition(inputCircleBg.x, inputCircleBg.y);

      inputArea.stickAngle = 0;
      inputArea.stickDirection = {left:false, right:false, up:false, down:false};
      inputArea.stickDistance = 0;
      inputArea.stickPolarX = 0;
      inputArea.stickPolarY = 0;

      inputArea.vector2CursorKeys.setVector(0,0,0,0);
    })
    .on("cursorLeft", function () {
        inputCircleThumb.setX(inputCircleBg.x-radius_diff);
    })
    .on("cursorRelease", function () {
        inputCircleThumb.setPosition(inputCircleBg.x, inputCircleBg.y);
    })

    inputArea.stickAngle = 0;
    inputArea.stickDirection = {left:false, right:false, up:false, down:false};
    inputArea.stickDistance = 0;
    inputArea.stickPolarX = 0;
    inputArea.stickPolarY = 0;

    inputArea.vector2CursorKeys = new VectorToCursorKeys({
        forceMin: 0
    })
    .setMode(1) //left or right

  scene.plugins.get("rexAnchor").add(inputArea, {
    //left: 'left+10',
    //top: 'top+10',
    width: "50%",
    height: "100%",
  });

  return inputArea;
};

export default createJoystick;
