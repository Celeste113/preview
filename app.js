//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || [],    userInfo = wx.getStorageSync('userInfo') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // if (userInfo==''){
    //   wx.navigateTo({
    //     url: '/pages/login/login',
    //   })
    // }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
   Formate: function (formate, obj) {
    var agrs = {
      "M+": obj.getMonth() + 1, //月份 
      "d+": obj.getDate(), //日 
      "h+": obj.getHours(), //小时 
      "m+": obj.getMinutes(), //分 
      "s+": obj.getSeconds(), //秒 
      "q+": Math.floor((obj.getMonth() + 3) / 3), //季度 
      "S": obj.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(formate)) formate = formate.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in agrs)
      if (new RegExp("(" + k + ")").test(formate))
        formate = formate.replace(RegExp.$1, (RegExp.$1.length == 1) ? (agrs[k]) : (("00" + agrs[k]).substr(("" + agrs[k]).length)));
    return formate;
  },
})