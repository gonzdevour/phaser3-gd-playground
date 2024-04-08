//basic
import RexUI from 'rexnote/templates/ui/ui-plugin.js';
import rexscaleouterplugin from 'rexnote/plugins/scaleouter-plugin.js';
import LoadingProgressPlugin from 'rexnote/plugins/loadingprogress-plugin.js';
import LayerManagerPlugin from 'rexnote/plugins/layermanager-plugin.js';
//image
import TransitionImagePlugin from 'rexnote/plugins/transitionimage-plugin.js';
//db
import CSVToHashTablePlugin from 'rexnote/plugins/csvtohashtable-plugin.js';
//ui
import AnchorPlugin from 'rexnote/plugins/anchor-plugin.js';
import ButtonPlugin from 'rexnote/plugins/button-plugin.js';
//viewport
import ViewportCoordinatePlugin from 'rexnote/plugins/viewportcoordinate-plugin.js';
//event
import AwaitLoaderPlugin from 'rexnote/plugins/awaitloader-plugin.js';
import EventPromisePlugin from 'rexnote/plugins/eventpromise-plugin.js';
//timer
import ClockPlugin from 'rexnote/plugins/clock-plugin.js';
import AwayTimePlugin from 'rexnote/plugins/awaytime-plugin.js';
import RealTimeTimersPlugin from 'rexnote/plugins/realtimetimers-plugin.js';
//special appearence
import Live2dPlugin from 'rexnote/dist/rexlive2dplugin.min.js';
import PerspectiveImagePlugin from 'rexnote/plugins/perspectiveimage-plugin.js';
import SpinnerPlugin from 'rexnote/templates/spinner/spinner-plugin.js';
//loading
import CustomProgressPlugin from 'rexnote/plugins/customprogress-plugin';
import LoadingAnimationScenePlugin from 'rexnote/plugins/loadinganimationscene-plugin';
//text
import WebFontLoaderPlugin from 'rexnote/plugins/webfontloader-plugin.js';
//fx
import WarpPipelinePlugin from 'rexnote/plugins/warppipeline-plugin';
//worksheet
import MarkedEventSheetsPlugin from 'rexnote/plugins/markedeventsheets-plugin.js';

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
            key: "rexSpinner",
            plugin: SpinnerPlugin,
            mapping: "rexSpinner",
        },
    ],
    global: [
        {
            key: 'rexLayerManager',
            plugin: LayerManagerPlugin,
            start: true
        },
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
        {
            key: 'rexViewportCoordinate',
            plugin: ViewportCoordinatePlugin,
            start: true
        },
        {
            key: 'rexMarkedEventSheets',
            plugin: MarkedEventSheetsPlugin,
            start: true
        },
        {
            key: 'rexLoadingAnimationScene',
            plugin: LoadingAnimationScenePlugin,
            start: true
        },
    ]
};