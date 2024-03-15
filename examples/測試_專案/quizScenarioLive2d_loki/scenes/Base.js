import PixelationEffect from '../effects/PixelationEffect.js';

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

            onStart(fromScene, toScene, duration) {
                console.log(`${fromScene.sys.settings.key} to ${toScene.sys.settings.key}`)
                PixelationEffect(toScene, duration);
            },
        });
    }
}

export default Base;