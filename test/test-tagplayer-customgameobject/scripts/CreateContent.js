var content = `
<char.Spring=Spring,200,1000> //img, x, y

<wait=click>

<char.Jade=Jade,100,1000><char.Jade.jumpTo=850,1000,50> //x, y, jumpHeight

<wait=2000>

<char.Jade.talk>
[b]How[/b] are [color=red]you?[/color]

<wait=click>

<char.Spring.talk=50>
I'm fine, thank you. And you?

<wait=click>

<char.Spring.setExpression=shock,0>
<char.Spring.talk=50>
[size=48]What happened??[/size]

<wait=click>

<char.Spring.leave>
<wait=1000>
</char.Spring><wait=char.Spring>

//<wait=click>

<char.Jade.setExpression=fear,0>
<char.Jade.talk>
[color=red][size=64]AAAAAARG~~[/size][/color]

<wait=click>

<char.Jade.stopTalk>
<char.Jade.leave>
<wait=1000>
</char><wait=char>
`

export default content;