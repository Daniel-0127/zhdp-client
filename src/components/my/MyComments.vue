<template>
  <div>
    <div style="width: 50%;height:572px;margin:30px  auto">
      <p style="font-size: 23px;margin-bottom: 20px;margin-left: -100px;font-weight: bolder">我的点评</p>
      <div v-if="datas.length > 0">
        <Grid :col="1" style=" background-color: #fff;">
          <GridItem v-for="(item,index) in datas" :key="index">
            <div style="float:left;width: 80px;height: 80px;">
              <img :src="store.state.img_path +item.picture" alt="头像"
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

              <Space wrap style="margin-top: 10px;">
                <div v-for="(url, index) in item.pics" :key="url">
                  <Image :src="url" fit="contain" width="120px" height="80px" preview
                         :preview-list="item.pics" :initial-index="index"/>
                </div>
              </Space>

              <div style="margin-top: 10px;">{{ item.create_time }}
                <div style="display: inline-block;float:right;">
                  <a style="text-align: center">
                    <like theme="outline" size="24" fill="#4a90e2"/>
                    {{ item.likes }}&nbsp;点赞</a>
                </div>
              </div>
            </div>

          </GridItem>
        </Grid>
      </div>
      <div v-else>
        <img :src="require('@/assets/no-data.png')" alt="1" style="width: 100%;"/>
        <p style="text-align: center">暂无点评</p>
      </div>
    </div>
  </div>
</template>

<script>

import {Grid, GridItem, Image, Rate, Space} from "view-ui-plus";
import {Like} from "@icon-park/vue-next";
import store from "@/store";

export default {
  name: "MyComments",

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
  created() {
    this.queryByUser(this.store.state.user.id)
  },
  methods: {
    queryByUser(id) {
      this.axios.get('/comments/getUserComments', {params: {user_id: id}})
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
  }
}
</script>

<style scoped>

</style>
