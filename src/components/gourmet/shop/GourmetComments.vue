<!--评论-->
<template>
  <div v-show="datas.length > 0" style="margin-top: 20px;padding:12px 0 12px 18px">
    <p style="font-size: 21px;font-weight: bolder">评论区</p>
    <div>
      <Grid :col="1" style=" background-color: #fff;">
        <GridItem v-for="(item,index) in datas" :key="index">
          <div style="float:left;width: 80px;height: 80px;"><img :src="store.state.img_path +item.picture" alt="头像"
                                                                 style="width: 88px;border-radius: 45px;"></div>
          <div style="float:left;width: 80%;margin-left: 20px;">
            <div>{{ item.nickname }}</div>
            <div style="float:left;">
              <Rate allow-half v-model="item.store_score" disabled/>
            </div>
            <div style="line-height: 33px">
              <span style="padding-left: 15px">口味:&nbsp;{{ item.score_kw }}</span>
              <span style="padding-left: 15px">环境:&nbsp;{{ item.score_hj }}</span>
              <span style="padding-left: 15px">服务:&nbsp;{{ item.score_fw }}</span>
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
                <a style="text-align: center" @click="like(item,index)">
                  <like theme="outline" size="24" fill="#4a90e2"/>
                  {{ item.likes }}&nbsp;点赞</a>
              </div>
            </div>
          </div>

        </GridItem>
      </Grid>
    </div>
  </div>
</template>

<script>
import {
  GridItem, Image, Rate, Space, Grid
} from 'view-ui-plus'
import {Like} from '@icon-park/vue-next'
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
      this.axios.get('/comments/queryByShop', {params: {shop_id: id}})
          .then((res) => {
            console.log(res.data.data)
            this.datas = res.data.data
            for (let i = 0; i < this.datas.length; i++) {
              for (let j = 0; j < this.datas[i].pics.length; j++) {
                this.datas[i].pics[j] = store.state.img_path + this.datas[i].pics[j]

              }
              this.datas[i].store_score = Number(((this.datas[i].score_kw + this.datas[i].score_fw + this.datas[i].score_hj) / 3).toFixed(2))
            }
          })
    },
    //   点赞
    like(item, index) {
      if (this.store.state.user === '') {
        this.$Message.warning("未登录")
        return
      }
      console.log(item)
      this.axios.post('/comments/like', {
        user_id: this.store.state.user.id,
        comment_id: item.id,
      }).then((res) => {
        if (res.data.success === false) {

          this.$Message.warning(res.data.message)
        } else {
          this.datas[index].likes = this.datas[index].likes + 1
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
