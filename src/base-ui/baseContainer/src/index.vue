<template>
  <div class="base-container">
    <div class="crumbs">
      <el-breadcrumb :separator="separator">
        <template v-for="item in breadcrumbs" :key="item.name">
          <el-breadcrumb-item :to="{ path: item.path }">{{
            item.name
          }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-scrollbar>
        <div class="card-box">
          <div class="search_area">
            <slot name="search"></slot>
          </div>
          <div class="table_area">
            <slot name="table"></slot>
          </div>
          <div class="other">
            <slot name="other"></slot>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IBreadcrumb } from "./type";
export default defineComponent({
  props: {
    separator: {
      type: String,
      default: "/",
    },
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => [],
    },
  },
  name: "baseContainer",
  components: {},
  setup() {},
});
</script>
<style lang="less" scoped>
.base-container {
  height: 100%;
  padding: 20px;
  .crumbs {
    margin-bottom: 15px;
    padding-left: 5px;
    .el-breadcrumb {
      font-size: 18px;
    }
  }
  .content {
    width: 100%;
    height: calc(100vh - 135px);
    box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.2);
  }
  .card-box {
    padding: 15px;
  }
  .search_area {
    border-bottom: 1px solid #eaeef2;
  }
  .table_area {
    margin-top: 10px;
  }
}
</style>