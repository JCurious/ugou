import wepy from 'wepy'
const BASE_URL = 'https://www.zhengzhicheng.cn/api/public/v1'


wepy.basicToast = (title = '请求失败！', isSuccess = false) => ({
    title,
    icon: isSuccess ? 'success' : 'none',
    duration: 1500
})


/**
 * 发起get请求的API
 * @url 
 */

wepy.get = (url, data) => req(url, data)

wepy.post = (url, data) => req(url, data, true)

function req(url, data = {}, isPost = false) {
    return wepy.request({
        url: BASE_URL + url,
        data,
        method: isPost ? 'post' : 'get'
    })
}
