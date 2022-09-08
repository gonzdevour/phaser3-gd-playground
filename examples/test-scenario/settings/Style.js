import { getOS } from '../../../plugins/utils/os/os.js';
//get OS status
var OS = getOS();
var fontFamilyName = OS.desktop?'DFKai-SB':'Noto Sans CJK';
var bitmapTextName = OS.desktop?'bf0':'bf1';

var Style = {
    bitmapTextName: bitmapTextName,
    bitmapTextSize: 32,
    fontFamilyName: fontFamilyName,
}

export default Style;