import hyRequest from "@/serivce";
import type { IDataType } from './type'
export function accountLoginRequest(userName: string, password: string):Promise<IDataType> {
    return hyRequest.post<IDataType>({
        url: '/login',
        data: {
            userName,
            password,
        },
    })
}

