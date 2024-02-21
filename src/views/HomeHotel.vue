<template>
  <div style="background-color:#f6f6f6;">
    <Top></Top>
    <router-view></router-view>
    <BackTop :height="300" :bottom="100">
      <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>

<script>
import Top from '@/components/top/Top.vue'
import {BackTop} from "view-ui-plus";


export default {
  name: 'HomeHotel',
  components: {BackTop, Top}
}
</script>

<style scoped>
.top{
  padding: 10px;
  background: rgba(0, 153, 229, .7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>
