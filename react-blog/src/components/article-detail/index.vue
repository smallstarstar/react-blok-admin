<template>
  <div>
    <div class="content_center">
      <div class="detail_top">
        <div class="word">
          {{$t('ArticleDetail.Title')}}
          <span>{{articleMessage.articleEntity.articleName}}</span>
        </div>
      </div>
      <div class="detail_desc">
        <div class="word">{{$t('ArticleDetail.Detail')}}</div>
        <div class="desc">{{articleMessage.articleEntity.desc}}</div>
      </div>
      <div class="add_cmmmit">
        <el-input
          type="textarea"
          resize="none"
          rows="6"
          maxlength="1000"
          show-word-limit
          v-model="commitWord"
        ></el-input>
      </div>
      <div class="button_add">
        <el-button
          icon="el-icon-plus"
          type="primary"
          :disabled="disabled"
          @click="submit()"
        >{{$t('ArticleDetail.AddCommit')}}</el-button>
      </div>
      <div class="line"></div>
      <div class="look_commit" v-if="commentInfo.length !== 0">
        <div class="comment_center" v-for="(item, index) in commentInfo" :key="index">
          <div class="comment_center_top">
            <div class="comment_left">
              <div class="circle">{{item.userEntity.userName[0].toUpperCase()}}</div>
              <div class="time">{{timeSerVices.changeStateTime(item.commentEntity.cTime )}}</div>
            </div>
          </div>
          <div class="comment_desc">
            <p>{{item.commentEntity.detailInfo}}</p>
          </div>
        </div>
      </div>
      <div v-else class="no_data">{{$t('ArticleDetail.NoData')}}</div>
      <!-- 分页 -->
      <div class="page_size" v-if="commentInfo.length !== 0">
        <div class="page_size">
          <el-pagination
            @size-change="handleCurrentSize"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="6"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { CommitInfo } from "@/models/commit-info";
import ArticlesServices from "@/api/articles-services";
import { PageInfo } from "@/models/page-info";
import TimeServices from "@/utils/timeFormat";

@Component({})
export default class ArticleDetail extends Vue {
  @Getter("articleMessage")
  articleMessage!: any;
  @Getter("userInfo")
  userInfo!: any;
  private timeSerVices: any = TimeServices;
  private commitWord: string = "";
  private disabled: Boolean = true;
  private pageInfo: PageInfo = new PageInfo();
  private total: Number = 0;
  private currentPage: Number = 1;
  private currentSize: Number = 5;
  private commentInfo: Array<[]> = [];
  created() {
    this.getInit(this.articleMessage.articleEntity.id, this.pageInfo);
  }
  @Watch("commitWord")
  commitWords(val: any) {
    if (!val.trim()) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }
  async getInit(articleId: string, pageInfo: PageInfo) {
    let data: any = await ArticlesServices.getCommentByArticleAndPageInfo(
      articleId,
      pageInfo
    );
    this.total = data.total;
    this.commentInfo = data.list;
  }
  /** 提交品论信息
   * @param CommitInfo;
   * @return true;
   */
  async submit() {
    // 组装数据
    let commitInfo = new CommitInfo();
    commitInfo.personId = this.userInfo.id;
    commitInfo.articleId = this.articleMessage.articleEntity.id;
    commitInfo.detailInfo = this.commitWord;
    let data = await ArticlesServices.addCommit(commitInfo);
    if (data) {
      this.commitWord = "";
      this.disabled = true;
      const messageInfo: any = {
        message: this.$t("ArticleDetail.AddCommitSuccess") as string,
        type: "success",
        position: "bottom-right",
        duration: 3000
      };
      this.$notify(messageInfo);
      this.getInit(this.articleMessage.articleEntity.id, this.pageInfo);
    }
  }
  handleCurrentSize(size: Number) {
    this.pageInfo.size = size;
    this.getInit(this.articleMessage.articleEntity.id, this.pageInfo);
  }
  handleCurrentChange(page: Number) {
    this.pageInfo.page = page;
    this.getInit(this.articleMessage.articleEntity.id, this.pageInfo);
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

