import map from "./map";

var CreateMap = function(scene){
    var out = [];
    map.forEach(place => {
        //console.log(place.key)
        var region = scene.add.image(0, 0, place.key);
        region
            .setName('map_' + place.key)
            ._locate({
            layerName: "bg",
            vpxOffset: scene.viewport.centerX-300 + place.x,
            vpyOffset: scene.viewport.centerY-200 + place.y,
            })
            .setInteractive({
                pixelPerfect: true,
            })
            .on('pointerover', function(pointer, localX, localY, event){
                region.bringMeToTop();
                region.glowColor = 0xffaaaa;
                region.glowOuterStrength = 5;
            })
            .on('pointerout', function(pointer, event){
                region.glowColor = null;
            })
        out.push(region);

    });
    return out;
}

export default CreateMap;