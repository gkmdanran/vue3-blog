export interface IPhoto {
    id: string,
    title: string,
    password: string,
    count: number,
    tag: string,
    tagColor: string,
    cover: string,
    createAt: string
}
export interface IPhotoForm {
    id?: string,
    title: string,
    password: string,
    tag: string,
}
export interface IPic{
    id:number,
    url:string
}
