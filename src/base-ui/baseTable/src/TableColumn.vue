<template>
  <el-table-column
    v-if="!col.slotName && !col.prop && !col.children"
    v-bind="selfCol"
  >
  </el-table-column>
  <el-table-column
    v-else-if="col.children && col.children.length > 0"
    v-bind="selfCol"
  >
    <TableColumn v-for="(item, index) in col.children" :key="index" :col="item">
      <template v-for="slot in Object.keys(customSlots)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </TableColumn>
  </el-table-column>
  <el-table-column v-else v-bind="selfCol">
    <template #default="scope">
      <slot :name="col.slotName" v-bind="scope">{{ scope.row[col.prop] }}</slot>
    </template>
  </el-table-column>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive } from "vue";
export default defineComponent({
  props: {
    col: {
      type: Object,
      default: () => {},
    },
  },
  name: "TableColumn",
  setup(props) {
    const instance = getCurrentInstance();
    const customSlots = reactive({
      ...instance?.proxy?.$slots,
    });

    const selfCol: any = {};
    for (var key in props.col) {
      if (key !== "children") {
        selfCol[key] = props.col[key];
      }
    }
    return {
      customSlots,
      selfCol,
    };
  },
});
</script>
