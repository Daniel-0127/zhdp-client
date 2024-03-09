<!--推荐店铺-->
<template>
  <div id="body">
    <p>推荐店铺</p>
    <div id="center">
      <Grid :col="1" :hover="true" style=" background-color: #fff;">
        <a href="javaScript:void(0);" v-for="item in li" @click="toShop(item.id)" :key="item">
          <GridItem><img :src="item.image_path" alt="11" style="float:left;">
            <div style="font-size: 18px;font-weight: bold">{{ item.name }}</div>
            <div>
              <div style="float:left;padding-right: 12px;margin-top: 6px">
                <Rate show-text allow-half disabled v-model="item.star_shop">
                  <span style="color: #f5a623">{{item.star_shop }}</span>
                </Rate>
              </div>
              <div style="padding-top: 5px;">
                <span class="span">{{ item.comment }}条评论</span>
                <span class="span">人均：{{ item.price }}</span>
              </div>

            </div>
            <div>
              <span class="span">{{ item.type }}</span>
              <span class="span">{{ item.address }}</span>
            </div>
            <div>
              <span>推荐菜：{{ item.recommend }}</span>
              <!--              <span class="span">{{ item.tags }}</span>-->
            </div>
          </GridItem>
        </a>

      </Grid>
    </div>

  </div>

</template>

<script>
import {
  Grid, GridItem, Rate
} from 'view-ui-plus'
import store from '@/store'
export default {
  name: 'GourmetRecommend',
  components: {
    Rate,
    GridItem,
    Grid,
  },
  data() {
    return {
      li: [{}]
    }
  },
  methods: {
    getShops() {
        this.axios.get('/shop/recommend1', { params: { user_id: store.state.user.id } })
            .then((res) => {
              console.log(res.data.data)
              this.li = res.data.data
              this.li.forEach(item => {
                item.star_shop=((Number(item.star_kw) + Number(item.star_fw) + Number(item.star_hj))/3.0).toFixed(2)
              })
            })


    },
    toShop(id) {
      this.$router.push({ path: `/gourmet/shop/${id}` })
    }
  },
  created() {
    //防止用户登录后没有数据
    setTimeout(() => {
      if(store.state.user!==''){
        this.getShops()
      }
    },  150)


  }
}
</script>

<style scoped>
#body {
  width: 80%;
  margin: 0  auto;
}

p {
  font-size: 25px;
  font-weight: bold;
}

#center img {
  height: 150px;
  width: 190px;
  margin: 0 25px 25px 0;
}

#center .span{
  line-height: 38px;
}
#center .span:nth-child(odd){
  padding-right: 10px;
  border-right: #c0bbbb 1px solid;
}
#center .span:nth-child(even){
  padding-left: 10px;

}


.ivu-grid-item {
  height: 200px;
}
</style>
