import hyRequest from "@/serivce";
import type { IDataType } from './type'
import { IPhotoForm } from '@/views/Photo/type'
export function getPhotos(page: number, size: number): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/photo/list`,
        params: {
            page,
            size
        }
    })
}
export function deletePhoto(id: string): Promise<IDataType> {
    return hyRequest.delete<IDataType>({
        url: `/photo/del`,
        data: {
            id
        }
    })
}
export function addPhoto(addForm: IPhotoForm): Promise<IDataType> {
    return hyRequest.post<IDataType>({
        url: `/photo/add`,
        data: addForm
    })
}
