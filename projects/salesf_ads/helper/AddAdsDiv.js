const htmlString = `
<!-- ads div-->
<div id="mainContainer">
    <div id="content">
        <video id="contentElement">
            <source src="http://rmcdn.2mdn.net/Demo/vast_inspector/android.mp4">
            </source>
            <source src="http://rmcdn.2mdn.net/Demo/vast_inspector/android.webm">
            </source>
        </video>
    </div>
    <div id="adContainer"></div>
</div>
<button id="playButton">Play</button>
`;
var AddAdsDiv = function (scene, x, y) {
    var gameObject = scene.add.dom(x, y).createFromHTML(htmlString);
    return gameObject;
}

export default AddAdsDiv;