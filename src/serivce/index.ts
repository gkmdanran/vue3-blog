import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import { ElMessage } from 'element-plus'
import Cookies from "js-cookie";
import router from '@/router'
const hyRequest = new HYRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptor: (config) => {
            config.headers!.Authorization = 'Bearer ' + (Cookies.get('blog_token') || '')
            return config
        },
        requestInterceptorCatch: (err) => {
            return err
        },
        responseInterceptor: (res) => {
            if (res.data.code == 401) {
                router.push('/')
            }
            if (res.data.msg) {
                ElMessage({
                    message: res.data.msg,
                    type: res.data.code == 200 ? 'success' : 'warning',
                    duration: 2000
                })
            }
            return res.data
        },
        responseInterceptorCatch: (err) => {
            return err
        }
    }
})

export default hyRequest
