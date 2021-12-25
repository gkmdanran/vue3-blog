<template>
  <base-container
    :breadcrumbs="[{ name: '首页', path: '/home' }, { name: '文件清理' }]"
  >
    <template #table>
      <base-table border stripe :table-data="tableData" :table-json="tableJson">
        <template #topHandler>
          <base-button
            type="danger"
            :confirm="{ message: '确定要清除无用文件吗？' }"
            @confirmClick="confirmClean()"
            >一键清除</base-button
          >
        </template>
      </base-table>
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { IFileItem } from "./type";
import { tableJson } from "./fileJson";
import {getFiles,clearFiles} from '@/http/file'
export default defineComponent({
  name: "File",
  components: {},
  setup() {
    const tableData = ref<IFileItem[]>([]);
    function searchList() {
        getFiles().then(res=>{
            if(res.code==200)
                tableData.value=res.data
        })
    }
    function confirmClean() {
        clearFiles().then(res=>{
            if(res.code==200)
                searchList()
        })
    }
    searchList();
    return {
      tableData,
      tableJson,
      searchList,
      confirmClean,
    };
  },
});
</script>
