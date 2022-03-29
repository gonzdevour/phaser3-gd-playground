import RexUI from '../../phaser3-rex-notes/templates/ui/ui-plugin.js';
import rexscaleouterplugin from '../../phaser3-rex-notes/plugins/scaleouter-plugin.js';
import CSVToHashTablePlugin from '../../phaser3-rex-notes/plugins/csvtohashtable-plugin.js';
import AwaitLoaderPlugin from '../../phaser3-rex-notes/plugins/awaitloader-plugin.js';
import LoadingProgressPlugin from '../../phaser3-rex-notes/plugins/loadingprogress-plugin.js';
import EventPromisePlugin from '../../phaser3-rex-notes/plugins/eventpromise-plugin.js';
import ClockPlugin from '../../phaser3-rex-notes/plugins/clock-plugin.js';

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
    ],
    global: [
        {
            key: 'rexCsvToHashTable',
            plugin: CSVToHashTablePlugin,
            mapping: 'rexCsvToHashTable',
            start: true
        },
        {
            key: 'rexAwaitLoader',
            plugin: AwaitLoaderPlugin,
            start: true
        },
        {
            key: 'rexEventPromise',
            plugin: EventPromisePlugin,
            start: true
        },
        {
            key: 'rexLoadingProgress',
            plugin: LoadingProgressPlugin,
            start: true
        },
        {
            key: 'rexClock',
            plugin: ClockPlugin,
            start: true
        },
    ]
};