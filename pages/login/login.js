var app = getApp();
Page({
  data: {

  },
  onGotUserInfo: function(e) {
    var that = this;
    var that2 = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorageSync('localuserInfo', e.detail.userInfo);
      console.log(app.globalData.userInfo)
      console.log(e.detail.encryptedData,e.detail)
    }
  },
})