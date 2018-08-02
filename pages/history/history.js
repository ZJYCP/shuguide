var util = require('../../utils/util.js')
Page({
  data: {
    dateList: [],
  },
  onLoad: function (options) {

    let dateList = util.getDateList()
    console.log(dateList)
    this.setData({

      dateList: dateList
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '往期列表'
    })
  },
  getMonthly: function (e) {
    let month = e.target.dataset.month
    let title = e.target.dataset.title
    //console.log(e)
    let page = this.data.page
    wx.navigateTo({
      url: `../school/monthly/monthly?title=${title}&month=${month}`
    })
  }
})