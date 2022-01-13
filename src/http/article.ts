import hyRequest from "@/serivce";
import type { IDataType } from './type'
import { IArticleForm } from "@/views/AddArticle/type";
export function getArticle(title: string, tag: number, page: number, size: number): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/article/list`,
        params: {
            title,
            tag,
            page,
            size
        }
    })
}
export function delArticle(id: string): Promise<IDataType> {
    return hyRequest.delete<IDataType>({
        url: `/article/del`,
        data: {
            id
        }
    })
}
export function changeTopStatus(id: string): Promise<IDataType> {
    return hyRequest.post<IDataType>({
        url: `/article/top`,
        data: {
            id
        }
    })
}
export function changeHideStatus(id: string): Promise<IDataType> {
    return hyRequest.post<IDataType>({
        url: `/article/hide`,
        data: {
            id
        }
    })
}
export function addArticle(articleForm: IArticleForm): Promise<IDataType> {
    return hyRequest.post<IDataType>({
        url: `/article/add`,
        data: articleForm
    })
}
export function getArticleDetail(id: string): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/article/detail`,
        params: {
            id
        }
    })
}
