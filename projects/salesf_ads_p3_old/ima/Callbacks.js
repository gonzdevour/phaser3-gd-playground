var Callbacks = {
    onAdsManagerLoaded(adsManagerLoadedEvent) {
        // Get the ads manager.
        var adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        // videoContent should be set to the content video element.
        this.adsManager = adsManagerLoadedEvent.getAdsManager(this.adDisplayContainer, adsRenderingSettings);

        // Add listeners to the required events.
        this.adsManager.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            this.onAdError.bind(this));

        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
            this.onContentPauseRequested.bind(this));

        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
            this.onContentResumeRequested.bind(this));

        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            this.onAdEvent.bind(this));

        // Listen to any additional events, if necessary.
        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.LOADED,
            this.onAdEvent.bind(this));

        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.STARTED,
            this.onAdEvent.bind(this));

        this.adsManager.addEventListener(
            google.ima.AdEvent.Type.COMPLETE,
            this.onAdEvent.bind(this));
    },

    onAdEvent(adEvent) {
        // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
        // don't have ad object associated.
        var ad = adEvent.getAd();
        switch (adEvent.type) {
            case google.ima.AdEvent.Type.LOADED:
                // This is the first event sent for an ad - it is possible to
                // determine whether the ad is a video ad or an overlay.
                if (!ad.isLinear()) {
                    // Position AdDisplayContainer correctly for overlay.
                    // Use ad.width and ad.height.
                    //videoContent.play();
                }
                break;
            case google.ima.AdEvent.Type.STARTED:
                // This event indicates the ad has started - the video player
                // can adjust the UI, for example display a pause button and
                // remaining time.
                if (ad.isLinear()) {
                    // For a linear ad, a timer can be started to poll for
                    // the remaining time.
                    this.intervalTimer = setInterval(
                        function () {
                            var remainingTime = adsManager.getRemainingTime();
                        },
                        300); // every 300ms
                }
                break;
            case google.ima.AdEvent.Type.COMPLETE:
                // This event indicates the ad has finished - the video player
                // can perform appropriate UI actions, such as removing the timer for
                // remaining time detection.
                if (ad.isLinear()) {
                    clearInterval(this.intervalTimer);
                    this.topContainer.style.display = 'none';
                }
                break;
        }
    },

    onAdError(adErrorEvent) {
        // Handle the error logging.
        console.log(adErrorEvent.getError());
        //adsManager.destroy();
    },

    onContentPauseRequested() {
        //videoContent.pause();
        // This function is where you should setup UI for showing ads (e.g.
        // display ad timer countdown, disable seeking etc.)
        // setupUIForAds();
    },

    onContentResumeRequested() {
        //videoContent.play();
        // This function is where you should ensure that your UI is ready
        // to play content. It is the responsibility of the Publisher to
        // implement this function when necessary.
        // setupUIForContent();

    }
}

export default Callbacks;