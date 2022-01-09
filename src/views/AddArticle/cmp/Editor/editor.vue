
<template>
  <mavon-editor v-model="mdValue" @change="changeMd" @save="$emit('save')" />
</template>
<script lang="ts">
import { defineComponent, ref,  } from "vue";

export default defineComponent({
  name: "Editor",
  emits: ["change"],
  setup(_, { emit }) {
    const mdValue = ref<string>("");
    function changeMd(value: string, render: string) {
      let description: string = render
        .replace(/<[^<>]+>/g, "")
        .replace(/[\r\n]/g, " ");
      console.log(value, description);
      emit("change", value, description);
    }

    return {
      mdValue,
      changeMd,
    };
  },
});
</script>
<style lang="less" scoped>
.add-tag {
}
</style>
