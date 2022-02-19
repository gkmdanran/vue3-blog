export const tableJson = {
    title: '友链列表',
    columns: [
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
            prop: "href",
            slotName:'href'
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
export const dialogJson = {
    formAttributes: {
      labelWidth: "60px",
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        href: [
          {
            required: true,
            message: "请输入连接",
            trigger: "blur",
          },
        ],
       
      },
    },
    formItems: {
      title: {
        type: "input",
        label: "标题",
      },
      href: {
        type: "input",
        label: "链接",
      },
      description: {
        type: "input",
        label: "描述",
        attrs: {
          type: "textarea",
          maxlength:"50",
          showWordLimit:true,
          rows:5
        },
      },
    },
  };