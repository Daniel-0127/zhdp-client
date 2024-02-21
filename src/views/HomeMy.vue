<template>
  <div style="background-color:#f6f6f6;">
    <Affix :offset-top="0">
      <Top></Top>

    </Affix>
    <router-view></router-view>
    <BackTop :height="300" :bottom="100">
      <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>

<script>


import {Menu,Affix, BackTop, Icon, MenuGroup, MenuItem} from "view-ui-plus";
import Top from "@/components/top/Top.vue";
import MyMenu from "@/components/my/MyMenu.vue";

export default {
  name: 'HomeMy',
  components: {
    MyMenu,
    Icon,
    MenuItem,
    MenuGroup,
    Affix,
    Menu,
    Top,
    BackTop
  }
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
