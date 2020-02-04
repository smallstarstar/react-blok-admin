<template>
  <div>
    <div class="login_box">
      <el-form :model="loginInfo" ref="loginInfo" :rules="rules">
        <el-form-item :label="$t('Login.UserName')" :prop="rulesName.userName">
          <el-input :placeholder="$t('Login.PleaseInputUserName')" v-model="loginInfo.userName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Login.Password')" :prop="rulesName.password">
          <el-input
            :placeholder="$t('Login.PleaseInputPassword')"
            v-model="loginInfo.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('Login.Remember')">
          <el-checkbox v-model="remember"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('loginInfo')">{{$t('Login.Login')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-popover placement="left" width="400" trigger="click" offset="180">
            <el-form :model="registerInfo" ref="registerInfo" :rules="rules">
              <el-form-item :label="$t('Login.UserName')" :prop="rulesName.userName">
                <el-input
                  v-model="registerInfo.userName"
                  :placeholder="$t('Login.PleaseInputUserName')"
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('Login.Password')" :prop="rulesName.password">
                <el-input
                  :placeholder="$t('Login.PleaseInputPassword')"
                  type="password"
                  v-model="registerInfo.password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="margin-left:30px"
                  @click="cancelRegister('registerInfo')"
                >{{$t('Login.Cancel')}}</el-button>
                <el-button
                  type="primary"
                  style="margin-left:100px"
                  @click="sureRegister('registerInfo')"
                >{{$t('Login.Sure')}}</el-button>
              </el-form-item>
            </el-form>
            <el-button slot="reference" type="warning">{{$t('Login.Register')}}</el-button>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RulesName from "@/common/rules-name";
import RulesValidator from "@/common/rules-validator";
import ArticlesServices from "@/api/articles-services";
import { Action } from "vuex-class";
@Component({})
export default class Login extends Vue {
  @Action("saveUserInfo")
  saveUserInfo!: any;
  private loginInfo: any = {};
  private registerInfo: any = {};
  private userName: any = "";
  private remember: any = false;
  private rules: any = RulesValidator;
  private rulesName: any = RulesName;
  login(loginInfo: any) {
    (this.$refs[loginInfo] as any).validate(async (value: any) => {
      if (value) {
        let data: any = await ArticlesServices.userLogin(
          this.loginInfo.userName,
          this.loginInfo.password
        );
        if (data) {
          // todo
          this.saveUserInfo(data.userEntity);
          localStorage.setItem(
            "userInfoOfBlok",
            JSON.stringify(data.userEntity)
          );
          if (data.code === 2) {
            this.$message.warning(data.message);
          }
        }
      }
    });
  }
  sureRegister(registerInfo: any) {
    (this.$refs[registerInfo] as any).validate(async (value: any) => {
      if (value) {
        let data: any = await ArticlesServices.userRegister(this.registerInfo);
        if (data) {
          // todo
          this.saveUserInfo(data.userEntity);
          localStorage.setItem(
            "userInfoOfBlok",
            JSON.stringify(data.userEntity)
          );
          this.registerInfo = {};
          if (data.code === 2) {
            this.$message.warning(data.message);
          }
        }
      }
    });
  }
  cancelRegister(registerInfo: any) {
    (this.$refs[registerInfo] as any).resetFields();
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>>