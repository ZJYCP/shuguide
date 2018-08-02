var amapFile = require('../../utils/amap-wx.js');
var config = require('../../utils/config.js');

Page({
  data: {
    steps: {}
  },
  onLoad: function(options) {
    let destination=options.destination;
    let origin=options.origin;
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getWalkingRoute({
      origin: origin,
      destination: destination,
      success: function(data){
        if(data.paths && data.paths[0] && data.paths[0].steps){
          that.setData({
            steps: data.paths[0].steps
          });
        }
          
      },
      fail: function(info){

      }
    })
  }
})