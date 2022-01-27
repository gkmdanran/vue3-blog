
<template>
  <mavon-editor
    @imgAdd="handleEditorImgAdd"
    @imgDel="handleEditorImgDel"
    :modelValue="mdValue"
    @change="changeMd"
    @save="$emit('save')"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { uploadArticlePic } from "@/http/article";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
export default defineComponent({
  props: {
    mdValue: {
      type: String,
      default: "",
    },
  },
  inheritAttrs: false,
  name: "Editor",
  emits: ["getDescription", "update:mdValue"],
  setup(props, { emit }) {
    const imgFile: any = {};
    const route: RouteLocationNormalizedLoaded = useRoute();

    function changeMd(value: string, render: string) {
      let description: string = render
        .replace(/<[^<>]+>/g, "")
        .replace(/[\r\n]/g, " ");
      emit("getDescription", description);
      emit("update:mdValue", value);
    }
    function handleEditorImgAdd(pos: number, $file: any) {
      console.log(pos, $file);
      let formdata: FormData = new FormData();
      formdata.append("file", $file);
      formdata.append("id", String(route.params.id||''));
      imgFile[pos] = $file;
      uploadArticlePic(formdata).then((res) => {
        if (res.code == 200 && res.data) {
          let url: string = res.data;
          let name: string = $file.name;
          if (name.includes("-")) {
            name = name.replace(/-/g, "");
          }
          let content: string = props.mdValue;
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
          if (content.includes(name)) {
            let oStr: string = `(${pos})`;
            let nStr: string = `(${url})`;
            let index: number = content.indexOf(oStr);
            let str: string = content.replace(oStr, "");
            let insertStr: Function = (
              soure: string,
              start: number,
              newStr: string
            ): string => {
              return soure.slice(0, start) + newStr + soure.slice(start);
            };
            emit("update:mdValue", insertStr(str, index, nStr));
          }
        }
      });
    }
    function handleEditorImgDel(pos: any): void {
      delete imgFile[pos[0]];
    }
    return {
      changeMd,
      handleEditorImgAdd,
      handleEditorImgDel,
    };
  },
});
</script>
<style lang="less" scoped>
.add-tag {
}
</style>
