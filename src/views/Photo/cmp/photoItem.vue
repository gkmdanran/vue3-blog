<template>
  <div class="photo-item">
    <transition name="fade">
      <div
        class="del"
        v-show="isDel"
        @mouseenter="active"
        @mouseleave="unActtive"
      >
        <i class="el-icon-delete" @click.stop="delPhoto(photo)"></i>
      </div>
    </transition>
    <i class="el-icon-lock" v-if="photo.password"></i>
    <img
      class="picture"
      :src="
        photo.cover == ''
          ? require('../../../assets/img/timg.jpg')
          : photo.cover
      "
      :title="$filters.formatTime(photo.createAt)"
    />
    <div class="title">{{ photo.title }}</div>
    <div class="count">{{ photo.count||0 }}</div>
    <div
      class="tag"
      :style="{ borderColor: photo.tagColor }"
      v-if="photo.tag != ''"
    >
      <span class="tagtxt">{{ photo.tag }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, PropType } from "vue";
import { IPhoto } from "../type";
import { deletePhoto } from "@/http/photo";
import { ElMessageBox } from "element-plus";
export default defineComponent({
  name: "PhotoItem",
  props: {
    photo: {
      type: Object as PropType<IPhoto[]>,
      default: () => {},
    },
    isDel: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["delPhoto"],
  components: {},
  setup(props, { emit }) {
    function delPhoto(photo: IPhoto) {
      ElMessageBox.confirm("确认删除该相册吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletePhoto(photo.id).then((res) => {
            if (res.code == 200) {
              emit("delPhoto");
            }
          });
        })
        .catch(() => {});
    }
    function active(e: any) {
      e.currentTarget.children[0].className = "el-icon-delete active";
    }
    function unActtive(e: any) {
      e.currentTarget.children[0].className = "el-icon-delete";
    }

    return {
      active,
      unActtive,
      delPhoto,
    };
  },
});
</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.photo-item {
  cursor: pointer;
  margin: 15px;
  position: relative;
  width: 180px;
  padding: 6px;
  height: 210px;
  background-color: #fefff7;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.2);
  .el-icon-lock {
    position: absolute;
    right: 10px;
    bottom: 13px;
    font-weight: 700;
    color: red;
  }
  .picture {
    width: 168px;
    height: 168px;
    object-fit: cover;
  }
  .title {
    margin-top: 2px;
    padding: 0 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
    font-size: 14px;
    text-align: center;
  }
  .count {
    height: 30px;
    line-height: 30px;
    text-align: right;
    font-size: 24px;
    color: pink;
    position: absolute;
    right: 15px;
    top: 140px;
  }
  .tag {
    position: absolute;
    top: 0;
    left: 0;
    width: 0px;
    height: 0px;
    border: 20px;
    border-top: 30px;
    border-bottom-color: transparent !important;
    border-style: solid;
    .tagtxt {
      width: 40px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -25px;
      text-align: center;
      font-size: 14px;
      color: #ffffff;
    }
  }
  .del {
    position: absolute;
    width: 180px;
    height: 210px;
    top: 0;
    left: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 210px;
  }
  .el-icon-delete:before {
    color: #ccc;
    font-size: 60px;
    opacity: 1;
  }
  .active::before {
    color: #f78787 !important;
  }
}
</style>