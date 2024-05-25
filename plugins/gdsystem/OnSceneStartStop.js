
import OnWindowResize from "gdkPlugins/utils/rwd/OnWindowResize";
import DefaultLayers from "./layer/DefaultLayers.js";

var OnSceneStart = function () {
    var scene = this.scene;

    // Camera, centerOn
    var camToCenterOn = scene.cameras.main//scene.cameras.getCamera(camToCenterOn_name)
    OnWindowResize(scene, function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
        if (camToCenterOn) {
            var prevCenterX = camToCenterOn.scrollX + (previousWidth / 2)
            var prevCenterY = camToCenterOn.scrollY + (previousHeight / 2)
            camToCenterOn.centerOn(prevCenterX, prevCenterY)
        }
    });

    // Viewport
    var viewport = this.viewport = this.scene.viewport = new Phaser.Geom.Rectangle(0, 0, 0, 0);
    var UpdateViewport = function () {
        var newviewport = scene.scale.getViewPort();
        viewport.setTo(0, 0, newviewport.width, newviewport.height);
    }
    OnWindowResize(scene, UpdateViewport);
    UpdateViewport();

    // LayerManager
    var layerManager = this.layerManager = scene.rexUI.add.layerManager(DefaultLayers);

    // vpRect <-- LayerManager, viewport
    var vpRect = this.vpRect = this.scene.vpRect = scene.rexUI.add.roundRectangle({
        //strokeColor: 0xff0000, strokeWidth: 10, radius: 10
    }).setOrigin(0);
    if (layerManager.has("ui")) {
        layerManager.addToLayer('ui', this.vpRect); //如果有ui layer的話，將vpRect加入ui layer
    }
    OnWindowResize(scene, function () {
        // viewport is updated at above callback
        vpRect.setSize(viewport.width, viewport.height)
    }, vpRect)
    vpRect.setSize(viewport.width, viewport.height)

    // ClickArea <-- layerManager
    if (layerManager.has("clickArea")) {
        var clickArea = this.clickArea = this.scene.clickArea = scene.rexUI.add.fullWindowRectangle(0x00ff00, 0.5)
            .setInteractive()
            .on("pointerup", function (pointer, localX, localY, event) {
                console.log("clickArea pointer up")
                scene.input.emit('pointerup.none', pointer, localX, localY, event)
            })

        layerManager.addToLayer('clickArea', clickArea);
    }
}

var OnSceneStop = function () {
}

export { OnSceneStart, OnSceneStop };