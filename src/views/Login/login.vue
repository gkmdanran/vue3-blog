<template>
  <div class="pclogin">
    <div class="contents">
      <div class="left">
        <div class="title">个人博客后台管理系统</div>
        <div class="eng">MY BLOG BACKGROUNG MANAGEMENT SYSTEM</div>
      </div>
      <div class="right">
        <div class="login_infos">
          <div class="welcome">欢迎登录</div>
          <div class="names">个人博客后台管理系统</div>
          <form action="" class="fom">
            <div class="us">
              <i class="el-icon-user-solid"></i>
              <input
                type="text"
                v-model.trim="userInfo.username"
                placeholder="请输入用户名"
              />
            </div>
            <div class="us">
              <i class="el-icon-lock"></i>
              <input
                type="password"
                autocomplete
                v-model="userInfo.password"
                placeholder="请输入密码"
                @keyup.enter="login"
              />
            </div>
          </form>
          <div class="foots">
            <button @click="login">登 录</button>
          </div>
        </div>
        <div class="forget" @click="forgetPassword">忘记密码?寻求帮助</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { loginInfo } from "./type";
import { accountLoginRequest } from "@/http/login";
import { ElMessage } from "element-plus";
import Cookies from "js-cookie";
import { useRouter, Router } from "vue-router";
export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    const userInfo = reactive<loginInfo>({
      username: "",
      password: "",
    });
    const router: Router = useRouter();
    function forgetPassword() {
      ElMessage.info("请联系管理员：邮箱1755989501@qq.com");
    }
    function login() {
      if (!userInfo.username || !userInfo.password) return;
      accountLoginRequest(userInfo.username, userInfo.password).then((res) => {
        if (res.code == 200) {
          const inFifteenMinutes: Date = new Date(
            new Date().getTime() + 6 * 60 * 60 * 1000
          );
          Cookies.set("blog_token", res.data.token, {
            expires: inFifteenMinutes,
          });
          Cookies.set("username", res.data.username, {
            expires: 7,
          });
          router.push("/homepage");
        }
      });
    }
    if (Cookies.get("username")) {
      userInfo.username = Cookies.get("username");
    }
    return { forgetPassword, login, userInfo };
  },
});
</script>
<style lang="less" scoped>
.pclogin {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  min-height: 700px;
  min-width: 1280px;
  background-image: url(../../assets/img/bgc.jpg);
  .contents {
    position: absolute;
    width: 66.67%;
    height: 49.15%;
    overflow: hidden;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 12px 6px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    .left {
      float: left;
      height: 100%;
      width: 63.7%;
      background: rgba(0, 0, 0, 0.1);
      padding-top: 10%;
      padding-left: 4.7%;
      .title {
        height: 50px;
        font-size: 28px;
        font-weight: 700;
        letter-spacing: 1px;
        color: #ffffff;
      }
      .eng {
        font-size: 12px;
        color: #ffffff;
      }
    }
    .right {
      float: left;
      height: 100%;
      width: 36.3%;
      background: #ffffff;
      opacity: 0.9;
      .login_infos {
        width: 74.6%;
        margin: 0 auto;
        padding-top: 17.2%;
        height: 87%;
        .welcome {
          font-size: 18px;
          color: #28374f;
          height: 40px;
        }
        .names {
          font-size: 14px;
          color: #696969;
          height: 20px;
        }
        .fom {
          height: 38%;
          .us {
            width: 100%;
            height: 40%;
            border-radius: 3px;
            background-color: #f4f4f4;
            display: flex;
            align-items: center;
            margin-top: 6%;
            padding-left: 15px;
            input {
              outline: none;
              border: 0;
              background-color: #f4f4f4;
              height: 100%;
              margin-left: 10px;
              width: calc(100% - 60px);
              font-size: 14px;
            }
          }
        }
        .foots {
          width: 100%;
          height: 35px;
          line-height: 35px;
          font-size: 11px;
          color: #2d3b53;
          margin-top: 8%;
          .checks {
            display: inline-block;
            width: 14px;
            height: 14px;
            border: 1px solid #cccccc;
            margin-bottom: 0;
            margin-top: -2px;
            vertical-align: middle;
          }
          button {
            float: right;
            vertical-align: middle;
            height: 35px;
            width: 100%;
            border-radius: 3px;
            border: 0;
            outline: 0;
            background-color: #0062ba;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
      .forget {
        width: 100%;
        height: 13%;
        background: #f4f4f4;
        color: #788190;
        font-size: 9.6px;
        text-align: center;
        line-height: 45px;
        cursor: default;
      }
    }
  }
}
</style>