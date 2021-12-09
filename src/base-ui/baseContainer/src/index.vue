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
    <div class="card-box">
      <div class="search_area">
        <slot name="search"></slot>
      </div>
      <div class="table_area">
        <slot name="table"></slot>
      </div>
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
  .card-box{
    width: 100%;
    min-height: 200px;
    border-radius: 15px;
    box-shadow: 3px 3px 10px 3px rgba(0,0,0,.2);
    padding: 15px;
  }
  .search_area{
    margin-bottom: 15px;
  }
  .table_area{

  }
}
</style>