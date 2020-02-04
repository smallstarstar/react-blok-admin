<template>
  <div>
    <div class="header">
      <div class="header_button">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="openDialog()"
        >{{$t('HeaderTop.Publish')}}</el-button>
      </div>
      <AddArticle
        :dialogVisiable="dialogVisiable"
        @closeDialog="closeDialog"
        @cancelDialog="cancelDialog"
      />
      <div class="right">
        <img src="../../assets/logo.png" alt class="img_user" v-if="this.userInfo" />
        <span class="user_name" v-if="this.userInfo">{{this.userInfo.userName}}</span>
        <div class="button_group">
          <el-popover placement="bottom" width="400" trigger="click" v-if="!this.userInfo">
            <Login :cleanLogin="cleanLogin" />
            <span slot="reference">{{$t('HeaderTop.Login')}}</span>
          </el-popover>
          <span @click="goUserCenter()">{{$t('HeaderTop.UserCenter')}}</span>
          <span>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{$t('HeaderTop.Language')}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="cn">{{$t('HeaderTop.Chinese')}}</el-dropdown-item>
                <el-dropdown-item command="en">{{$t('HeaderTop.English')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <span @click="loginOut()">{{$t('HeaderTop.LoginOut')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action } from "vuex-class";
import AddArticle from "@/components/add-article/index.vue";
import { Getter } from "vuex-class";
import Login from "@/pages/login/index.vue";
@Component({
  components: {
    AddArticle,
    Login
  }
})
export default class HeaderTop extends Vue {
  @Getter("userInfo")
  userInfo!: any;
  @Action("saveUserInfo")
  saveUserInfo!: any;
  private dialogVisiable: Boolean = false;
  private cleanLogin: Boolean = false;
  goUserCenter() {
    // 判断用户是否已经登录
    let data: any = localStorage.getItem("userInfoOfBlok");
    if (data) {
      let userInfo = JSON.parse(data);
      this.saveUserInfo(userInfo);
      this.$router.push({
        path: "/my-center/user-info"
      });
    } else {
      // 用户不存在请登录以及注册的判断
    }
  }
  handleCommand(e: any) {
    if (e === "cn") {
      this.$i18n.locale = "zh"; //重新设置
    } else {
      this.$i18n.locale = "en"; //重新设置
    }
  }
  openDialog() {
    // 判断用户是否已经登录
    if (!this.userInfo) {
      this.$message.warning(this.$t("HeaderTop.PleaseLogin") as string);
    } else {
      this.dialogVisiable = true;
    }
  }
  closeDialog() {
    this.dialogVisiable = true;
  }
  cancelDialog() {
    this.dialogVisiable = false;
  }
  loginOut() {
    if (!localStorage.getItem("userInfoOfBlok")) {
      this.$message.warning(this.$t("HeaderTop.PleaseLogin") as string);
    } else {
      this.$confirm(
        this.$t("HeaderTop.LoginOut") as string,
        this.$t("MyArticles.Tip") as string,
        {
          confirmButtonText: this.$t("MyArticles.Sure") as string,
          cancelButtonText: this.$t("MyArticles.Cancel") as string,
          type: "warning",
          center: false
        }
      )
        .then(() => {
          localStorage.removeItem("userInfoOfBlok");
          this.saveUserInfo(null);
          this.$message.success(this.$t("HeaderTop.LoginOutSuccess") as string);
        })
        .catch(() => {});
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>