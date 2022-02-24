export const tableJson = {
    title: '文章列表',
    columns: [
        {
            label: '文章标题',
            prop: 'title',
            showOverflowTooltip: true
        },
        {
            label: '标签',
            prop: 'tag',
            slotName: 'tag',
            width: 275
        },
        {
            label: '概览',
            prop: 'description',
            showOverflowTooltip: true
        },
        {
            label: '点赞数',
            prop: 'star',
            slotName: 'star'
        },
        {
            label: '状态',
            prop: 'isTop',
            slotName: 'status'
        },
        {
            label: "发表时间",
            prop: "createAt",
            slotName: "createAt",
            width: 170
        },
        {
            width: 200,
            label: "操作",
            slotName: 'handler'
        }
    ],

}
export const searchJson = {
    searchItems: {
        title: {
            label: "文章标题",
            type: "input",
        },
        tag: {
            label: "标签",
            type: "select",
            selectProps: {
                label: 'name',
                value: 'id'
            },
            selectOptions: []
        }
    }
}