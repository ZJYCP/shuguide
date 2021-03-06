//地图信息相关接口
const host = 'https://guide.emx6.com/shuguide/?service='
const wxRequest = (params, url) => {
    // wx.showToast({
    //   title: '加载中',
    //   icon: 'loading'
    // })
    wx.request({
        url: url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {
            'Content-Type': 'application/json'
        },
        success: (res) => {
            params.success && params.success(res)
            //wx.hideToast()
        },
        fail: (res) => {
            params.fail && params.fail(res)
        },
        complete: (res) => {
            params.complete && params.complete(res)
        }
    })
}
const getplace = (params) => wxRequest(params, host + 'Guide.getPlace&kind=' + params.query.kind)
const getdetail = (params) => wxRequest(params, host + 'Guide.getDetail&id=' + params.query.id)
const getmap = (params) => wxRequest(params, host + 'Guide.getMap&id=' + params.query.id)
const gettipkey = (params) => wxRequest(params, host + 'Guide.getTip&cont=' + params.query.cont)
const getplace_bysearch = (params) => wxRequest(params, host + 'Guide.getSearch&cont=' + params.query.cont)
const getkind = (params) => wxRequest(params, host + 'Guide.getKind&campus=' + params.query.campus)
const getnewslist = (params) => wxRequest(params, host + 'Default.getlist&type='+ params.query.type+'&page='+ params.query.page)

module.exports = {
    getplace,
    getdetail,
    getmap,
    gettipkey,
    getplace_bysearch,
    getkind,
    getnewslist

}
