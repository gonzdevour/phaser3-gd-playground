# Example

## Initialize

// 建立物件

BG
  id=Background
  key=classroom
  vpw=1
  vph=1
  scaleMode=FIT

TEXTBOX
  id=Dialog
  vpw=0.9
  height=300

SPRITE
  id=Jaina
  key=characters
  name=A
  expression=smile

SPRITE
  id=Momo
  key=characters
  name=B
  expression=smile

SPRITE
  id=May
  key=characters
  name=C
  expression=smile

CHOICE
  id=Choice
  width=#(choiceWidth)
  vpy=0.4


## Section A

// log印出結果

log.disable

log
  text=Test disable

log.enable

log
  text=Start...

// 物件屬性設定

BG.set
  scale=2

Jaina.set
  vpx=-1
  vpy=1
  scale=2

Momo.set
  vpx=-1
  vpy=1
  scale=2

May.set
  vpx=-1
  vpy=1
  scale=2

Dialog.set
  vpy=0.95
  alpha=0

Dialog.to
  alpha=0.8

// 音樂播放

bgm.play
  key=theme0

// 等待時間

wait
  time=300

// 鏡頭控制

camera.shake
  duration=500

camera.flash

// 物件位移

Jaina.to
  vpx=0.8
  ease=Back
  duration=2000
  wait=false

Momo.to
  vpx=0.2
  ease=Back
  duration=2000
  wait=false

May.to
  vpx=0.5
  ease=Back
  duration=2000
// Wait until tween complete

// 控制非Jaina的其他SPRITE物件
// !Jaina.to
//   alpha=0.5
//   duration=300
// Wait until tween complete

// 在markdown語法中，一行內由3個`包起來的會被parse為字串。但如果換行才包起來就不會。
// 因此以下指令第一行可以被解析為函數，第二行之後才會被plugin設定為text變數

```Jaina.say, displayName=神秘女子, name=A, expression=smile, icon=portraits
page test
Line1...
Line2...
Line3...
Line4...
Line5...
Line6...
Line7...
```

SPRITE.set
  tint=0x333333

```Dialog.typing, displayName=ME, icon=ico_user, speed=500
narration test~
```

// 測試角色切換

```Momo.say, displayName=Momo, name=B, expression=dizzy, icon=portraits
character transition(B-dizzy)
```

// 測試隨機表達式

setData
  randomNum=#( randomInt(1, 10) )

```Momo.say, displayName=Momo, name=B, expression=dizzy, icon=portraits
randomNum = {{randomNum}}
```

### [IF randomNum >= 3 && randomNum < 7]

```Momo.say, displayName=Momo, name=B, expression=dizzy, icon=portraits
{{randomNum}} (IF randomNum >= 3 && randomNum < 7)
```

### [ELSE IF randomNum < 3 || randomNum > 9]

```Momo.say, displayName=Momo, name=B, expression=dizzy, icon=portraits
{{randomNum}} (IF randomNum < 3 || randomNum > 9)
```

### [ELSE]

```Momo.say, displayName=Momo, name=B, expression=dizzy, icon=portraits
{{randomNum}} (7 or 8 or 9)
```

## Section B

// Test choice and IF-branch

setData
  hp=5
  coin=100

log.memory
  text=Befor choice

//選項功能

Choice.choice
  title=攸關全世界的命運...\n我應該如何抉擇？
  resultKey=choiceIndex
  option1=當然是冰淇淋。
  option2=是漢堡呦~(裝可愛~)
  option3=總之來一杯肥宅快樂水，\n換我一夜不傷悲。
// Wait until clicking any chioce button

log
  text=Select option[color=red]{{choiceIndex}}[/color]

### [IF choiceIndex == 1]

```Jaina.say, displayName=wonder girl, name=A, expression=smile, icon=portraits, typingSpeed=5000
今天……今天不方便……。
```

setData
  hp=#(hp+3)
  coin=#(coin-10)

### [IF choiceIndex == 2]

```Momo.say, displayName=queen spider, name=B, expression=confuse, icon=portraits, typingSpeed=500
這個熱量……太高了……不好意思。
```

incData
  hp=5
  coin=-10

### [IF choiceIndex == 3]

```May.say, displayName=Janet van Dyne, name=C, expression=shock, icon=portraits, typingSpeed=500
沒想到……你竟然是這種人！ ……再見了。
```

incData
  hp=10
  coin=-20

## Section C

log.memory
  text=After choice

```Jaina.say, displayName=wonder girl, name=A, expression=smile, icon=portraits
wait click or wait 5 sec
```

SPRITE.set
  tint=0xffffff

wait
  time=5000
  click
// Wait until 3s or any touch

se.play
  key=explosion
  wait
// Wait until playing se complete

SPRITE.cross
  expression=dizzy

bgm.cross
  key=theme1

wait
  time=200

Background.cross
  key=road
  mode=irisOut

wait
  time=200

// 將角色移出畫面外
SPRITE.to
  vpx=-1
// Wait until tween complete

// 控制對話框所在的layer
TEXTBOX.to
  alpha=0
// Wait until ui layer fade-out

bgm.stop

