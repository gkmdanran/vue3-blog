import hyRequest from "@/serivce";
import type { IDataType } from './type'
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
export function delArticles(ids: string[]): Promise<IDataType> {
    return hyRequest.delete<IDataType>({
        url: `/article/del`,
        data: {
            ids
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
