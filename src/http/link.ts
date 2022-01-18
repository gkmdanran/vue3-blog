import hyRequest from "@/serivce";
import type { IDataType } from './type'
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


