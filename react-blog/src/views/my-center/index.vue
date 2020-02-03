<template>
  <div>
    <el-container>
      <el-aside width="201px">
          <MySider />
      </el-aside>
      <el-main>
          <HeaderCenterTitle />
          <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MySider from '@/components/my-sider/index.vue';
import HeaderCenterTitle from '@/components/common/header-center-title/index.vue';
@Component({
    components: {
        MySider,
        HeaderCenterTitle
    }
})
export default class MyCenter extends Vue {
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>