<template>
  <div>
    <HeaderTop />
    <div class="content">
        <Articles />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderTop from "@/components/headerTop/header-top.vue";
import Articles from "@/components/articles/articles.vue";
import Footer from "@/components/footer/footer.vue";
@Component({
  components: {
    HeaderTop,
    Articles,
    Footer
  }
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped></style>