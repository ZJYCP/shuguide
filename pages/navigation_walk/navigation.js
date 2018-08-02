var amapFile = require('../../utils/amap-wx.js');
var config = require('../../utils/config.js');
var guide = require('../../api/guide.js')

Page({
  data: {
    markers: [{
      iconPath: "../../images/mapicon_navi_s.png",
      id: 0,
      latitude: '',
      longitude: '',
      width: 23,
      height: 33
    }, {
      iconPath: "../../images/mapicon_navi_e.png",
      id: 0,
      latitude: '',
      longitude: '',
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: [],
    destination: '',
    origin: ''
  },

  //接收终点的位置
  onLoad: function (options) {
    var that = this;
    var destinations;
    guide.getmap({
      query: {
        id: options.id
      },
      success:(res)=>{
        let location=res.data.data;
        that.setData({ 'markers[1].latitude': location.latitude, 'markers[1].longitude': location.longitude });
        destinations = location.destination;
        that.setData({ destination: destinations })
      }
    })

    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
//获取起始位置并规划路径
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        let origins = res.longitude + ',' + res.latitude;
        that.setData({ 'markers[0].latitude': res.latitude, 'markers[0].longitude': res.longitude },
          that.setData({ origin: origins })
        )
        myAmapFun.getWalkingRoute({
          origin: origins,
          destination: destinations,
          success: function (data) {
            var points = [];
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              var steps = data.paths[0].steps;
              for (var i = 0; i < steps.length; i++) {
                var poLen = steps[i].polyline.split(';');
                for (var j = 0; j < poLen.length; j++) {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1])
                  })
                }
              }
            }
            that.setData({
              polyline: [{
                points: points,
                color: "#0091ff",
                width: 6
              }]
            });
            if (data.paths[0] && data.paths[0].distance) {
              that.setData({
                distance: data.paths[0].distance + '米'
              });
            }
            if (data.paths[0] && data.paths[0].duration) {
              that.setData({
                cost: parseInt(data.paths[0].duration / 60) + '分钟'
              });
            }

          },
          fail: function (info) {

          }
        })
      }
    });


  }


})