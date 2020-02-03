<template>
  <div>
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :default-openeds="defaultArray"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{$t('UserInfo.UserInfo')}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            index="1-1"
            @click="goUserInfo()"
            id="routerName"
          >{{$t('UserInfo.PersonalInfo')}}</el-menu-item>
          <el-menu-item index="1-2" id="router-2" @click="goUserCare()">{{$t('UserInfo.UserRank')}}</el-menu-item>
          <el-menu-item
            index="1-3"
            id="router-3"
            @click="goMyArticles()"
          >{{$t('UserInfo.UserArticle')}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import rxEvent from "pubsub-js";
import EventKeys from "@/common/event-keys";
@Component({})
export default class MySider extends Vue {
  private defaultArray: Array<String> = ["1"];
  mounted() {
    let data: any = document.getElementById("routerName") as InnerHTML;
    rxEvent.publish(EventKeys.REFRESH_TITLE_NAME, data.innerHTML);
  }
  handleOpen() {}
  handleClose() {}
  goUserInfo() {
    this.$router.replace({
      path: "/my-center/user-info"
    });
    let data: any = document.getElementById("routerName") as InnerHTML;
    rxEvent.publish(EventKeys.REFRESH_TITLE_NAME, data.innerHTML);
  }
  goUserCare() {
    this.$router.replace({
      path: "/my-center/user-care"
    });
    let data: any = document.getElementById("router-2") as InnerHTML;
    rxEvent.publish(EventKeys.REFRESH_TITLE_NAME, data.innerHTML);
  }
  goMyArticles() {
    this.$router.replace({
      path: "/my-center/my-articles"
    });
    let data: any = document.getElementById("router-3") as InnerHTML;
    rxEvent.publish(EventKeys.REFRESH_TITLE_NAME, data.innerHTML);
  }
}
</script>
