<template>
  <div class="base-collpase-text" v-bind="$attrs">
    <div v-show="!selfExpand">
      <span class="text">{{
        text.length > limit ? `${text.substring(0, limit)}...` : text
      }}</span>
      <el-button
        type="text"
        v-if="text.length > limit"
        @click="expandClick(true)"
        >展开</el-button
      >
    </div>
    <div v-show="selfExpand">
      <span class="text">{{ text }}</span>
      <el-button
        type="text"
        v-if="text.length > limit"
        @click="expandClick(false)"
        >收起</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from "vue";
export default defineComponent({
  name: "baseCollapseText",
  props: {
    expand: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
    limit: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    const selfExpand = ref<boolean>(false);
    function expandClick(type: boolean) {
      selfExpand.value = type;
    }
    watch(
      () => props.expand,
      (v) => {
        selfExpand.value = v;
      },
      { immediate: true }
    );
    return {
      selfExpand,
      expandClick,
    };
  },
});
</script>
<style lang="less" scoped>
.base-collpase-text {
  width: 250px;
  font-size: 14px;
  line-height: 1.5em;
  word-break: break-all;

  .el-button--text {
    padding: 0;
    font-size: inherit;
    padding-left: 5px;
  }
}
</style>