//index.js
var page = undefined;
Page({
  data: {
    barrageData: [],
    doomTextList: ['你好', '幸好有你']
  },
  onLoad: function () {
    page = this;
  },
  SendBarrage: function () {
    barrageList.push(new Barrage("你是我的小苹果", Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 40), getRandomColor()));
    this.setData({
      barrageData: barrageList
    })
  },
  onShow: function () {
    var doomTextList = this.data.doomTextList;
    for (var temp of doomTextList) {
      barrageList.push(new Barrage(temp, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 40), getRandomColor()));
      this.setData({
        barrageData: barrageList
      })
    }
  },
  
})
var barrageList = [];
var i = 0;
class Barrage {
  constructor(text, top, time, color) {
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    let that = this;
    this.id = i++;
    setTimeout(function () {
      barrageList.splice(barrageList.indexOf(that), 1);
      page.setData({
        barrageData: barrageList
      })
    }, this.time * 1000)
  }
}


/*弹幕字体颜色*/
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}