<template>
  <div class="base-table">
    <div class="base-header">
      <div class="title" v-if="tableJson.title">
        {{ tableJson.title || "" }}
      </div>
      <div class="button_area">
        <slot name="topHandler"></slot>
      </div>
    </div>
    <el-table
      ref="baseTable"
      style="width: 100%"
      :data="data"
      v-bind="customAttrs"
    >
      <TableColumn
        v-for="(item, index) in tableJson.columns || []"
        :key="index"
        :col="item"
      >
        <template v-for="slot in Object.keys(customSlots)" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </TableColumn>
    </el-table>
    <div class="base-footer">
      <el-pagination
        v-if="pagination"
        layout="total,prev, pager, next"
        v-bind="tableJson.paginationAttributes || {}"
        :page-size="pagination.size"
        :total="pagination.total"
        v-model:currentPage="pagination.page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  ref,
  PropType,
} from "vue";
import TableColumn from "./TableColumn.vue";
import { ElTable } from "element-plus";
import { ITable, IPagination } from "./type";
export default defineComponent({
  name: "baseTable",
  props: {
    tableJson: {
      type: Object as PropType<ITable>,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    pagination: {
      type: Object as PropType<IPagination>,
    },
  },
  emits: ["changePagination", "update:pagination"],
  components: { TableColumn },
  setup(props, { emit }) {
    const baseTable = ref<InstanceType<typeof ElTable>>();
    const instance = getCurrentInstance();
    const customSlots = reactive({
      ...instance?.proxy?.$slots,
    });
    const customAttrs = reactive({
      ...instance?.attrs,
    });

    //分页
    function handleSizeChange(val: number) {
      props.pagination!.size = val;
      emit("update:pagination", props.pagination);
      emit("changePagination", {
        page: props.pagination!.page,
        size: props.pagination!.size,
      });
    }
    function handleCurrentChange(val: number) {
      props.pagination!.page = val;
      emit("update:pagination", props.pagination);
      emit("changePagination", {
        page: props.pagination!.page,
        size: props.pagination!.size,
      });
    }
    return {
      customSlots,
      customAttrs,
      baseTable,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>
<style lang="less" scoped>
/deep/ .el-table .el-table__cell {
  padding: 5px 0 !important;
}
.base-table {
  .base-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .base-header {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    align-items: center;
    .title {
      color: #333333;
      font-size: 18px;
      padding: 10px 0;
    }
  }
}
</style>
