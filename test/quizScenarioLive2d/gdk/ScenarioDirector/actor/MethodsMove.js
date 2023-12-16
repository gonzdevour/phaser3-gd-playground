export default {
  jumpTo(x, y, jumpHeight) {
    this.scene.tweens.timeline({
      targets: this,
      ease: 'Cubic',
      tweens:[
          {
              props:{
                  x:{value: x, duration: 4000},
                  y:{value: y-jumpHeight, duration: 300, yoyo: true, repeat: 3},
              }, 
          },
      ],
    })
    return this;
  },

  toX(x, duration) {
    this.scene.tweens.add({
      targets: this,
      ease: 'Cubic',
      x: x, 
      duration: duration != undefined? duration:1500,
    })
    return this;
  },

  toY(y, duration) {
    this.scene.tweens.add({
      targets: this,
      ease: 'Cubic',
      y: y, 
      duration: duration != undefined? duration:1500,
    })
    return this;
  },

  fromX(x, duration) {
    this.scene.tweens.add({
      targets: this,
      ease: 'Cubic',
      x: {from: x, to: this.x}, 
      duration: duration != undefined? duration:1500,
    })
    return this;
  },

  fromY(y, duration) {
    this.scene.tweens.add({
      targets: this,
      ease: 'Cubic',
      y: {from: y, to: this.y}, 
      duration: duration != undefined? duration:1500,
    })
    return this;
  },

  toVPX(vpx, duration) {
    this.scene.tweens.add({
      targets: this,
      ease: 'Cubic',
      vpx: vpx, 
      duration: duration != undefined? duration:1500,
    })
    return this;
  },

  toVPY(vpy, duration) {
    this.scene.tweens.add({
      targets: this,
      ease: 'Cubic',
      vpy: vpy, 
      duration: duration != undefined? duration:1500,
    })
    return this;
  },

  fromVPX(vpx, duration) {
    this.scene.tweens.add({
      targets: this,
      ease: 'Cubic',
      vpx: {from: vpx, to: this.vpx}, 
      duration: duration != undefined? duration:1500,
    })
    return this;
  },

  fromVPY(vpy, duration) {
    this.scene.tweens.add({
      targets: this,
      ease: 'Cubic',
      vpy: {from: vpy, to: this.vpy}, 
      duration: duration != undefined? duration:1500,
    })
    return this;
  },

}