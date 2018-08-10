import api from '../../api/guide.js'
import util from '../../utils/util.js'


Page({

    data: {
        havesearch: 0,
        dishlist: [],
        hotKeys: [],
        tipkeys: [],
        input: [],
        history: []
    },

    onLoad: function () {
        this.getHisKeys()
    },


    /************输入时操作************/
    inputing: function (e) {
        var that = this
        var inputValue = e.detail.value
        var tipKey = []
        if (inputValue && inputValue.length > 0) {
            api.gettipkey({
                query: {
                    cont: inputValue
                },
                success(res) {
                    that.setData({
                        tipkeys: res.data.data,
                        input: inputValue,
                    });
                }
            })
        } else {
            that.setData({
                tipkeys: [],
                input: inputValue
            });
        }

    },

    /************历史记录相关**********/
    getHisKeys: function () {
        var value = [];
        try {
            value = wx.getStorageSync('historysearch')
            if (value) {
                this.setData({
                    history: value
                });
            }
        } catch (e) {
        }
    },
    AddHisKey: function (inValue) {
        var that = this
        if (!inValue || inValue.length == 0) {
            return;
        }
        var value = wx.getStorageSync('historysearch');
        if (value) {
            if (value.indexOf(inValue) < 0) {
                value.unshift(inValue);
            }
            wx.setStorage({
                key: "historysearch",
                data: value,
                success: function () {
                    that.getHisKeys();
                }
            })
        } else {
            value = [];
            value.push(inValue);
            wx.setStorage({
                key: "historysearch",
                data: value,
                success: function () {
                    that.getHisKeys();
                }
            })
        }
    },
    DeleteHistory: function () {
        var that = this
        wx.removeStorage({
            key: 'historysearch',
            success: function (res) {
                var value = [];
                that.setData({
                    history: value
                });
            }
        })
    },


    /*********搜索相关***************/
    directsearch: function (e) {
        this.setData({
            input: e.target.dataset.key
        })
        this.gosearch(e.target.dataset.key)
    },

    gosearch(params = {}) {
        var that = this
        var searchname = that.data.input
        if (searchname && searchname.length > 0) {

            //wx.showLoading()
            console.log(params)
            this.AddHisKey(searchname)
            api.getplace_bysearch({
                query: {
                    cont: that.data.input,
                },
                success(res) {
                    //  wx.hideLoading()
                    util.showBusy('正在搜索', 700)
                    that.setData({
                        havesearch: 1,
                        dishlist: res.data.data
                    })
                }
            })
        }
    },
    //地点都是
    gotodetail: function (e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../detail/detail?id=' + id,
            success: function (res) {

            },
            fail: function (res) {
                console.log("test")
            },

        })
    },

    //进入导航界面
    gotowalk: function (e) {
        var that = this;
        console.log(e)
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../navigation_walk/navigation?id=' + id,
            success: function (res) {

            },
            fail: function (res) {
            },
            complete: function (res) {
            },
        })
    },

    // gosearch: function (comvalue) {
    //   var that = this
    //   if (comvalue && comvalue.length > 0) {
    //     var value = comvalue
    //   } else {
    //     var value = this.data.input
    //   }
    //   util.showBusy('正在搜索', 700)
    //   if (value && value.length > 0) {
    //     this.AddHisKey(value)
    //     api.getdish_bysearch({
    //       query: {
    //         name: value,
    //         category:null,
    //         sort:  null,
    //         order:null ,
    //         price_mult: null,
    //         place_mult:  null,
    //       },
    //       success(res) {
    //         that.setData({
    //           havesearch: 1,
    //           dishlist: res.data
    //         })
    //       }
    //     })
    //     api.recordsearch({
    //       query: {
    //         content: value
    //       }
    //     })
    //   }
    // },


})
