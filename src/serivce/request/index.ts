import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'

const DEAFULT_LOADING = false

class HYRequest {
    instance: AxiosInstance
    interceptors?: HYRequestInterceptors
    showLoading: boolean
    loading?: ILoadingInstance

    constructor(config: HYRequestConfig) {
        this.instance = axios.create(config)
        this.showLoading = config.showLoading ?? DEAFULT_LOADING
        this.interceptors = config.interceptors

        // 实例传入的拦截器
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        )

        // 添加所有的实例都有的拦截器
        this.instance.interceptors.request.use(
            (config) => {
                if (this.showLoading) {
                    this.loading = ElLoading.service({
                        lock: true,
                        text: '正在请求数据....',
                        background: 'rgba(0, 0, 0, 0.5)'
                    })
                }
                return config
            },
            (err) => {
                return err
            }
        )
        this.instance.interceptors.response.use(
            (res) => {
                this.loading?.close()
                return res
            },
            (err) => {
                this.loading?.close()
                return err
            }
        )
    }

    request<T>(config: HYRequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            //单个请求对请求config的处理
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config)
            }
            if (config.showLoading === true) {
                this.showLoading = true
            }else{
                this.showLoading = false
            }
            this.instance
                .request<never, T>(config)
                .then((res) => {
                    // 单个请求对数据的处理
                    if (config.interceptors?.responseInterceptor) {
                        res = config.interceptors.responseInterceptor(res)
                    }
                    this.showLoading = DEAFULT_LOADING
                    resolve(res)
                })
                .catch((err) => {
                    this.showLoading = DEAFULT_LOADING
                    reject(err)
                    return err
                })
        })
    }

    get<T>(config: HYRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'GET' })
    }

    post<T>(config: HYRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'POST' })
    }

    delete<T>(config: HYRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE' })
    }

    patch<T>(config: HYRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'PATCH' })
    }
}

export default HYRequest
