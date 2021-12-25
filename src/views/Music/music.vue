<template>
  <base-container
    :breadcrumbs="[{ name: '首页', path: '/home' }, { name: '音乐管理' }]"
  >
    <template #search> </template>
    <template #table>
      <base-table border stripe :table-data="tableData" :table-json="tableJson">
        <template #lrc="scope">
          {{ scope.row.lrc == "" ? "暂无歌词" : "歌词完整" }}
        </template>
        <template #handler="scope"> 
          <base-button
          type="text"
          :confirm="{message:'确定要删除这条音乐吗'}"
          @confirmClick="confirmDelMusic(scope.row._id)"
          >删除</base-button>
        </template>
      </base-table>
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { IMusicItem } from "./type";
import { tableJson } from "./musicJson";
import { getSongs, deleteSong } from "@/http/music";
export default defineComponent({
  name: "Music",
  components: {},
  setup() {
    const tableData = ref<IMusicItem[]>([]);
    function searchList() {
      getSongs().then((res) => {
        if (res.code == 200) {
          tableData.value = res.data;
        }
      });
    }
    function confirmDelMusic(id:string){
      deleteSong(id).then(res=>{
        if(res.code==200)
          searchList()
      })
    }
    searchList();
    return {
      tableData,
      tableJson,
      searchList,
      confirmDelMusic
    };
  },
});
</script>
