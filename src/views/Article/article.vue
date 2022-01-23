<template>
  <base-container
    :breadcrumbs="[{ name: '首页', path: '/home' }, { name: '文章管理' }]"
  >
    <template #search>
      <base-search
        :search-json="searchJson"
        @changeForm="changeForm"
        label-width="80px"
        v-model="searchForm"
      >
      </base-search>
    </template>
    <template #table>
      <base-table
        border
        stripe
        :data="tableData"
        :table-json="tableJson"
        v-model:pagination="pagination"
        @changePagination="searchList"
      >
        <template #topHandler>
          <el-button
            type="primary"
            size="small"
            @click="$router.push('/article/add')"
            >写博客</el-button
          >
        </template>
        <template #star="scope">
          <span>
            <i
              class="el-icon-star-on"
              style="color: #e47470; font-size: 18px"
            ></i>
            {{
              scope.row.star >= 10000
                ? scope.row.star / 10000 + "w"
                : scope.row.star >= 1000
                ? scope.row.star / 1000 + "k"
                : scope.row.star
            }}
          </span>
        </template>
        <template #status="scope">
          <span>
            {{ scope.row.isHide ? "隐藏" : "展示" }}｜
            {{ scope.row.isTop ? "已置顶" : "未置顶" }}
          </span>
        </template>
        <template #handler="scope">
          <el-button
            type="text"
            @click="
              $router.push({
                name: 'EditArticle',
                params: { id: scope.row.id },
              })
            "
            >编辑</el-button
          >
          <base-button
            type="text"
            :confirm="{ message: '确认删除吗？' }"
            @confirmClick="confirmDelArticle(scope.row)"
            >删除</base-button
          >
          <base-button
            type="text"
            :confirm="{
              message: scope.row.isHide ? '确认显示文章吗？' : '确认隐藏文章吗',
            }"
            @confirmClick="confirmHide(scope.row)"
            >{{ scope.row.isHide ? "显示" : "隐藏" }}</base-button
          >
          <base-button
            type="text"
            :confirm="{
              message: scope.row.isTop
                ? '确认取消置顶文章吗？'
                : '确认置顶文章吗',
            }"
            @confirmClick="confirmTop(scope.row)"
            >{{ scope.row.isTop ? "取消置顶" : "置顶" }}</base-button
          >
        </template>
        <template #createAt="scope">
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>
      </base-table>
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { tableJson, searchJson } from "./articleJson";
import { getTag } from "@/http/tag";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import {
  getArticle,
  delArticle,
  changeTopStatus,
  changeHideStatus,
} from "@/http/article";
import { IPagination } from "@/base-ui/baseTable/src/type";
import { IArticleItem, ISearchForm } from "./type";
export default defineComponent({
  name: "Article",
  setup() {
    const route: RouteLocationNormalizedLoaded = useRoute();
    let searchForm = ref<ISearchForm>({ title: "", tag: "" });
    const tableData = ref<IArticleItem[]>([]);
    const pagination = reactive<IPagination>({ page: 1, size: 10, total: 0 });
    function searchList() {
      getArticle(
        searchForm.value.title,
        searchForm.value.tag,
        pagination.page,
        pagination.size
      ).then((res) => {
        if (res.code == 200) {
          tableData.value = res.data.list;
          pagination.total = res.data.total;
        }
      });
    }

    function changeForm() {
      pagination.page = 1;
      searchList();
    }

    function confirmDelArticle(row: IArticleItem) {
      delArticle(row.id).then((res) => {
        if (res.code == 200) {
          searchList();
        }
      });
    }
    function confirmHide(row: IArticleItem) {
      changeHideStatus(row.id).then((res) => {
        if (res.code == 200) {
          searchList();
        }
      });
    }
    function confirmTop(row: IArticleItem) {
      changeTopStatus(row.id).then((res) => {
        if (res.code == 200) {
          searchList();
        }
      });
    }
    function getTagList() {
      getTag("", 1, 99999999).then((res) => {
        if (res.code == 200) {
          searchJson.searchItems.tag.selectOptions = res.data.list;
        }
      });
    }
    if(route.query.tagId!==undefined)
      searchForm.value.tag=Number(route.query.tagId)
    searchList();
    getTagList();
    return {
      searchForm,
      tableData,
      tableJson,
      searchJson,
      pagination,
      confirmDelArticle,
      confirmHide,
      confirmTop,
      changeForm,
      searchList,
    };
  },
});
</script>
<style lang="less" scoped>
</style>
