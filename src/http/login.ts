import hyRequest from "@/serivce";
import type { IDataType } from './type'
export function accountLoginRequest(username: string, password: string):Promise<IDataType> {
    console.log(username,password)
    return hyRequest.post<IDataType>({
        url: '/user/login',
        data: {
            username,
            password,
        },
    })
}

