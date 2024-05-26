//basic
import RexUI from 'rexnote/templates/ui/ui-plugin.js';
import GDSystemPlugin from 'gdkPlugins/gdsystem/gdsystem-plugin.js';
//loading
import LoadingProgressPlugin from 'rexnote/plugins/loadingprogress-plugin.js';
import CustomProgressPlugin from 'rexnote/plugins/customprogress-plugin';
import LoadingAnimationScenePlugin from 'rexnote/plugins/loadinganimationscene-plugin';
//layer
import LayerManagerPlugin from 'rexnote/plugins/layermanager-plugin.js';
//ui
import AnchorPlugin from 'rexnote/plugins/anchor-plugin.js';
import ButtonPlugin from 'rexnote/plugins/button-plugin.js';
//image
import TransitionImagePlugin from 'rexnote/plugins/transitionimage-plugin.js';
//viewport
import rexscaleouterplugin from 'rexnote/plugins/scaleouter-plugin.js';
import ViewportCoordinatePlugin from 'rexnote/plugins/viewportcoordinate-plugin.js';
//await
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
//text
import WebFontLoaderPlugin from 'rexnote/plugins/webfontloader-plugin.js';
//fx
import WarpPipelinePlugin from 'rexnote/plugins/warppipeline-plugin';
import GlowFilterPipelinePlugin from 'rexnote/plugins/glowfilter2pipeline-plugin.js';
import EffectPropertiesPlugin from 'rexnote/plugins/effectproperties-plugin.js';
//db
import CSVToHashTablePlugin from 'rexnote/plugins/csvtohashtable-plugin.js';
//worksheet
import MarkedEventSheetsPlugin from 'rexnote/plugins/markedeventsheets-plugin.js';
//input
import MouseWheelScrollerPlugin from 'rexnote/plugins/mousewheelscroller-plugin.js';
import GesturesPlugin from 'rexnote/plugins/gestures-plugin.js';
import CanvasInputPlugin from 'rexnote/plugins/canvasinput-plugin.js';

export default {
    scene: [
        { key: 'rexUI', plugin: RexUI, mapping: 'rexUI' },
        { key: 'gd', plugin: GDSystemPlugin, mapping: 'gd' },
        //{ key: 'rexScaleOuter', plugin: rexscaleouterplugin, mapping: 'rexScaleOuter' },
        { key: "rexSpinner", plugin: SpinnerPlugin, mapping: "rexSpinner", },
        { key: 'rexGestures', plugin: GesturesPlugin, mapping: 'rexGestures' },
    ],
    global: [
        { key: 'rexLayerManager', plugin: LayerManagerPlugin, start: true },
        { key: 'rexCsvToHashTable', plugin: CSVToHashTablePlugin, mapping: 'rexCsvToHashTable', start: true },
        { key: 'rexAwaitLoader', plugin: AwaitLoaderPlugin, start: true },
        { key: 'rexEventPromise', plugin: EventPromisePlugin, start: true },
        { key: 'rexLoadingProgress', plugin: LoadingProgressPlugin, start: true },
        { key: 'rexClock', plugin: ClockPlugin, start: true },
        { key: 'rexAwayTime', plugin: AwayTimePlugin, start: true },
        { key: 'rexRealTimeTimers', plugin: RealTimeTimersPlugin, start: true },
        { key: 'rexWebFontLoader', plugin: WebFontLoaderPlugin, start: true },
        { key: 'rexLive2dPlugin', plugin: Live2dPlugin, start: true },
        { key: 'rexAnchor', plugin: AnchorPlugin, start: true },
        { key: 'rexButton', plugin: ButtonPlugin, start: true },
        { key: 'rexPerspectiveImagePlugin', plugin: PerspectiveImagePlugin, start: true },
        { key: 'rexCustomProgressPlugin', plugin: CustomProgressPlugin, start: true },
        { key: 'rexWarppipelinePlugin', plugin: WarpPipelinePlugin, start: true },
        { key: 'rexGlowFilterPipeline', plugin: GlowFilterPipelinePlugin, start: true },
        { key: 'rexEffectProperties', plugin: EffectPropertiesPlugin, start: true },
        { key: 'rexTransitionImagePlugin', plugin: TransitionImagePlugin, start: true },
        { key: 'rexViewportCoordinate', plugin: ViewportCoordinatePlugin, start: true },
        { key: 'rexMarkedEventSheets', plugin: MarkedEventSheetsPlugin, start: true },
        { key: 'rexLoadingAnimationScene', plugin: LoadingAnimationScenePlugin, start: true },
        { key: 'rexMouseWheelScroller', plugin: MouseWheelScrollerPlugin, start: true },
        { key: 'rexCanvasInputPlugin', plugin: CanvasInputPlugin, start: true },
    ]
};