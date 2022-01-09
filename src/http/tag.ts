import hyRequest from "@/serivce";
import type { IDataType } from './type'
import { ITagItem } from '@/views/Tag/type'
export function getTag(query: string, page: number, size: number): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/tag/list`,
        params: {
            query,
            page,
            size,
        }
    })
}
export function delTag(id: string): Promise<IDataType> {
    return hyRequest.delete<IDataType>({
        url: `/tag/del`,
        data: {
            id
        }
    })
}
export function addTag(tagForm: ITagItem) {
    return hyRequest.post<IDataType>({
        url: `/tag/add`,
        data: tagForm
    })
}
