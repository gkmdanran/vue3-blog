import hyRequest from "@/serivce";
import type { IDataType } from './type'
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
