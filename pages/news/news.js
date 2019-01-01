//news.js
var api = require('../../api/guide.js')
//获取应用实例
var app = getApp();
Page({
  data: {
    page: 0,
    list: [
      { id: 0, type: 'all', name: '头条'},
      { id: 1, type: 'notice', name: '通知公告'},
      { id: 2, type: 'news', name: '综合新闻'},
      { id: 3, type: 'research', name: '科研动态'},
      { id: 4, type: 'report', name: '学术讲座' },
    ],
    'active': {
      id: 0,
      type: 'all',
      data: [],
      showMore: true,
      remind: '上滑加载更多'
    },
    loading: false,
    disabledRemind: false
  },
  onLoad: function(){

    this.getNewsList(0);
  },
  //下拉更新
  onPullDownRefresh: function(){
    var _this = this;
    _this.setData({
      'loading': true,
      'active.data': [],
      'active.showMore': true,
      'active.remind': '上滑加载更多',
      'page': 0
    });
    _this.getNewsList();
  },
  //上滑加载更多
  onReachBottom: function(){
    var _this = this;
    if(_this.data.active.showMore){
      _this.getNewsList(_this.data.active.id);
    }
  },
  //获取新闻列表
  getNewsList: function(typeid){
      let that=this
    api.getnewslist({
        query:{
          type:that.data.list[typeid].type,
            page:this.data.page
        },
        success(res){
          console.log(res)
            if(res.data.data.length<12){
              let remind='到底啦'
                that.setData({
                    'active.data':that.data.active.data.concat(res.data.data),
                    'active.remind':remind
                })
            }else {
                that.setData({
                    'active.data':that.data.active.data.concat(res.data.data),
                    page:that.data.page+1
                })
            }

        }
    })

  },
  //获取焦点
  changeFilter: function(e){
    this.setData({
      'active': {
        'id': e.target.dataset.id,
        'type': e.target.id,
        data: [],
        showMore: true,
        remind: '上滑加载更多'
      },
      'page': 0
    });
    this.getNewsList(e.target.dataset.id);
  },

});
