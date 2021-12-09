<template>
  <div class="base-table">
    <el-table
      ref="baseTable"
      :data="tableData"
      style="width: 100%"
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
    <div class="footer">
      <el-pagination
        v-if="tableJson.paginatio"
        layout="total,prev, pager, next"
        :page-size="size"
        v-bind="tableJson.pagination"
        :total="total"
        v-model:currentPage="page"
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
import { tableJson } from "@/views/Tag/tagJson";
import { ITable } from "./type";
export default defineComponent({
  name: "baseTable",
  props: {
    tableJson: {
      type: Object as PropType<ITable>,
      required: true,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  emits: ["changePagination"],
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
    const page = ref<number>(1);
    const size = ref<number>(5);
    const pageInfo: any = {};
    const pageKey =
      tableJson.paginatio && tableJson.paginatio.pageProp
        ? `${tableJson.paginatio.pageProp}`
        : "page";
    const sizeKey =
      tableJson.paginatio && tableJson.paginatio.sizeProp
        ? `${tableJson.paginatio.sizeProp}`
        : "size";
    function handleSizeChange(val: number) {
      size.value = val;
      pageInfo[pageKey] = page.value;
      pageInfo[sizeKey] = size.value;
      emit("changePagination", pageInfo);
    }
    function handleCurrentChange(val: number) {
      page.value = val;
      pageInfo[pageKey] = page.value;
      pageInfo[sizeKey] = size.value;
      emit("changePagination", pageInfo);
    }
    return {
      customSlots,
      customAttrs,
      baseTable,
      page,
      size,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>
<style scoped>
.base-table .footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
