var content = `
// Comments : dude sprite
<sprite.dude=dude>
<sprite.dude.x=100><sprite.dude.x.to=700,5000,Cubic>
<sprite.dude.y=300><sprite.dude.y.yoyo=100,300,-1>

// knight sprite
<sprite.knight.play=idle,guard>
<sprite.knight.x=400><sprite.knight.y=300>

<wait=1000>

<text.a> // wrapWidth, width, height
<text.a.x=100><text.a.x.to=300,1000,Cubic>
<text.a.y=100>
//<text.a.text>
<text.a.typing=100>
Hello\\n
Phaser\\n
World

<text.b>
<text.b.x=300>
<text.b.y=500>
<text.b.text>
2nd text
<wait=click>
<wait=sprite.dude.x></sprite.dude>
<sprite.knight.stop>

</text>
// Wait until all sprites are fade out
</sprite><wait=sprite>
`

export default content;