<template>
  <div>
    <div class="user-info">
      <el-row :gutter="24">
        <el-col :span="6">
          <label>{{$t('UserInfo.UserName')}}</label>
          <div class="border_content">{{userInfo.userName}}</div>
        </el-col>
        <el-col :span="6">
          <label>{{$t('UserInfo.Password')}}</label>
          <div class="border_content">{{userInfo.password}}</div>
        </el-col>
        <el-col :span="6">
          <label>{{$t('UserInfo.Role')}}</label>
          <div class="border_content">{{utilsServices.changeRole(+userInfo.roleId)}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderCenterTitle from "@/components/common/header-center-title/index.vue";
import { Getter } from "vuex-class";
import UtilServices from "@/utils/utiles-services";
@Component({
  components: {
    HeaderCenterTitle
  }
})
export default class UserInfo extends Vue {
  @Getter("userInfo")
  private userInfoMessage!: any;
  private userInfo: any = {};
  private utilsServices: any = UtilServices;
  created() {
   
    this.userInfo = this.userInfoMessage;
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>