var DefaultLayers = {
    layers: [
        { name: 'clickArea' },
        { name: 'bg', scrollFactor:1 }, //沒給cameraName的layer都由scene.cameras.main控制畫面，支援zoom
        { name: 'main', scrollFactor:1 },
        { name: 'ui', cameraName:'ui' }, //scrollFactor:0時依然會受到zoom的影響，所以ui需要dedicated cam而不能跟main放在一起
        { name: 'story', cameraName:'story' },
        { name: 'dialog', cameraName:'dialog' },
        { name: 'system', cameraName:'system' },
    ]
}

export default DefaultLayers;