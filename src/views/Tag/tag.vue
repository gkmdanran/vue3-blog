<template>
  <base-container
    :breadcrumbs="[{ name: '首页', path: '/home' }, { name: '标签管理' }]"
  >
    <template #table>
      <base-table
      @changePagination="change"
        :table-data="tableData"
        :table-json="tableJson"
        :total="total"
        border
        stripe
      >
        <template #tagName="scope">
          <el-tag :type="scope.row.type">{{ scope.row.tagName }}</el-tag>
        </template>
        <template #blogsStrs="scope">
          <span
            :style="{
              color: scope.row.blogsStrs == '' ? 'red' : 'black',
              fontSize: '22px',
              marginRight: '2px',
            }"
            >{{
              scope.row.blogsStrs == ""
                ? 0
                : scope.row.blogsStrs.split(",").length
            }}</span
          >篇
        </template>
        <template #handler="scope">
          <el-button
            type="text"
            @click="checkArticle(scope.row._id)"
            :disabled="scope.row.blogsStrs == ''"
            >查看文章</el-button
          >
          <el-button type="text" @click="handleDel(scope.row._id)"
            >删除</el-button
          >
        </template>
      </base-table>
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, onBeforeUnmount, watch, onMounted } from "vue";
import { getTag } from "@/http/tag";
import { ITagItem } from "./type";
import { tableJson } from "./tagJson";
export default defineComponent({
  name: "Tag",
  components: {},
  setup() {
    const page = ref<number>(1);
    const size = ref<number>(10);
    const total = ref<number>(0);
    const query = ref<string>("");
    const tableData = ref<ITagItem[]>([]);
    function searchList() {
      getTag(query.value, page.value, size.value).then((res) => {
        if (res.code == 200) {
          tableData.value = res.data.list;
          total.value = res.data.total;
          console.log(tableData.value);
        }
      });
    }
    function change(v:any){
      console.log(v)
    }

    searchList();
    return {
      tableData,
      tableJson,
      total,
      change
    };
  },
});
</script>
<style lang="less" scoped>
.el-tag {
  min-width: 80px;
  text-align: center;
}
</style>
