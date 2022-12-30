import { Toast } from "../../../phaser3-rex-notes/templates/ui/ui-components.js";

class TopToast extends Toast {
  constructor(scene, config) {
    super(scene, config);
  }
  bake(content) {
    this.scene.children.bringToTop(this);
    this.showMessage(content);
    this.bringToTop();
  }
}

export default TopToast;