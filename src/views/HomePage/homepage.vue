<template>
  <el-container style="height: 100%">
    <el-aside :width="isCollapse == false ? '200px' : '65px'">
      <el-menu
        background-color="#545c64"
        :default-active="activeIndex"
        text-color="#fff"
        router
        active-text-color="#ffd04b"
        :collapse="isCollapse"
      >
        <div class="switch" @click="changeCollapse">
          <i class="el-icon-s-fold" v-show="isCollapse == false"></i>
          <i class="el-icon-s-unfold" v-show="isCollapse == true"></i>
        </div>
        <el-menu-item index="/tag">
          <i class="el-icon-paperclip"></i>
          <span>标签管理</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-notebook-2"></i>
          <span>文章管理</span>
        </el-menu-item>
        <el-menu-item index="/photo">
          <i class="el-icon-picture"></i>
          <span>相册管理</span>
        </el-menu-item>
        <el-menu-item index="/chat">
          <i class="el-icon-chat-dot-round"></i>
          <span>留言管理</span>
        </el-menu-item>
        <el-menu-item index="/link">
          <i class="el-icon-s-promotion"></i>
          <span>友链管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="titlename">
          <img src="../../assets/img/headpic.jpg" alt="" />
          <div class="title" @click="$router.push('/homepage')">个人博客系统</div>
          <a target="_blank" href="http://101.132.68.0:3333">
            <el-button size="mini" type="info">
              我的博客<i class="el-icon-s-promotion"></i>
            </el-button>
          </a>
        </div>
        <div class="userinfos">
          <div class="times">{{ currentTime }}</div>

          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-setting"></i>设置
            </span>
            <template #dropdown>
              <el-dropdown-menu style="width: 120px">
                <el-dropdown-item icon="el-icon-s-custom" command="loginout"
                  >退出登录</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-edit" command="changepassword"
                  >修改密码</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div></el-header
      >
      <el-scrollbar style="height: 100%">
        <router-view></router-view>
      </el-scrollbar>
    </el-container>
    <change-password v-model:visible="showChange"></change-password>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount, watch, reactive } from "vue";
import useFormateDate from "@/hooks/useFormateDate";
import changePassword from "./cmp/changePassword.vue";
import {
  useRouter,
  Router,
  useRoute,
  RouteLocationNormalizedLoaded,
} from "vue-router";
import Cookies from "js-cookie";
export default defineComponent({
  name: "HomePage",
  components: {
    changePassword,
  },
  setup() {
    const router: Router = useRouter();
    const route: RouteLocationNormalizedLoaded = useRoute();
    const isCollapse = ref<boolean>(false);
    const currentTime = ref<string>("");
    const showChange = ref<boolean>(false);
    const activeIndex = ref<string>("");
    let timer: ReturnType<typeof setTimeout>;
    watch(
      () => route.path,
      () => {
        if (route.path == "/home") activeIndex.value = "";
        else if (route.path.includes("/article"))
          activeIndex.value = "/article";
        else if (route.path.includes("/photo")) activeIndex.value = "/photo";
        else activeIndex.value = route.path;
      },
      {immediate:true}
    );
    function changeCollapse() {
      isCollapse.value = !isCollapse.value;
    }
    function getTime() {
      timer = setInterval(() => {
        currentTime.value = useFormateDate(Date.now());
      }, 1000);
    }
    function handleCommand(command: string) {
      if (command == "loginout") LoginOut();
      else if (command == "changepassword") {
        showChange.value = true;
      }
    }
    function LoginOut() {
      Cookies.set("blog_token", "");
      router.push("/");
    }

    currentTime.value = useFormateDate(Date.now());
    getTime();
    onBeforeUnmount(() => {
      clearInterval(timer);
    });
    return {
      activeIndex,
      isCollapse,
      currentTime,
      showChange,
      changeCollapse,
      handleCommand,
    };
  },
});
</script>
<style lang="less" scoped>
.el-header {
  background-color: #e9eef3;
}
.el-menu {
  height: 100%;
  .switch {
    height: 40px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    color: #ffffff;
  }
}
.titlename {
  padding-left: 20px;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  float: left;
  font-size: 18px;

  color: #333;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: palegoldenrod;
    margin-right: 15px;
  }
  .el-button {
    margin-left: 20px;
    margin-top: 5px;
  }
  .title {
    cursor: pointer;
  }
}
.userinfos {
  float: right;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
  .times {
    font-size: 14px;
    margin-right: 20px;
    color: #666;
  }

  /deep/.el-dropdown {
    cursor: pointer;
    font-size: 16px !important;
    letter-spacing: 2px;
  }
}
</style>
