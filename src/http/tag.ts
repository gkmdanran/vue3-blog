import hyRequest from "@/serivce";
import type { IDataType } from './type'
export function getTag(query: string, page: number, size: number): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/tags?query=${query}&pageNum=${page}&pageSize=${size}`,
    })
}
export function delTag(id: string): Promise<IDataType> {
    return hyRequest.post<IDataType>({
        url: `/deltag`,
        data: {
            id
        }
    })

}
