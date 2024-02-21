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
                <Rate show-text allow-half disabled v-model="item.shop_score">
                  <span style="color: #f5a623">{{ item.shop_score }}</span>
                </Rate>
              </div>
              <div style="padding-top: 5px;">
                <span class="span">{{ item.rating_amount }}条评论</span>
                <span class="span">{{ item.month_sales }}</span>
              </div>

            </div>
            <div>
              <span class="span">{{ item.category }}</span>
              <span class="span">{{ item.district }}</span>
            </div>
            <div>
              <span class="span">{{ item.food_safety }}</span>
              <span class="span">{{ item.tags }}</span>
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
  margin: 30px auto auto;
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
#ye {
  text-align: center;
  margin: 30px 0;
}

.ivu-grid-item {
  height: 200px;
}
</style>
