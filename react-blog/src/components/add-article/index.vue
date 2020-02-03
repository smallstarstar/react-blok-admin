<template>
  <div>
    <el-dialog
      :title="$t('AddArticle.PublishArticle')"
      :visible.sync="dialogVisiable"
      width="60%"
      :before-close="handleClose"
      :show-close="false"
    >
      <!-- todo -->
      <div class="form">
        <el-form :model="articleModel" ref="articleModel" :rules="ruleValidator">
          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item :label="$t('AddArticle.TypeName')" :prop="ruleName.typeId">
                <el-select v-model="articleModel.typeId" @change="chooseType($event)">
                  <el-option
                    v-for="(item, index) in options"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('AddArticle.SubTitleName')" :prop="ruleName.subTypeId">
                <el-select v-model="articleModel.subTypeId">
                  <el-option
                    v-for="(item, index) in optionSub"
                    :key="index"
                    :label="item.titleName"
                    :value="item.titleName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('AddArticle.TitleName')" :prop="ruleName.articleName">
                <el-input
                  :placeholder="$t('AddArticle.PleaseInput')"
                  v-model="articleModel.articleName"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="$t('AddArticle.Detail')" :prop="ruleName.desc">
            <el-input type="textarea" v-model="articleModel.desc" resize="none" rows="6"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancel('articleModel')">{{$t('AddArticle.Cancel')}}</el-button>
            <el-button type="primary" @click="submit('articleModel')">{{$t('AddArticle.Submit')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ArticlesServices from "@/api/articles-services";
import RuleName from "@/common/rules-name";
import RuleValidator from "@/common/rules-validator";
import { Getter } from "vuex-class";
import rxEvent from 'pubsub-js';
import EventKeys from '@/common/event-keys';
@Component({})
export default class AddArticle extends Vue {
  @Getter("userInfo")
  userInfo!: any;
  @Prop({ default: false, type: Boolean })
  dialogVisiable: any;
  private articleModel: any = {};
  private typeId: any = [];
  private options: Array<[]> = [];
  private optionSub: Array<[]> = [];
  private ruleName: any = RuleName;
  private ruleValidator: any = RuleValidator;
  async mounted() {
    // 获取文章的类
    const data: any = await ArticlesServices.getArticleTypeList();
    this.typeId = data;
    // 将数组中的type过滤出来
    const type: Array<[]> = data.map((e: any) => {
      return e.titleType;
    });
    this.options = [...new Set(type)];
  }
  // 过滤出子元素
  chooseType(e: any) {
    this.optionSub = this.typeId.filter((ele: any) => {
      return ele.titleType === e;
    });
  }
  submit(articleModel: any) {
    (this.$refs[articleModel] as any).validate(async (val: any) => {
      if (val) {
        this.articleModel.authorId = this.userInfo.id;
        let data = await ArticlesServices.saveArticles(this.articleModel);
        if (data) {
          this.articleModel = {};
          this.$emit("cancelDialog", true);
          // 刷新主页面
          rxEvent.publish(EventKeys.REFRESH_ARTICLE_BLOK, true);
          // this.$message.success('发布文章成功')
          const messageInfo: any = {
            position: 'bottom-right',
            duration: 3000,
            type: 'success',
            message: this.$t('AddArticle.PublishSuccess') as string
          }
          this.$notify(messageInfo);
        }
      }
    });
  }
  cancel(articleModel: any) {
    this.$emit("cancelDialog", true);
    this.articleModel = {};
    (this.$refs[articleModel] as any).resetFields();
  }
  handleClose() {
    this.$emit("closeDialog", true);
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style> 