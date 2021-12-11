<template>
  <el-button v-bind="customAttrs" @click="handleConfirm">
    <slot></slot>
  </el-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, PropType } from "vue";
import { ElMessageBox } from "element-plus";
import { IConfirm } from "./type";
export default defineComponent({
  props: {
    confirm: {
      type: Object as PropType<IConfirm>,
    },
  },
  emits: ["confirmClick", "cancelClick"],
  name: "baseButton",
  components: {},
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const customAttrs = reactive({
      ...instance?.attrs,
    });
    function handleConfirm() {
      if (!props.confirm) return;
      ElMessageBox.confirm(
        props.confirm.message,
        props.confirm.title || "提示",
        {
          confirmButtonText: props.confirm.confirmText || "确认",
          cancelButtonText: props.confirm.cancelText || "取消",
          type: props.confirm.type || "warning",
        }
      )
        .then(() => {
          emit("confirmClick");
        })
        .catch(() => {
          emit("cancelClick");
        });
    }
    return { customAttrs, handleConfirm };
  },
});
</script>
<style lang="less" scoped>
</style>
