var shortcuts = {

  建立UI: 
`BG
id=背景
  key=bg_transparent
  vpw=0.5
  vpy=0.5
  scaleMode=ENVELOP

TEXTBOX
id=對話框
vpw=0.9
height=300
vpy=0.95
alpha=0

對話框.to
  alpha=1
  wait=false`,

  顯示時間地點:
`TITLE
id=標示
vpx=-0.5
vpy=0
alpha=0
alignLeft=true
text0={{時間地點}}

標示.to
vpx=0
alpha=1
ease=Cubic
duration=2000`,

}

export default shortcuts;