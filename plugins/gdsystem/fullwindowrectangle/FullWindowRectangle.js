import {
    FullWindowRectangle as FullWindowRectangleBase
} from '../../../../phaser3-rex-notes/templates/ui/ui-components.js'

class FullWindowRectangle extends FullWindowRectangleBase {
    get alpha() {
        return super.alpha;
    }

    set alpha(value) {
        super.alpha = value;
        this.renderFlags |= 2;
    }
}

export default FullWindowRectangle;