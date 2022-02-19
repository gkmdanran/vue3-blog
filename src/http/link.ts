import hyRequest from "@/serivce";
import type { IDataType } from './type'
import type { ILink } from '@/views/Link/type'
export function getLink(title: string, description: any, page: number, size: number): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/link/list`,
        params: {
            title,
            description,
            page,
            size
        }
    })
}

export function delLink(id: number): Promise<IDataType> {
    return hyRequest.delete<IDataType>({
        url: `/link/del`,
        data: {
            id
        }
    })
}
export function addLink(linkForm: ILink): Promise<IDataType> {
    return hyRequest.post<IDataType>({
        url: `/link/add`,
        data: linkForm
    })
}
export function editLink(linkForm: ILink): Promise<IDataType> {
    return hyRequest.put<IDataType>({
        url: `/link/edit`,
        data: linkForm
    })
}
export function detailLink(id: number): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/link/detail`,
        params: {
            id
        }
    })
}

