import { request } from "umi";
export const httpsGet = async (url: string, params?: {}) => {
    const data = await request(url, {
        method: 'get',
        params: params
    })
    return data
}
export const httpsPost = async (url: string, params?: {}) => {
    const data = await request(url, {
        method: 'post',
        data: params
    })
    return data
}