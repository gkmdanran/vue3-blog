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
export function editPhoto(editForm: IPhotoForm): Promise<IDataType> {
    return hyRequest.put<IDataType>({
        url: `/photo/edit`,
        data: editForm
    })
}
export function getDetail(id: string): Promise<IDataType> {
    return hyRequest.get<IDataType>({
        url: `/photo/detail`,
        params: {
            id
        }
    })
}
export function uploadPhoto(form: FormData): Promise<IDataType> {
    return hyRequest.post<IDataType>({
        url: `/photo/upload`,
        data: form
    })
}