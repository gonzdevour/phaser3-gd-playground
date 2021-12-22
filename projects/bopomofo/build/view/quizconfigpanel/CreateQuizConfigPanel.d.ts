import { Sizer } from '../../../../../../phaser3-rex-notes/templates/ui/ui-components';

export default CreateQuizConfigPanel;

declare namespace CreateQuizConfigPanel {
    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,
        radio?: {
            database?: string,
            enhancement?: string,
            mode?: string
        }
    }
}

declare var CreateQuizConfigPanel: (
    scene: Phaser.Scene,
    config?: CreateQuizConfigPanel.IConfig
) => Sizer