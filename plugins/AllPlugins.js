import RexUI from '../../phaser3-rex-notes/templates/ui/ui-plugin.js';
import rexscaleouterplugin from '../../phaser3-rex-notes/plugins/scaleouter-plugin.js';
import CSVToHashTablePlugin from '../../phaser3-rex-notes/plugins//csvtohashtable-plugin.js';

export default {
    scene: [
        {
            key: 'rexUI',
            plugin: RexUI,
            mapping: 'rexUI'
        },
        {
            key: 'rexScaleOuter',
            plugin: rexscaleouterplugin,
            mapping: 'rexScaleOuter'
        },
        {
            key: 'rexCsvToHashTable',
            plugin: CSVToHashTablePlugin,
            mapping: 'rexCsvToHashTable',
            start: true
        },
    ]
};