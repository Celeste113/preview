// pages/index/index.js
const animation = wx.createAnimation({
  duration: 800,
  timingFunction: 'ease',
});
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //红包列表
    interval: 5000,
    duration: 1000,
    circular: true,
    currentIndex: 0,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var localuserInfo = wx.getStorageSync('localuserInfo');
    if (localuserInfo == undefined || localuserInfo == "") {
      wx.reLaunch({
        url: '/pages/login/login',
      })
      return false
    }
    wx.showLoading({
      title: "加载中",
    });
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    this.getlist();
  },

  getlist: function () {
    let _this = this
    let openid = wx.getStorageSync('openid');
    let list = this.data.list;
    let data = {
      openid: openid,
    };
    wx.request({
      url: 'https://xcj.chaojichoujiang.com/api/yearOrder',
      data: data,
      success: function (res) {
        var dataList = res.data.data;
        for (var temp of dataList) {
          let startTime = app.Formate('yyyy-MM-dd hh:mm:ss', new Date(parseInt(temp.start_at) * 1000));
          temp.startTime = startTime
        }
        list = list.concat(dataList);
        _this.setData({
          list: list
        })
      }
    })
  },
  getDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/addIdiom/addIdiom?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  navTo() {
    wx.switchTab({
      url: '/pages/newIndex/newIndex',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})