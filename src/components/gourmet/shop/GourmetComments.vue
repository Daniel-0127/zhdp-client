<!--评论-->
<template>
  <div>
    <Grid :col="1" style=" background-color: #fff;">
      <GridItem v-for="(item) in datas" :key="item">
        <div style="float:left;width: 80px;height: 80px;"><img :src="store.state.img_path +item.picture" alt="头像"
                                                               style="width: 88px;border-radius: 45px;"></div>
        <div style="float:left;width: 80%;margin-left: 20px;">
          <div>{{ item.nickname }}</div>
          <div>
            <Rate allow-half v-model="item.store_score" disabled/>
          </div>
          <div id="text" style="white-space: pre-line;">{{ item.text }}</div>
          <!--                <div id="pic" >-->
          <!--                  <div v-for="it in item.pics" style="display: inline-block;"><img :src="store.state.img_path+it" alt="11"></div>-->
          <!--                </div>-->

          <Space wrap style="margin-top: 10px;">
            <div v-for="(url, index) in item.pics" :key="url">
              <Image :src="url" fit="contain" width="120px" height="80px" preview
                     :preview-list="item.pics" :initial-index="index"/>
            </div>
          </Space>

          <div style="margin-top: 10px;">{{ item.create_time }}
            <div style="display: inline-block;float:right;">
              <a style="text-align: center" @click="like(item.user_id)">
                <like theme="outline" size="24" fill="#4a90e2"/>
                {{ item.likes }}&nbsp;点赞</a>
            </div>
          </div>
        </div>

      </GridItem>
    </Grid>
  </div>
</template>

<script>
import {
  GridItem, Image, Rate, Space, Grid
} from 'view-ui-plus'
import { Like } from '@icon-park/vue-next'
import store from '@/store'

export default {
  name: 'GourmetComments',
  components: {
    Grid,
    GridItem,
    Rate,
    Image,
    Space,
    Like
  },
  computed: {
    store() {
      return store
    }
  },
  data() {
    return {
      datas: []
    }
  },
  methods: {
    queryByShop(id) {
      this.axios.get('/comments/queryByShop', { params: { shop_id: id } })
        .then((res) => {
          console.log(res.data.data)
          this.datas = res.data.data
          for (let i = 0; i < this.datas.length; i++) {
            for (let j = 0; j < this.datas[i].pics.length; j++) {
              this.datas[i].pics[j] = store.state.img_path + this.datas[i].pics[j]
            }
          }
        })
    },
    //   点赞
    like(id) {
      if(this.store.state.user === ''){
        this.$Message.warning("未登录")
        return
      }
      this.axios.post('/comments/like', {
        user_id: this.store.state.user.id,
        like_user_id: id,
        shop_id: this.$route.params.id
      }).then((res)=>{
        if(res.data.success===false){
          this.$Message.warning(res.data.message)
        }else {
          this.$Message.success("点赞成功")
        }

      })
    }
  },
  created() {
    this.queryByShop(this.$route.params.id)
  }
}
</script>

<style scoped>


#pic img {
  margin-left: 5px;
  height: 100px;
  width: 100px;
  /*float: left;*/

}
</style>
