import hyRequest from "@/serivce";
import type { IDataType } from './type'
export function getSongs(): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/songs`,
    })
}
export function deleteSong(id: string): Promise<IDataType> {
    return hyRequest.post<IDataType>({
        url: `/delsong`,
        data: {
            id
        }
    })

}

