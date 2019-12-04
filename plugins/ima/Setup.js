import GetValue from '../../../phaser3-rex-notes/plugins/utils/object/GetValue.js';

var Setup = function (config) {
    var containerID = GetValue(config, 'containerID', 'adContainer');
    
    console.log('SetupIMA');
    // Create the ad display container.
    this.topContainer = document.getElementById(containerID);
    this.adDisplayContainer = new google.ima.AdDisplayContainer(this.topContainer);
    // Create ads loader.
    this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
    // Listen and respond to ads loaded and error events.
    this.adsLoader.addEventListener(
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        this.onAdsManagerLoaded.bind(this),
        false);

    this.adsLoader.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        this.onAdError.bind(this),
        false);

    // An event listener to tell the SDK that our content video
    // is completed so the SDK can play any post-roll ads.
    // var self= this;
    // var contentEndedListener = function () { self.adsLoader.contentComplete(); };
    //videoContent.onended = contentEndedListener;
}

export default Setup;