var Play = function () {
    // Initialize the container. Must be done via a user action on mobile devices.
    //videoContent.load();
    this.adDisplayContainer.initialize();

    try {
        // Initialize the ads manager. Ad rules playlist will start at this time.
        console.log('adsManager.init');
        console.log('window.inner=' + window.innerWidth);
        console.log('window.inner=' + window.innerHeight);
        this.adsManager.init(window.innerWidth, window.innerHeight, google.ima.ViewMode.NORMAL);
        // Call play to start showing the ad. Single video and overlay ads will
        // start at this time; the call will be ignored for ad rules.
        this.adsManager.start();
    } catch (adError) {
        // An error may be thrown if there was a problem with the VAST response.
        //videoContent.play();
    }
    console.log('playAds');
}

export default Play;