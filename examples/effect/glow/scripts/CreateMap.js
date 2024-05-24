import map from "./map";

var CreateMap = function(scene){
    var out = [];
    map.forEach(place => {
        var region = scene.add.image(place.x, place.y, place.key);
        scene.plugins.get('rexEffectProperties').add(region);
        region
            .setName('map_' + place.key)
            .setInteractive({
                pixelPerfect: true,
            })
            .on('pointerover', function(pointer, localX, localY, event){
                region.setDepth(1)
                region.glowColor = 0xffaaaa;
                region.glowOuterStrength = 5;
            })
            .on('pointerout', function(pointer, event){
                region.setDepth(0)
                region.glowColor = null;
            })
        out.push(region);

    });

    return out;
}

export default CreateMap;