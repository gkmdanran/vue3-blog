export const tableJson = {
    title: '友链列表',
    columns: [
        {
            label: '头像',
            prop: "photo",
            slotName:'photo'
        },
        {
            label: '标题',
            prop: "title",
        },
        {
            label: "描述",
            prop: "description",
            slotName: "description",
        },
        {
            label: "链接",
            prop: "link",
            slotName:'link'
        },
        {
            label:'操作',
            slotName:'handler'
        }
    ],

}
export const searchJson = {
    searchItems: {
        title: {
            label: "标题",
            type: "input",
        },
        description: {
            label: "描述",
            type: "input",
        }
    }
}