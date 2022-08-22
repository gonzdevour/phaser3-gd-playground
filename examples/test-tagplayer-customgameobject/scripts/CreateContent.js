var content = `
<char.Spring=Spring,normal,0>
<char.Spring.setPosition=200,1000>

<char.Jade=Jade,normal,0>
<char.Jade.setPosition=100,1000>
<char.Jade.x.to=850,4000,Cubic><char.Jade.y.yoyo=950,300,3>

<wait=2000>

<char.Jade.talk>
[b]Hello[/b]\\n
[color=red]Phaser abcdefggggggggggggggggghhhhhhhhhhhhhhh[/color]\\n
World

<char.Spring.talk=50>
2nd text 2nd text 2nd text 2nd text
<wait=click>
<sprite.Spring.setExpression=shock,0>
//<wait=sprite.dude.x></sprite.dude>
//</text>
// Wait until all sprites are fade out
//</sprite><wait=sprite>
`

export default content;