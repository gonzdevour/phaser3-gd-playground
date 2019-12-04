import GetValue from '../../../../phaser3-rex-notes/plugins/utils/object/GetValue.js';

var Request = function (config) {
    var adTag = GetValue(config, 'adTag', '');
    var linearAdSlotWidth = GetValue(config, 'linearAdSlotWidth', window.innerWidth);
    var linearAdSlotHeight = GetValue(config, 'linearAdSlotHeight', window.innerHeight);
    var nonLinearAdSlotWidth = GetValue(config, 'nonLinearAdSlotWidth', window.innerWidth);
    var nonLinearAdSlotHeight = GetValue(config, 'nonLinearAdSlotHeight', window.innerHeight);

    // Request video ads.
    var adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = adTag;


    // Specify the linear and nonlinear slot sizes. This helps the SDK to
    // select the correct creative if multiple are returned.

    adsRequest.linearAdSlotWidth = linearAdSlotWidth;
    adsRequest.linearAdSlotHeight = linearAdSlotHeight;

    adsRequest.nonLinearAdSlotWidth = nonLinearAdSlotWidth;
    adsRequest.nonLinearAdSlotHeight = nonLinearAdSlotHeight;

    this.adsLoader.requestAds(adsRequest);
}

export default Request;