import api from '../../api/api.js'

Page({
    data: {
        vols: [],
        current: 0,
        Height: ''
    },
    //获取信息列表
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    Height: res.windowHeight
                })

            },
        })
        wx.showToast({
            title: '加载中',
            icon: 'loading'
        })
        api.getVolIdList({
            success: (res) => {
                if (res.data.ret === 200) {
                    let idList = res.data.data
                    this.getVols(idList)
                }
            }
        })
    },
    //获取通知数据
    getVols: function (idList) {
        let vols = this.data.vols

        if (idList.length > 0) {
            api.getVolById({
                query: {
                    id: idList.shift()
                },
                success: (res) => {
                    if (res.data.ret === 200) {
                        let vol = res.data.data

                        //vol.hp_makettime = util.formatMakettime(vol.hp_makettime)
                        vols.push(vol)

                    }
                    this.getVols(idList)
                }
            })
        } else {
            this.setData({
                vols
            })
        }
    },
    handleChange: function (e) {
        let current = e.detail.current
        let volsLength = this.data.vols.length

        if (current === volsLength) {
            this.setData({
                current: volsLength
            })
            wx.navigateTo({
                url: '../history/history?page=index',
                success: () => {
                    this.setData({
                        current: volsLength - 1
                    })
                }
            })
        }
    }
})
