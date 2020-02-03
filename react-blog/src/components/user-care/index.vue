<template>
  <div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderCenterTitle from '@/components/common/header-center-title/index.vue';
import { Getter } from "vuex-class";
@Component({
  components:{
    HeaderCenterTitle
  }
})
export default class UserCare extends Vue {
  @Getter("userInfo")
  private userInfoMessage!: any;
  created() {
     
  }
}
</script>

<style lang="scss" scoped>

</style>