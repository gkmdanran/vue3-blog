
<template>
  <mavon-editor
    :modelValue="mdValue"
    @change="changeMd"
    @save="$emit('save')"
  />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

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
  setup(_, { emit }) {
    function changeMd(value: string, render: string) {
      let description: string = render
        .replace(/<[^<>]+>/g, "")
        .replace(/[\r\n]/g, " ");
      emit("getDescription", description);
      emit("update:mdValue", value);
    }
    return {
      changeMd,
    };
  },
});
</script>
<style lang="less" scoped>
.add-tag {
}
</style>
