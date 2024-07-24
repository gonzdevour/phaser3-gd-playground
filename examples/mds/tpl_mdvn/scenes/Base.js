import { cameraFadeOut, cameraFadeIn } from "../effects/cameraFade";

class Base extends Phaser.Scene {
    get debugMode() {
        return true;
    }
    get loggerStyle(){
        var style = {
            width: "80%",
            height: "30%",
            fontSize: Math.round(window.innerWidth / 20) + "px",
            backgroundColor: "Navy",
            opacity: 0.7,
            active: this.debugMode,
        }
        return style;
    }
    drawBounds(sizer, color) {
        if (this.debugMode) {
            if (this.boundsDrawer == undefined){
                this.boundsDrawer = this.add.graphics();
            }
            if (color == undefined) {
                color = 0xff0000;
            }
            this.boundsDrawer.clear();
            return sizer.drawBounds(this.boundsDrawer, color)
        }
    }
    log(msg) {
        if (this.debugMode) {
            console.log(msg);
        }
    }
    transitionTo(sceneKey, duration) {
        this.log(`transition to ${sceneKey}`)

        this.scene.transition({
            target: sceneKey,
            duration: duration,
            moveBelow: true,
            onStart(fromScene, toScene, duration) {
                fromScene.cameras.getCamera("system").fadeOut(duration * 0.5);
                toScene.time.delayedCall(duration * 0.5, function () {
                    fromScene.scene.setVisible(false);    // fromScene is above toScene
                    toScene.cameras.getCamera("system").fadeIn(duration * 0.5);
                })
            }
        });
    }
}

export default Base;