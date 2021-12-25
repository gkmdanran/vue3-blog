import hyRequest from "@/serivce";
import type { IDataType } from './type'
export function getFiles(): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/getfilelists`,
    })
}
export function clearFiles(): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/clearfile`,
    })
}

