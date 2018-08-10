
const MONTH_MAP = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.','Jun.',
                          'Jul.', 'Aug.', 'Sep.', 'Otc.', 'Nov.', 'Dec.']

const filterContent = (string) => string.replace(/[\r\n]/g, "").replace(/<.*?>/g, "\n")

const formatMakettime = (dateString) => {
   return (new Date(dateString)).toString().split(' ', 4).slice(1, 4).join(' ')
}


const getDateList = () => {
  let begin = new Date('2017-01')
  let beginYear = begin.getFullYear()
  let beginMonth = begin.getMonth()

  let now = new Date()
  let nowYear = now.getFullYear()
  let nowMonth = now.getMonth()

  let dateList = [];
  for (let y = nowYear; y >= beginYear; y--) {
    for(let m = 11; m >= 0; m--) {
      dateList.push({
        title: MONTH_MAP[m] + y,
        value: y + '-' + '0'+(m + 1)
      })
    }
  }

  dateList = dateList.slice(11 - nowMonth, dateList.length - beginMonth)
  return dateList
}

// 显示繁忙提示
var showBusy = (text, dur) => wx.showToast({
    title: text,
    icon: 'loading',
    duration: dur
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
    })
}

module.exports = {
  getDateList,
  filterContent,
  formatMakettime, showBusy, showSuccess, showModel
}
