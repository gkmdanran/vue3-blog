import hyRequest from "@/serivce";
import type { IDataType } from './type'
export function getChat(queryPeople: string, queryDate: any, pageNum: number, pageSize: number): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/chats?queryPeople=${queryPeople}&queryDate=${queryDate}&pageNum=${pageNum}&pageSize=${pageSize}`,
    })
}

export function delChats(ids: string): Promise<IDataType> {
    return hyRequest.post<IDataType>({
        url: `/delchats`,
        data: {
            ids
        }
    })
}


