<template>
  <div class="welcome">
    <div class="chats">
      <div class="title">近期留言</div>
      <div class="nochat" v-show="chatList.length == 0">暂时没有留言</div>
      <div class="chat_item" v-for="chat in chatList" :key="chat._id">
        <span class="time">{{ $filters.formatTime(chat.createAt) }}</span>
        <span class="name">{{ chat.chatName }}</span>
        <div class="content">{{ chat.chatContent }}</div>
      </div>
    </div>
    <div class="pie" ref="echartDivRef" id="pie"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import { IChatItem } from "@/views/Chat/type";
import { getChat } from "@/http/chat";
import { getTag } from "@/http/tag";
import useEcharts from "@/hooks/useEcharts";
import { EChartsOption } from "echarts";
export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const chatList = ref<IChatItem[]>([]);
    const echartDivRef = ref<HTMLElement>();
    function getChatList() {
      getChat("", "", 1, 5).then((res) => {
        if (res.code == 200) {
          chatList.value = res.data.list;
        }
      });
    }

    getChatList();
    onMounted(() => {
      const { setOptions } = useEcharts(echartDivRef.value!);
      getTag("", 1, 999999999).then((res) => {
        if (res.code == 200) {
          let data: any = [];
          res.data.list.forEach((tag: any) => {
            if (tag.count > 0) {
              data.push({
                value: tag.count,
                name: tag.name,
              });
            }
          });
          let option: EChartsOption = {
            title: {
              text: "博客分类",
              left: "center",
            },
            tooltip: {
              trigger: "item",
              formatter: "{b} : {c} ({d}%)",
            },
            series: [
              {
                name: "",
                type: "pie",
                radius: "55%",
                data: data,
              },
            ],
          };
          setOptions(option);
        }
      });
    });
    return {
      chatList,
      echartDivRef,
    };
  },
});
</script>
<style lang="less" scoped>
.welcome {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .chats {
    width: 40%;
    min-height: 300px;
    border-radius: 15px;
    box-shadow: 1px 2px 9px 1px rgba(0, 0, 0, 0.2);
    margin-left: 6%;
    margin-top: 20px;
    padding-bottom: 10px;
    .title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      font-size: 18px;
      font-weight: 700;
      color: #333;
      border-bottom: 1px solid #cccccc;
    }
    .nochat {
      text-align: center;
      font-size: 16px;
      color: #909399;
      line-height: 100px;
    }
    .chat_item {
      padding: 2px 10px;
      .name {
        font-size: 14px;
        margin-left: 5px;
        font-weight: 700;
      }
      .time {
        font-size: 12px;
        color: #cccccc;
      }
      .content {
        font-style: 13px;
        color: #ccc;
        font-style: italic;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
  .pie {
    padding-top: 20px;
    width: 40%;
    height: 300px;
    border-radius: 15px;
    box-shadow: 1px 2px 9px 1px rgba(0, 0, 0, 0.2);
    margin-right: 6%;
    margin-top: 20px;
  }
}
</style>
