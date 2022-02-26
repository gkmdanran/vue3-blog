import hyRequest from "@/serivce";
import type { IDataType } from './type'
export function accountLoginRequest(username: string, password: string): Promise<IDataType> {
    return hyRequest.post<IDataType>({
        url: '/user/login',
        data: {
            username,
            password,
        },
    })
}
export function changePassword(oldPassword: string, newPassword: string): Promise<IDataType> {
    return hyRequest.put<IDataType>({
        url: '/user/password',
        data: {
            oldPassword,
            newPassword,
        },
    })
}
export function checkLogin(): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: '/user/checklogin',
    })
}

