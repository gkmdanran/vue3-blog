export const tableJson = {
    title:'标签列表',
    columns: [
       
        {
            label: '标签名',
            prop: "name",
            slotName: 'tagName'
        },
        // {
        //     label: "文章数量",
        //     prop: "blogsStrs",
        //     slotName: 'blogsStrs'
        // },
        {
            label: '操作',
            slotName: 'handler'
        }
    ],

}
export const searchJson = {
    formAttributes: {
        labelWidth: "70px",
    },
    formItems: [
        {
            prop: "query",
            label: "标签名",
            type: "input",
        },
    ],
}