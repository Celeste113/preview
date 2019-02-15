Page({
  data: {
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545220114942&di=3bf52981626b3cc290dd684df29e714c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8b82b9014a90f6038de2556a3212b31bb051ed4a.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545220114942&di=3bf52981626b3cc290dd684df29e714c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8b82b9014a90f6038de2556a3212b31bb051ed4a.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545220114942&di=3bf52981626b3cc290dd684df29e714c&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8b82b9014a90f6038de2556a3212b31bb051ed4a.jpg'
    ],
    interval: 5000,
    duration: 1000,
    circular: true,
    leftMargin: '80rpx',
    rightMargin: '80rpx',
    currentIndex: 0,
    interval2: 1500,
    topMargin:'190rpx',
  },
  handleChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
})