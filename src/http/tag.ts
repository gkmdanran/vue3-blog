import hyRequest from "@/serivce";
import type { IDataType } from './type'
export function getTag(query: string, page: number, size: number): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/tags?query=${query}&pageNum=${page}&pageSize=${size}`,
    })
}

