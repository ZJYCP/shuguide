import guide from '../../api/guide.js'
import util from '../../utils/util.js'
Page({
    data: {
        include_points: [],
        longitude: '121.393518',
        latitude: '31.316211',
        place: '',
        markers: '',
        markers_back: '',
        array: ['宝山', '延长', '嘉定'],
        index: 0,
        ischecked: false,
        count: '',
        placeclick: '大门',
        kindlist:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getkind(1)

    },


    // 获取初始数据
    onReady: function () {
        this.mapCtx = wx.createMapContext('myMap')
        var that = this
        guide.getplace({
            query: {
                kind: '101'
            },
            success: (res) => {
                // console.log(res)
                that.makefun(res);
            }
        })
    },

    getkind(campus){
        let that=this
        guide.getkind({
            query:{
                campus:campus
            },
            success:(res)=>{
                //console.log(res.data.data)
                that.setData({
                    kindlist:res.data.data
                })
        }
        })
    },

//获取地点数据
    getcatalog: function (e) {
        console.log(e)
        this.setData({placeclick: e.currentTarget.dataset.placeclick})
        let kind = parseInt(e.target.id)+1
        kind = kind < 10 ? '0' + kind : kind
        let campus=parseInt(this.data.index)+1
        kind=campus+''+kind
        //console.log(this.data.index)
        var that = this

        guide.getplace({
            query: {
                kind: kind
            },
            success: (res) => {
                that.makefun(res)
            }
        })
    },

    makefun(res) {
        let markerss = []
        let include_points = []
        this.setData({count: res.data.data.length})
        this.setData({place: res.data.data})
        for (let item of res.data.data) {
            let latitude = parseFloat(item.latitude);
            let longitude = parseFloat(item.longitude);
            let include_point = {
                latitude: latitude,
                longitude: longitude
            }
            let marker = this.createMarker(item);
            markerss.push(marker)
            include_points.push(include_point)
        }
        //console.log(include_points)
        this.setData({markers: markerss, include_points: include_points})
    },

    //设置地图上markers标记
    createMarker(point) {
        let latitude = point.latitude;
        let longitude = point.longitude;
        let marker = {
            iconPath: "../../images/marker.png",
            id: point.id || 0,
            latitude: latitude,
            longitude: longitude,
            width: 22,
            height: 32
        };
        return marker;
    },

    //校区改变
    bindPickerChange: function (e) {
        let that=this

        util.showBusy('正在切换',500)
        setTimeout(function () {
            that.setData({
                index: e.detail.value
            })
            let campus=parseInt(e.detail.value)+1
            that.getkind(campus)
            guide.getplace({
                query: {
                    kind: campus+'01'
                },
                success: (res) => {
                    that.makefun(res)
                }
            })

        },700)

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

    //向下折叠
    collapse(e) {
        var state = e.currentTarget.dataset.state;
        this.setData({
            ischecked: state ? false : true
        })
    },

    //地点搜索
    controltap() {
        wx.navigateTo({
            url: '../search/search'
        })
    },

    getmylocation() {
        var that = this
        this.mapCtx.moveToLocation()
    }
})
