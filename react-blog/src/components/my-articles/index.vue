<template>
  <div>
    <el-table :data="tableData" style="width: 100%" stripe height="550px">
      <el-table-column :label="$t('MyArticles.TypeName')" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.typeId}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MyArticles.SubTypeName')" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.subTypeId}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MyArticles.TitleName')" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.articleName}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MyArticles.Views')" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.looks}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MyArticles.Agree')" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.stars}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MyArticles.Details')" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.desc}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('MyArticles.Operate')">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleInto(scope.row)"
          >{{$t('MyArticles.InTo')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >{{$t('MyArticles.Delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页处理 -->
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import ArticlesServices from "@/api/articles-services";
import { PageInfo } from "../../models/page-info";
@Component({ components: {} })
export default class MyCircles extends Vue {
  @Getter("userInfo")
  userInfo!: any;
  @Action("saveArticleInfo")
  saveArticleInfo!: any;
  private pageInfo: PageInfo = new PageInfo();
  private currentPage: Number = 1;
  private currentSize: Number = 5;
  private tableData: any = [];
  private total: Number = 0;
  async created() {
    this.pageInfo.size = 10;
    await this.getInit(this.userInfo.id, this.pageInfo);
  }
  async getInit(personId: any, page: PageInfo) {
    let data: any = await ArticlesServices.getOwnArticleOfBlok(personId, page);
    this.tableData = data.list;
    this.total = data.total;
  }
  /** 删除自己发布的文章
   * @param personId;
   * @param blok;
   * @returns true;
   */
  handleDelete(e: any) {
    this.$confirm(
      this.$t("MyArticles.AreYouWantToDeleteIt?") as string,
      this.$t("MyArticles.Tip") as string,
      {
        confirmButtonText: this.$t("MyArticles.Sure") as string,
        cancelButtonText: this.$t("MyArticles.Cancel") as string,
        type: "warning",
        center: false
      }
    )
      .then(async () => {
        let data = await ArticlesServices.deletePersonBlok(
          e.id,
          this.userInfo.id
        );
        console.log(data);
        if (data) {
          this.$message({
            type: "success",
            message: this.$t("MyArticles.DeleteSuccess") as string
          });
          await this.getInit(this.userInfo.id, this.pageInfo);
        }
      })
      .catch(() => {});
  }
  handleInto(e: any) {
    let obj: any = {};
    obj.articleEntity = e;
    this.saveArticleInfo(obj);
    this.$router.push({
      path: "/article-detail"
    });
  }
  handleCurrentSize(val: any) {}
  handleCurrentChange(val: any) {}
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>