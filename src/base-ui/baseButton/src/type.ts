type MessageType = '' | 'success' | 'warning' | 'info' | 'error';
export interface IConfirm{
    message:string
    title?:string
    type?:MessageType
    confirmText?:string
    cancelText?:string
}