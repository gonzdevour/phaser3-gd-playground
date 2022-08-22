//basic
import RexUI from '../../phaser3-rex-notes/templates/ui/ui-plugin.js';
import rexscaleouterplugin from '../../phaser3-rex-notes/plugins/scaleouter-plugin.js';
import LoadingProgressPlugin from '../../phaser3-rex-notes/plugins/loadingprogress-plugin.js';
//image
import TransitionImagePlugin from '../../phaser3-rex-notes/plugins/transitionimage-plugin.js';
//db
import CSVToHashTablePlugin from '../../phaser3-rex-notes/plugins/csvtohashtable-plugin.js';
//ui
import AnchorPlugin from '../../phaser3-rex-notes/plugins/anchor-plugin.js';
import ButtonPlugin from '../../phaser3-rex-notes/plugins/button-plugin.js';
//event
import AwaitLoaderPlugin from '../../phaser3-rex-notes/plugins/awaitloader-plugin.js';
import EventPromisePlugin from '../../phaser3-rex-notes/plugins/eventpromise-plugin.js';
//timer
import ClockPlugin from '../../phaser3-rex-notes/plugins/clock-plugin.js';
import AwayTimePlugin from '../../phaser3-rex-notes/plugins/awaytime-plugin.js';
import RealTimeTimersPlugin from '../../phaser3-rex-notes/plugins/realtimetimers-plugin.js';
//misc
import Live2dPlugin from '../../phaser3-rex-notes/dist/rexlive2dplugin.min.js';
import PerspectiveImagePlugin from '../../phaser3-rex-notes/plugins/perspectiveimage-plugin.js';
import CustomProgressPlugin from '../../phaser3-rex-notes/plugins/customprogress-plugin';
//text
import WebFontLoaderPlugin from '../../phaser3-rex-notes/plugins/webfontloader-plugin.js';
//fx
import WarpPipelinePlugin from '../../phaser3-rex-notes/plugins/warppipeline-plugin';

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
        {
            key: 'rexAwayTime',
            plugin: AwayTimePlugin,
            start: true
        },
        {
            key: 'rexRealTimeTimers',
            plugin: RealTimeTimersPlugin,
            start: true
        },
        {
            key: 'rexWebFontLoader',
            plugin: WebFontLoaderPlugin,
            start: true
        },
        {
            key: 'rexLive2dPlugin',
            plugin: Live2dPlugin,
            start: true
        },
        {
            key: 'rexAnchor',
            plugin: AnchorPlugin,
            start: true
        },
        {
            key: 'rexButton',
            plugin: ButtonPlugin,
            start: true
        },
        {
            key: 'rexPerspectiveImagePlugin',
            plugin: PerspectiveImagePlugin,
            start: true
        },
        {
            key: 'rexCustomProgressPlugin',
            plugin: CustomProgressPlugin,
            start: true
        },
        {
            key: 'rexWarppipelinePlugin',
            plugin: WarpPipelinePlugin,
            start: true
        },
        {
            key: 'rexTransitionImagePlugin',
            plugin: TransitionImagePlugin,
            start: true
        },
    ]
};