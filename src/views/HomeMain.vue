<template>
  <div style="background-color:#f6f6f6;">
<!--    <Affix>-->
<!--    -->
<!--    </Affix> -->
 <Top></Top>
    <router-view></router-view>
  </div>
</template>

<script>

// import { Affix } from 'view-ui-plus'
import Top from '@/components/top/Top.vue'

export default {
  name: 'HomeView',
  components: {
    // Affix,
    Top
  }
}
</script>
