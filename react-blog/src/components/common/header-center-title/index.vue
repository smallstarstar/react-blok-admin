<template>
  <div>
    <div class="user-center-top">
      <div class="circle"></div>
      <div class="name-title">{{commonTitleName}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import rxEvent from 'pubsub-js';
import EventKeys from '@/common/event-keys';
@Component({})
export default class HeaderCenterTitle extends Vue {
  private commonTitleName: any = "";
  mounted() {
    rxEvent.subscribe(EventKeys.REFRESH_TITLE_NAME, (name: any, val: any) =>{
      this.commonTitleName = val;
    })
  }
}
</script>

<style lang="scss" scoped>
.user-center-top {
  display: flex;
  flex-direction: row;
  flex: 1;
  .circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #f2784b;
  }
  .name-title {
      margin-left: 10px;
      font-size: 20px;
      font-weight: 500;
      margin-top: -3px;
  }
}
</style>