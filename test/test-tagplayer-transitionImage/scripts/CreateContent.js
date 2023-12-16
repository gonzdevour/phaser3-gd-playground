var content = `
// Comments : dude sprite

<sprite.Spring=Spring,normal,0>
<sprite.Spring.scaleX=-1>
<sprite.Spring.x=200>
<sprite.Spring.y=1000>

<sprite.Jade=Jade,normal,0>
<sprite.Jade.x=100><sprite.Jade.x.to=800,4000,Cubic>
<sprite.Jade.y=1000><sprite.Jade.y.yoyo=950,300,3>

<wait=2000>

<text.Jade> // wrapWidth, width, height
<text.Jade.x=600><text.Jade.x.to=500,1000,Cubic>
<text.Jade.y=400><text.Jade.y.to=330,1000,Cubic>
<text.Jade.alpha=0><text.Jade.alpha.to=1,2000,Linear>
//<text.Jade.text>//直接設定text，這條因為不會自動layout textbox，所以應該用typing=0取代
<text.Jade.typing=50>
[b]Hello[/b]\\n
[color=red]Phaser abcdefggggggggggggggggghhhhhhhhhhhhhhh[/color]\\n
World

<text.Spring>
<text.Spring.x=300>
<text.Spring.y=500>
<text.Spring.typing=0>
2nd text
<wait=click>
<sprite.Spring.setExpression=shock,0>
//<wait=sprite.dude.x></sprite.dude>
//</text>
// Wait until all sprites are fade out
//</sprite><wait=sprite>
`

export default content;