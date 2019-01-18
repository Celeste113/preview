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
    bindId: 0, //滑动ID  
    startX: 0, //滑动开始横坐标
    startY: 0, //滑动开始纵坐标
    right: true, //记录滑动方向
    top: true, //记录滑动方向
    animationData: {}, //动画
    count: 0,
    hidebox: {},
    move: true,
    first: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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

  getlist: function() {
    let that = this,
      openid = wx.getStorageSync('openid'),
      list = [],
      data = {
        openid: openid,
      };
    wx.request({
      url: 'https://xcj.chaojichoujiang.com/api/yearOrder',
      data: data,
      success: function(res) {
        list = res.data.data;
        for (var temp of list) {
          let startTime = app.Formate('yyyy-MM-dd hh:mm:ss', new Date(parseInt(temp.start_at) * 1000));
          temp.startTime = startTime;
          console.log(temp)
        }
        that.setData({
          list: list
        })
        console.log(list);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  handleTouchStart: function(event) {
    this.data.startX = event.changedTouches[0].clientX;
    this.data.startY = event.changedTouches[0].clientY;
  },
  handleTouchEnd: function(e) {
    let x = e.changedTouches[0].clientX,
      y = e.changedTouches[0].clientY,
      startX = this.data.startX,
      startY = this.data.startY,
      translateX = 0,
      translateY = 0;
    let xMove = x - startX; //滑动距离
    let yMove = y - startY; //滑动距离
    if (xMove == 0 && yMove == 0) {
      return false; //没有移动只是点击
    }
    if (xMove < 0) { //左移
      translateX = -600;
    } else {
      translateX = 600;
    }
    if (yMove < 0) { //上滑
      translateY = -200
    } else {
      translateY = 600
    }
    if (!this.data.move) { /*如果move为false,阻止下次动画 */
      wx.showToast({
        title: '正在切换中',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    let list = this.data.list,
      id = e.currentTarget.dataset.id;
    this.setData({
      bindId: id,
      move: false
    })
    this.animation = animation;
    animation.translateX(translateX).translateY(translateY).rotate(45).step();
    if (id == 'first') {
      this.setData({
        hidebox: animation.export(),
        move: true
      })
      let that = this;
      setTimeout(() => {
        that.setData({
          first: false
        })
      }, 800)
      return false
    } else {
      animation.translateX(0).translateY(0).rotate(0).step({
        duration: 0
      });
      this.setData({
        animationData: animation.export(),
      });
    }
  },
  updateList: function(event) {
    let list = this.data.list;
    let delValue = list.shift();
    list.push(delValue);
    this.setData({
      list: list,
      bindId: '',
    });
    let that=this;
    setTimeout(function(){
      that.setData({ move: true})
    },200)
  },
  navTo: function() {
    wx.switchTab({
      url: '/pages/newIndex/newIndex',
    })
  },
  getDetail: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/addIdiom/addIdiom?id=' + id,
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})