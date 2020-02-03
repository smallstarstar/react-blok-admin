<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import rxEvent from "pubsub-js";
import EventKeys from "@/common/event-keys";

@Component({ components: {} })
export default class App extends Vue {
  @Action("saveUserInfo")
  private saveUserInfo!: any;
  created() {
    const data: any = localStorage.getItem("userInfoOfBlok");
    this.saveUserInfo(JSON.parse(data));
  }
  // 接收服务器事件
  mounted() {
    rxEvent.subscribe(EventKeys.SERVICES_ERROR, () => {
      this.$message.error(this.$t("Common.ServicesError") as string);
    });
    rxEvent.subscribe(EventKeys.SERVICES_PARAM_ERROR, () => {
      this.$message.error(this.$t("Common.ParamsError") as string);
    });
    rxEvent.subscribe(EventKeys.SERVICES_NOT_FOUND, () => {
      this.$message.error(this.$t("Common.NotFound") as string);
    });
  }
}
</script>


<style lang="scss">
@import "./assets/style/index.scss";
</style>

