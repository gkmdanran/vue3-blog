import hyRequest from "@/serivce";
import type { IDataType } from './type'
export function getChat(queryPeople: string, queryDate: any, page: number, size: number): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/chat/list`,
        params: {
            queryPeople,
            queryDate,
            page,
            size
        }
    })
}

export function delChats(ids: string[]): Promise<IDataType> {
    return hyRequest.delete<IDataType>({
        url: `/chat/del`,
        data: {
            ids
        }
    })
}


