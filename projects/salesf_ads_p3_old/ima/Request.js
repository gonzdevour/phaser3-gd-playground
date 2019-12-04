var Request = function (adTagUrl) {
    // Request video ads.
    var adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl = adTagUrl;


    // Specify the linear and nonlinear slot sizes. This helps the SDK to
    // select the correct creative if multiple are returned.

    adsRequest.linearAdSlotWidth = window.innerWidth;
    adsRequest.linearAdSlotHeight = window.innerHeight;

    adsRequest.nonLinearAdSlotWidth = window.innerWidth;
    adsRequest.nonLinearAdSlotHeight = window.innerHeight;

    this.adsLoader.requestAds(adsRequest);
}

export default Request;