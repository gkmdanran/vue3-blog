<template>
  <base-container
    :breadcrumbs="[
      { name: '首页', path: '/home' },
      { name: '文章管理', path: '/article' },
      { name: '添加文章' },
    ]"
    class="add-article"
  >
    <template #other>
      <div class="form-item">
        <div class="label">
          <span class="required">*</span>
          博客标题:
        </div>
        <el-input
          clearable
          v-model.trim="articleForm.title"
          maxlength="50"
          style="margin-right: 10px"
        ></el-input>
        <div class="btns">
          <el-button
            type="primary"
            @click="saveToSession"
            v-if="$route.path.includes('article/add')"
            >保存博客</el-button
          >
          <el-button type="success" @click="verifyForm">发布博客</el-button>
        </div>
      </div>
      <div class="form-item">
        <div class="label">参考链接:</div>
        <el-input
          clearable
          maxlength="200"
          v-model.trim="articleForm.link"
          style="margin-right: 10px"
        ></el-input>
        <div class="btns"></div>
      </div>
      <div class="form-item start">
        <div class="label"><span class="required">*</span>博客标签:</div>
        <div class="tag-content">
          <add-tag v-model:selectTag="articleForm.tagList"></add-tag>
        </div>
        <div class="btns"></div>
      </div>
      <editor
        @save="saveToSession"
        @getDescription="changeMarkdown"
        v-model:mdValue="articleForm.mdValue"
      />
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import AddTag from "./cmp/AddTag/addtag.vue";
import Editor from "./cmp/Editor/editor.vue";
import { IArticleForm } from "./type";
import { ElMessage } from "element-plus";
import { addArticle, getArticleDetail, editArticle } from "@/http/article";
import {
  useRouter,
  Router,
  RouteLocationNormalizedLoaded,
  useRoute,
} from "vue-router";
export default defineComponent({
  name: "Article",
  components: { AddTag, Editor },
  setup() {
    let articleForm = ref<IArticleForm>({
      link: "",
      title: "",
      tagList: [],
      description: "",
      mdValue: "",
    });
    const router: Router = useRouter();
    const route: RouteLocationNormalizedLoaded = useRoute();

    function saveToSession() {
      if (route.params.id && route.path.includes("article/edit")) {
        verifyForm();
      } else {
        window.localStorage.setItem(
          "blog_draft",
          JSON.stringify(articleForm.value)
        );
        ElMessage({
          type: "success",
          message: "草稿已保存",
        });
      }
    }
    function changeMarkdown(desc: string) {
      articleForm.value.description = desc;
    }
    function verifyForm() {
      if (!articleForm.value.title)
        return ElMessage({
          type: "warning",
          message: "请填写博客标题",
        });
      if (articleForm.value.tagList.length == 0)
        return ElMessage({
          type: "warning",
          message: "至少选择一个标签",
        });
      if (!articleForm.value.mdValue)
        return ElMessage({
          type: "warning",
          message: "请填写博客内容",
        });
      submitForm();
    }
    function submitForm() {
      if (route.params.id && route.path.includes("article/edit")) {
        editArticle(String(route.params.id), articleForm.value).then((res) => {
          if (res.code == 200) {
            window.localStorage.setItem("blog_draft", "");
            router.push("/article");
          }
        });
      } else {
        addArticle(articleForm.value).then((res) => {
          if (res.code == 200) {
            window.localStorage.setItem("blog_draft", "");
            router.push("/article");
          }
        });
      }
    }
    function getDraft() {
      let blog_draft: string = window.localStorage.getItem("blog_draft") || "";
      if (blog_draft) {
        try {
          let form: IArticleForm = JSON.parse(blog_draft);
          articleForm.value = form;
        } catch (error) {}
      }
    }
    function initArticle() {
      if (route.path.includes("article/edit")) {
        getArticleDetail(String(route.params.id)).then((res) => {
          if (res.code == 200) {
            articleForm.value = res.data;
          }
        });
      } else {
        getDraft();
      }
    }
    initArticle();
    return {
      articleForm,
      changeMarkdown,
      verifyForm,
      saveToSession,
    };
  },
});
</script>
<style lang="less" scoped>
.add-article {
  /deep/.search_area {
    border: none !important;
  }
  .form-item {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    .label {
      width: 90px;
      text-align: right;
      margin-right: 10px;
      .required {
        color: red;
        margin-right: 5px;
      }
    }
    .btns {
      width: 220px;
    }
    .el-input,
    .tag-content {
      flex: 1;
    }
    .tag-content {
      .tag-list {
        width: 100%;
        min-height: 60px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }
      .no-tag {
        line-height: 60px;
        text-align: center;
        font-size: 14px;
        color: #ccc;
      }
    }
  }
  .start {
    align-items: flex-start;
  }
}
</style>
