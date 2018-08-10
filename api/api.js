//校园新闻API
const host = 'https://guide.emx6.com/shuguide/'
const wxRequest = (params, url) => {
    wx.request({
        url: url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {
            'Content-Type': 'application/json'
        },
        success: (res) => {
            params.success && params.success(res)
            // wx.hideToast()
        },
        fail: (res) => {
            params.fail && params.fail(res)
        },
        complete: (res) => {
            params.complete && params.complete(res)
        }
    })
}

const getVolsByMonth = (params) => wxRequest(params, host + '?service=Default.getMonth&month=' + params.query.month)
const getVolDetailById = (params) => wxRequest(params, host + '?service=Default.getdetail&id=' + params.query.id)

const getVolIdList = (params) => wxRequest(params, host + '?service=Default.getList')
const getVolById = (params) => wxRequest(params, host + '?service=Default.getdetail&id=' + params.query.id)

module.exports = {
    getVolById,
    getVolIdList,
    getVolsByMonth,
    getVolDetailById
}
