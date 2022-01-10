<template>
  <base-container
    :breadcrumbs="[
      { name: '首页', path: '/home' },
      { name: '文章管理', path: '/article' },
      { name: '添加文章' },
    ]"
    class="add-article"
  >
    <template #other
      >{{ articleForm }}
      <div class="form-item">
        <div class="label">
          <span class="required">*</span>
          博客标题:
        </div>
        <el-input
          v-model="articleForm.title"
          style="margin-right: 10px"
        ></el-input>
        <div class="btns">
          <el-button type="primary" @click="saveToSession">保存博客</el-button>
          <el-button type="success" @click="verifyForm">发布博客</el-button>
        </div>
      </div>
      <div class="form-item">
        <div class="label">参考链接:</div>
        <el-input
          v-model="articleForm.link"
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
      <editor @save="saveToSession" @change="changeMarkdown" />
    </template>
  </base-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import AddTag from "./cmp/AddTag/addtag.vue";
import Editor from "./cmp/Editor/editor.vue";
import { IArticleForm } from "./type";
import { ElMessage } from "element-plus";
import { addArticle } from "@/http/article";
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
    let articleForm = reactive<IArticleForm>({
      link: "",
      title: "",
      tagList: [],
      description: "",
      mdValue: "",
    });
    const router: Router = useRouter();
    const route: RouteLocationNormalizedLoaded = useRoute();

    function saveToSession() {
      window.localStorage.setItem("blog_draft", JSON.stringify(articleForm));
      ElMessage({
        type: "success",
        message: "草稿已保存",
      });
    }
    function changeMarkdown(value: string, desc: string) {
      articleForm.mdValue = value;
      articleForm.description = desc;
    }
    function verifyForm() {
      if (!articleForm.title)
        return ElMessage({
          type: "warning",
          message: "请填写博客标题",
        });
      if (articleForm.tagList.length == 0)
        return ElMessage({
          type: "warning",
          message: "至少选择一个标签",
        });
      if (!articleForm.mdValue)
        return ElMessage({
          type: "warning",
          message: "请填写博客内容",
        });
      submitForm();
    }
    function submitForm() {
      addArticle(articleForm).then((res) => {
        if (res.code == 200) {
          window.localStorage.setItem("blog_draft", "");
          router.push("/article");
        }
      });
    }
    function getDraft() {
      let blog_draft: string = window.localStorage.getItem("blog_draft") || "";
      if (blog_draft) {
        try {
          let form: IArticleForm = JSON.parse(blog_draft);
          articleForm = reactive<IArticleForm>({ ...form });
        } catch (error) {}
      }
    }
    function initArticle() {
      if (route.path == "article/edit") {
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
