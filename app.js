//app.js

App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.showToast({
    //   title: '加载中',
    //   icon: "loading"
    // })
  },

})